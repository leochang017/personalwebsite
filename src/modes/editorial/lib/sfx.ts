/**
 * Interface sound effects, synthesized live with WebAudio (no samples).
 * Each sound is 5-250 ms with peak gain <= 0.18, shares one AudioContext
 * (created/resumed on a user gesture) and only plays while sound is on.
 */
import { useModeStore } from "../../../stores/mode";

export const SFX_NAMES = ["craneHit", "tick", "pop", "open", "close", "thud", "send", "hover", "switch", "photoNext"] as const;
export type SfxName = (typeof SFX_NAMES)[number];

export function isSfxName(v: string | undefined): v is SfxName {
  return !!v && (SFX_NAMES as readonly string[]).includes(v);
}

let ctx: AudioContext | null = null;
let noiseBuf: AudioBuffer | null = null;

function ac(): AudioContext | null {
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** call from a user gesture so later sounds can play */
export function unlockSfx() {
  ac();
}

function enabled(): boolean {
  try {
    return useModeStore().soundOn;
  } catch {
    return false;
  }
}

function noise(c: AudioContext): AudioBuffer {
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

function env(c: AudioContext, t0: number, dur: number, peak: number): GainNode {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.min(peak, 0.18), t0 + Math.min(0.006, dur / 3));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  g.connect(c.destination);
  return g;
}

function tone(c: AudioContext, type: OscillatorType, f0: number, f1: number | null, t0: number, dur: number, peak: number, detune = 0) {
  const o = c.createOscillator();
  o.type = type;
  o.detune.value = detune;
  o.frequency.setValueAtTime(f0, t0);
  if (f1) o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  o.connect(env(c, t0, dur, peak));
  o.start(t0);
  o.stop(t0 + dur + 0.03);
}

function hiss(c: AudioContext, t0: number, dur: number, peak: number, type: BiquadFilterType, f0: number, f1: number | null = null, q = 1.2) {
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const f = c.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(f0, t0);
  if (f1) f.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  src.connect(f).connect(env(c, t0, dur, peak));
  src.start(t0, Math.random() * 0.5);
  src.stop(t0 + dur + 0.03);
}

const fineHover = (() => {
  try {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  } catch {
    return false;
  }
})();
let lastHover = 0;

export function sfx(name: SfxName) {
  if (!enabled()) return;
  if (name === "hover") {
    const now = performance.now();
    if (!fineHover || now - lastHover < 120) return;
    lastHover = now;
  }
  const c = ac();
  if (!c || c.state !== "running") return;
  const t = c.currentTime + 0.005;
  switch (name) {
    case "craneHit":
      tone(c, "triangle", 520, 260, t, 0.18, 0.16, (Math.random() - 0.5) * 80);
      hiss(c, t, 0.04, 0.06, "bandpass", 2200);
      break;
    case "tick":
      tone(c, "square", 1800, null, t, 0.008, 0.05);
      break;
    case "pop":
      tone(c, "sine", 300, 600, t, 0.06, 0.14);
      break;
    case "open":
      hiss(c, t, 0.16, 0.08, "bandpass", 420, 2600, 1.4);
      break;
    case "close":
      hiss(c, t, 0.16, 0.08, "bandpass", 2600, 420, 1.4);
      break;
    case "thud":
      tone(c, "sine", 110, 82, t, 0.12, 0.18);
      break;
    case "send":
      tone(c, "sine", 880, null, t, 0.05, 0.1);
      tone(c, "sine", 1320, null, t + 0.06, 0.06, 0.1);
      break;
    case "hover":
      tone(c, "square", 2400, null, t, 0.005, 0.02);
      break;
    case "switch":
      [220, 330, 440].forEach((f, i) => tone(c, "triangle", f, null, t + i * 0.075, 0.07, 0.12));
      break;
    case "photoNext":
      hiss(c, t, 0.02, 0.08, "highpass", 3000);
      tone(c, "square", 1200, null, t, 0.006, 0.04);
      break;
  }
}

export function disposeSfx() {
  void ctx?.close();
  ctx = null;
  noiseBuf = null;
}

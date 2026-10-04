/**
 * Arcade audio: background music from mp3s (two <audio> "decks" that
 * crossfade through one WebAudio bus + analyser, so the DJ booth can pulse
 * to whatever is playing), plus small synthesized UI blips.
 */

const VOLUME = 0.35;

type Deck = { el: HTMLAudioElement; gain: GainNode; pauseTimer: number };

export class ChipAudio {
  private ctx: AudioContext | null = null;
  private music: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private bins: Uint8Array<ArrayBuffer> | null = null;
  private sfx: GainNode | null = null;
  private decks: Deck[] = [];
  private active = 0;
  private wanted: string | null = null;
  private bassAvg = 0;
  private enabled = false;

  get playing() {
    return this.wanted !== null;
  }

  /** Must be called from a user gesture at least once (autoplay policy). */
  unlock() {
    if (!this.ctx) {
      const Ctor = window.AudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      this.ctx = ctx;
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.6;
      this.bins = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.connect(ctx.destination);
      this.music = ctx.createGain();
      this.music.connect(this.analyser);
      for (let i = 0; i < 2; i++) {
        const el = new Audio(); // src is set on play, so a muted visit downloads nothing
        el.loop = true;
        el.preload = "auto";
        const gain = ctx.createGain();
        gain.gain.value = 0;
        ctx.createMediaElementSource(el).connect(gain).connect(this.music);
        this.decks.push({ el, gain, pauseTimer: 0 });
      }
      this.sfx = ctx.createGain();
      this.sfx.connect(ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    // a play() refused before the first gesture gets retried here
    const deck = this.decks[this.active];
    if (this.wanted && deck?.el.paused) void deck.el.play().catch(() => undefined);
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on) this.stop();
  }

  /**
   * Plays `src` looping. If another track is playing, the two crossfade over
   * `fade` seconds; from silence it fades in over `fade`.
   */
  playTrack(src: string, fade: number) {
    this.unlock();
    if (!this.enabled || !this.decks.length) return;
    const current = this.decks[this.active];
    if (this.wanted === src && !current.el.paused) return;
    const fromSilence = this.wanted === null;
    this.wanted = src;

    // reuse the active deck from silence; otherwise bring in the idle one
    if (!fromSilence) {
      this.fadeOut(current, fade);
      this.active = 1 - this.active;
    }
    const deck = this.decks[this.active];
    window.clearTimeout(deck.pauseTimer);
    if (deck.el.getAttribute("src") !== src) {
      deck.el.src = src;
      deck.el.currentTime = 0;
    }
    void deck.el.play().catch(() => undefined);
    this.ramp(deck.gain, VOLUME, fade);
  }

  /** Fades the music out over 0.6s, then pauses. */
  stop() {
    if (this.wanted === null) return;
    this.wanted = null;
    const deck = this.decks[this.active];
    if (deck) this.fadeOut(deck, 0.6);
  }

  /** 0..1 pulse from the music's bass energy (onset over a running average). */
  beat(): number {
    if (!this.wanted || !this.analyser || !this.bins) return 0;
    this.analyser.getByteFrequencyData(this.bins);
    const level = (this.bins[0] + this.bins[1] + this.bins[2]) / (3 * 255);
    this.bassAvg += (level - this.bassAvg) * 0.05;
    return Math.min(1, Math.max(0, (level - this.bassAvg) * 5));
  }

  /** Dialog typing blip: square 880Hz, 20ms. */
  blip() {
    this.tone("square", 880, 880, 0.02, 0.02);
  }
  /** HUD hover pop: 440→880Hz sweep, 60ms. */
  hover() {
    this.tone("sine", 440, 880, 0.06, 0.03);
  }
  /** Notification / quest chime. */
  chime() {
    this.tone("triangle", 660, 660, 0.09, 0.04);
    this.tone("triangle", 990, 990, 0.14, 0.035, 0.08);
  }

  dispose() {
    this.wanted = null;
    for (const d of this.decks) {
      window.clearTimeout(d.pauseTimer);
      d.el.pause();
      d.el.removeAttribute("src");
      d.el.load();
    }
    this.decks = [];
    void this.ctx?.close();
    this.ctx = null;
  }

  // ---------------------------------------------------------------------------

  private fadeOut(deck: Deck, seconds: number) {
    this.ramp(deck.gain, 0, seconds);
    window.clearTimeout(deck.pauseTimer);
    deck.pauseTimer = window.setTimeout(() => {
      if (this.decks[this.active] !== deck || this.wanted === null) deck.el.pause();
    }, seconds * 1000 + 50);
  }

  private ramp(gain: GainNode, target: number, seconds: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const g = gain.gain;
    const now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(target, now + seconds);
  }

  private tone(type: OscillatorType, f0: number, f1: number, dur: number, gain: number, delay = 0) {
    const ctx = this.ctx;
    if (!ctx || !this.sfx || !this.enabled || ctx.state !== "running") return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(this.sfx);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }
}

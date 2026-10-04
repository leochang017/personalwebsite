/**
 * Editorial soundtrack. The current track (persisted in localStorage
 * `ed.track`, default `music.editorial`) loops while sound is on: fade in
 * 1.2s, fade out 0.6s, and a 0.6s crossfade when the visitor picks another
 * track. Playback only starts from a user gesture.
 */
import { computed, ref } from "vue";
import { gsap } from "gsap";
import { editorialTracks, music, type Track } from "../../../content/leo";

const VOLUME = 0.35;
const KEY = "ed.track";

function initialTrack(): Track {
  try {
    const saved = localStorage.getItem(KEY);
    const t = editorialTracks.find((x) => x.id === saved);
    if (t) return t;
  } catch {
    /* storage blocked */
  }
  return editorialTracks.find((t) => t.src === music.editorial.src) ?? editorialTracks[0];
}

export const tracks = editorialTracks;
export const currentTrack = ref<Track>(initialTrack());
/** "incompetech.com" etc., derived from the current track's URL */
export const musicHost = computed(() => {
  try {
    return new URL(currentTrack.value.url).hostname.replace(/^www\./, "");
  } catch {
    return currentTrack.value.url;
  }
});
export const creditLine = computed(
  () => `Music: "${currentTrack.value.title}" by ${currentTrack.value.artist} (${musicHost.value}), ${currentTrack.value.license}`,
);

let el: HTMLAudioElement | null = null;
let playing = false;
let fade: gsap.core.Tween | null = null;

function make(t: Track): HTMLAudioElement {
  const a = new Audio(t.src);
  a.loop = true;
  a.preload = "auto";
  a.volume = 0;
  return a;
}

function retire(a: HTMLAudioElement, duration: number) {
  gsap.killTweensOf(a);
  gsap.to(a, {
    volume: 0,
    duration,
    ease: "power1.out",
    onComplete: () => {
      a.pause();
      a.removeAttribute("src");
      a.load();
    },
  });
}

export async function startAmbient() {
  playing = true;
  if (!el) el = make(currentTrack.value);
  const a = el;
  fade?.kill();
  try {
    await a.play();
  } catch {
    return; // blocked or missing: stay silent
  }
  fade = gsap.to(a, { volume: VOLUME, duration: 1.2, ease: "power1.out" });
}

export function stopAmbient() {
  playing = false;
  const a = el;
  if (!a) return;
  fade?.kill();
  fade = gsap.to(a, {
    volume: 0,
    duration: 0.6,
    ease: "power1.out",
    onComplete: () => {
      if (!playing) a.pause();
    },
  });
}

export function setTrack(id: string) {
  const t = editorialTracks.find((x) => x.id === id);
  if (!t || t.id === currentTrack.value.id) return;
  currentTrack.value = t;
  try {
    localStorage.setItem(KEY, t.id);
  } catch {
    /* storage blocked */
  }
  const old = el;
  el = null;
  if (old) retire(old, playing ? 0.6 : 0);
  if (playing) {
    const next = make(t);
    el = next;
    next
      .play()
      .then(() => {
        fade = gsap.to(next, { volume: VOLUME, duration: 0.6, ease: "power1.out" });
      })
      .catch(() => undefined);
  }
}

export function disposeAudio() {
  fade?.kill();
  fade = null;
  playing = false;
  if (!el) return;
  gsap.killTweensOf(el);
  el.pause();
  el.removeAttribute("src");
  el.load();
  el = null;
}

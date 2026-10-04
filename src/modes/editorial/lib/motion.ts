/**
 * Motion primitives shared by the editorial mode.
 * Registers GSAP plugins once and exposes the house easings so every
 * component reveals, hovers and wipes with the same vocabulary.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/** cubic-bezier(.6,0,.25,1): the reveal curve used for every line/char mask. */
export const EASE_REVEAL = CustomEase.create("edReveal", "0.6,0,0.25,1");
/** Hover curve. */
export const EASE_HOVER = "power2.out";
/** Page wipes. */
export const EASE_WIPE = "expo.inOut";

export const CSS_EASE_REVEAL = "cubic-bezier(.6,0,.25,1)";

function mq(query: string): boolean {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

/** Read once at boot; the mode remounts on change of mode anyway. */
export const reducedMotion = mq("(prefers-reduced-motion: reduce)");
export const coarsePointer = mq("(pointer: coarse)");
export const isMobile = () => window.innerWidth < 800;

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Frame-rate independent lerp factor: `base` is the per-frame factor at 60fps. */
export const damp = (base: number, dt: number) => 1 - Math.pow(1 - base, dt * 60);

export { gsap, ScrollTrigger };

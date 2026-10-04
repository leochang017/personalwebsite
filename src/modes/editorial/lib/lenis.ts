/**
 * Lenis smooth scroll wired into the GSAP ticker.
 *
 * Lenis 1.x scrolls the real window (it only smooths the wheel input), so
 * ScrollTrigger reads native scroll positions and no scrollerProxy is needed:
 * we just forward every Lenis scroll event to ScrollTrigger.update and let the
 * GSAP ticker drive Lenis so both share one RAF.
 */
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "./motion";

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });
  lenis.on("scroll", ScrollTrigger.update);
  const instance = lenis;
  tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyLenis() {
  if (tick) gsap.ticker.remove(tick);
  gsap.ticker.lagSmoothing(500, 33);
  lenis?.destroy();
  lenis = null;
  tick = null;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

export function scrollToTarget(target: string | HTMLElement, immediate = false) {
  if (lenis) lenis.scrollTo(target, { immediate, duration: 1.6, offset: -20 });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
}

export function stopScroll() {
  lenis?.stop();
}
export function startScroll() {
  lenis?.start();
}

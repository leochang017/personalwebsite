/**
 * Tiny module-level UI state for the editorial shell. Not a pinia store on
 * purpose: it is private to this mode and resets whenever the mode remounts.
 */
import { reactive } from "vue";

export const ui = reactive({
  /** preloader finished (or skipped) and the hero may play its entrance */
  introDone: false,
  /** true until the visitor clicks anywhere once (drives the yellow sound pill) */
  awaitingFirstClick: true,
  creditsOpen: false,
  /** the photo lightbox is open */
  lightboxOpen: false,
  menuOpen: false,
  /** a page transition is covering the screen */
  transitioning: false,
});

type FeedHandler = (x: number, y: number) => void;

/**
 * Companion "zones" are the title blocks the paper crane lives in.
 * Components register their root element; the crane layer listens.
 */
export const companionBus = {
  zones: new Set<HTMLElement>(),
  listeners: new Set<() => void>(),
  feedHandlers: new Set<FeedHandler>(),
  register(el: HTMLElement) {
    this.zones.add(el);
    this.listeners.forEach((l) => l());
    return () => {
      this.zones.delete(el);
      this.listeners.forEach((l) => l());
    };
  },
  onChange(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  },
  feed(x: number, y: number) {
    this.feedHandlers.forEach((h) => h(x, y));
  },
  onFeed(fn: FeedHandler) {
    this.feedHandlers.add(fn);
    return () => this.feedHandlers.delete(fn);
  },
};

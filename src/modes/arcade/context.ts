import { inject, nextTick, onBeforeUnmount, watch, type InjectionKey, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useModeStore } from "../../stores/mode";
import type { ChipAudio } from "./game/audio";

export const AUDIO_KEY: InjectionKey<ChipAudio> = Symbol("arcade-audio");

export function useAudio(): ChipAudio | null {
  return inject(AUDIO_KEY, null);
}

const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Hover pop for HUD buttons (440→880Hz, 60ms), only with a mouse and sound on. */
export function useHoverBlip() {
  const audio = useAudio();
  const { soundOn } = storeToRefs(useModeStore());
  return () => {
    if (soundOn.value && finePointer()) audio?.hover();
  };
}

/** Drops focus after a mouse/touch click so Space/Enter go back to the game. */
export function blurAfterPointer(e: MouseEvent) {
  if (e.detail > 0 && e.currentTarget instanceof HTMLElement) e.currentTarget.blur();
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus trap for panels: focuses the first control on open, keeps Tab
 * inside, closes on Esc, and hands focus back on close.
 */
export function useFocusTrap(root: Ref<HTMLElement | null>, open: Ref<boolean>, onEscape: () => void) {
  let restore: HTMLElement | null = null;

  const onKey = (e: KeyboardEvent) => {
    const el = root.value;
    if (!el) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      onEscape();
      return;
    }
    if (e.key !== "Tab") return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  let attached: HTMLElement | null = null;
  watch(open, async (isOpen) => {
    if (isOpen) {
      restore = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      await nextTick();
      const el = root.value;
      attached = el;
      el?.addEventListener("keydown", onKey);
      (el?.querySelector<HTMLElement>("[data-autofocus]") ?? el?.querySelector<HTMLElement>(FOCUSABLE))?.focus({ preventScroll: true });
    } else if (attached) {
      attached.removeEventListener("keydown", onKey);
      attached = null;
      if (restore && restore !== document.body && document.contains(restore)) restore.focus({ preventScroll: true });
      else if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      restore = null;
    }
  }, { immediate: true });

  onBeforeUnmount(() => attached?.removeEventListener("keydown", onKey));
}

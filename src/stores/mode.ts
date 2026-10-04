import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type SiteMode = "editorial" | "arcade";
const KEY = "leochang.mode";

function readInitial(): SiteMode {
  try {
    const q = new URLSearchParams(window.location.search).get("mode");
    if (q === "editorial" || q === "arcade") return q;
    const saved = localStorage.getItem(KEY);
    if (saved === "editorial" || saved === "arcade") return saved;
  } catch {}
  return "editorial";
}

export const useModeStore = defineStore("mode", () => {
  const mode = ref<SiteMode>(readInitial());
  /** true while the switch transition is playing; both modes should pause heavy work */
  const switching = ref(false);
  /** global sound preference, shared by both modes */
  const soundOn = ref(false);

  function setMode(next: SiteMode) {
    if (next === mode.value) return;
    switching.value = true;
    // Give the outgoing mode a beat to play its exit (CRT power-off / page wipe)
    window.setTimeout(() => {
      mode.value = next;
      window.setTimeout(() => (switching.value = false), 900);
    }, 650);
  }
  function toggle() {
    setMode(mode.value === "editorial" ? "arcade" : "editorial");
  }

  watch(mode, (m) => {
    try {
      localStorage.setItem(KEY, m);
    } catch {}
    document.documentElement.dataset.mode = m;
  }, { immediate: true });

  return { mode, switching, soundOn, setMode, toggle };
});

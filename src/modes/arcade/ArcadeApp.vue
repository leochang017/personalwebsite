<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useModeStore } from "../../stores/mode";
import { useArcadeStore } from "./store";
import { INFO_LINES, NPCS, PALETTE, type Section } from "./content";
import { AUDIO_KEY } from "./context";
import { ChipAudio } from "./game/audio";
import { Engine } from "./game/Engine";
import type { GameAction, GameBridge, Interactable, PromptInfo, SpawnId } from "./game/types";
import Hud from "./ui/Hud.vue";
import Dialog from "./ui/Dialog.vue";
import Panel from "./ui/Panel.vue";
import Quests from "./ui/Quests.vue";
import Preloader from "./ui/Preloader.vue";

const route = useRoute();
const mode = useModeStore();
const { soundOn, switching } = storeToRefs(mode);
const store = useArcadeStore();
const { skin, talked, partyAt, currentTrack, boothNext } = storeToRefs(store);

const audio = new ChipAudio();
provide(AUDIO_KEY, audio);

const canvas = ref<HTMLCanvasElement | null>(null);
const promptEl = ref<HTMLElement | null>(null);
const dialogRef = ref<InstanceType<typeof Dialog> | null>(null);
const engine = shallowRef<Engine | null>(null);

const preloading = ref(true);
const opening = ref(false);
const started = ref(false);
const failed = ref(false);
const tutorialActive = ref(false);
const prompt = ref<PromptInfo>(null);
const frameMs = ref(0);
const fps = ref(0);

const coarse = window.matchMedia("(pointer: coarse)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Shared route names → arcade districts (each sign on the right wall), projects = the works wall. */
const spawnFor = (name: unknown): SpawnId =>
  name === "about" ? "about"
  : name === "experience" ? "experience"
  : name === "achievements" ? "awards"
  : name === "projects" || name === "work" ? "work"
  : "home";
/** Which panel a route opens on arrival, if any. */
const panelFor = (name: unknown): Section | null =>
  name === "achievements" ? "awards" : name === "about" ? "about" : name === "experience" ? "experience" : null;

// ---------------------------------------------------------------------------
// Bridge: the engine reports here; store owns the state.

function interact(t: Interactable) {
  switch (t.kind) {
    case "sign":
    case "work":
      if (t.section) store.openPanel(t.section, t.work);
      break;
    case "npc": {
      const def = NPCS.find((n) => n.id === t.npc);
      if (def) store.openDialog({ name: def.name, color: def.color, lines: def.lines, npcId: def.id });
      break;
    }
    case "info":
      store.openDialog({ name: "Leo", color: PALETTE.red, lines: INFO_LINES, npcId: null });
      break;
    case "dj":
      store.requestTrack();
      if (!soundOn.value) mode.soundOn = true; // asking for a track means you want to hear it
      break;
    case "skins":
      store.nextSkin();
      break;
  }
}

const bridge: GameBridge = {
  uiAction(a: GameAction) {
    if (!started.value) return true;
    if (store.dialog) {
      if (a === "interact") dialogRef.value?.advance();
      else if (a === "escape") store.dialog = null;
      return true;
    }
    if (store.panel) {
      if (a === "escape") store.closePanel();
      else if (store.panel === "works" && (a === "left" || a === "right")) store.setWork(store.workIndex + (a === "left" ? -1 : 1));
      return true;
    }
    if (store.questsOpen) {
      if (a === "escape") store.questsOpen = false;
      return true;
    }
    return false;
  },
  uiBlocking: () => !started.value || store.uiBlocking,
  interact,
  autoEnter: (t) => interact(t),
  promptChange: (info) => (prompt.value = info),
  tutorialState: (active) => (tutorialActive.value = active),
  tutorialComplete: () => store.completeTutorial(),
  stats: (ms, f) => {
    frameMs.value = ms;
    fps.value = f;
  },
};

// ---------------------------------------------------------------------------
// Boot: preloader (≥1.2s) while fonts load and the world builds.

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
function fontsReady(): Promise<unknown> {
  if (!document.fonts) return Promise.resolve();
  const loads = Promise.all([
    document.fonts.load('800 64px "Archivo"'),
    document.fonts.load('900 64px "Archivo"'),
    document.fonts.load('500 22px "JetBrains Mono"'),
    document.fonts.load('700 64px "Noto Sans SC"', "关于作品经历"),
  ]).catch(() => undefined);
  return Promise.race([loads, wait(2500)]);
}

let disposed = false;
const timers: number[] = [];

onMounted(async () => {
  const el = canvas.value;
  if (!el) return;
  let e: Engine;
  try {
    e = new Engine(el, bridge, { reducedMotion, coarse, audio });
  } catch {
    failed.value = true;
    preloading.value = false;
    return;
  }
  engine.value = e;
  e.setPromptElement(promptEl.value);

  const minTime = wait(1200);
  await fontsReady();
  if (disposed) return;
  e.build({ skin: store.skin, tutorialDone: store.tutorialDone, talked: [...store.talked] }, spawnFor(route.name));
  await minTime;
  if (disposed) return;

  opening.value = true; // eyes open
  timers.push(
    window.setTimeout(() => {
      if (disposed) return;
      e.start(); // CRT power-on under the fading veil
      started.value = true;
      { const pnl = panelFor(route.name); if (pnl) store.openPanel(pnl); }
    }, 300),
    window.setTimeout(() => (preloading.value = false), 1400),
  );
});

// First interaction unlocks the AudioContext (autoplay policy).
const unlock = () => audio.unlock();
window.addEventListener("pointerdown", unlock, { once: true });
window.addEventListener("keydown", unlock, { once: true });

onBeforeUnmount(() => {
  disposed = true;
  timers.forEach((t) => window.clearTimeout(t));
  window.removeEventListener("pointerdown", unlock);
  window.removeEventListener("keydown", unlock);
  engine.value?.dispose();
  engine.value = null;
  audio.dispose();
});

// ---------------------------------------------------------------------------
// State → engine / audio

watch(skin, (i) => engine.value?.setSkin(i));
watch(talked, (ids) => engine.value?.setTalked(ids), { deep: true });
watch(partyAt, (t) => t && engine.value?.party());

// Music: the current track loops; a booth request crossfades to the next one (0.6s).
watch(
  soundOn,
  (on) => {
    audio.setEnabled(on);
    if (!on) return;
    if (!store.trackAnnounced) store.announceTrack();
    audio.playTrack(currentTrack.value.src, 1.2);
  },
  { immediate: true },
);
watch(currentTrack, (t) => {
  if (soundOn.value) audio.playTrack(t.src, 0.6);
});

// mode switch: CRT power-off, then the loop pauses
watch(switching, (s) => {
  if (s) {
    engine.value?.powerOff();
    audio.stop();
  } else engine.value?.setPaused("switching", false);
});

// route changes while mounted: blink-teleport to the district
watch(
  () => route.name,
  (name, prev) => {
    if (!started.value || name === prev) return;
    store.closePanel();
    store.dialog = null;
    const spawn = spawnFor(name);
    engine.value?.teleport(spawn, () => {
      const pnl = panelFor(name);
      if (pnl) store.openPanel(pnl);
    });
  },
);

// ---------------------------------------------------------------------------

const promptKey = computed(() => (coarse ? "Tap" : "E"));
// the booth prompt previews what the next request will play
const promptSub = computed(() => (prompt.value?.kind === "dj" ? `Next: ${boothNext.value.title}` : prompt.value?.sub ?? ""));
function tapPrompt() {
  engine.value?.interactNearest();
}
function onSkip() {
  engine.value?.skipTutorial();
}
function onMove(x: number, y: number) {
  engine.value?.input.setJoystick(x, y);
}
function onJump() {
  audio.unlock();
  engine.value?.input.queueJump();
}
</script>

<template>
  <div class="arcade" :class="{ started }">
    <canvas ref="canvas" class="stage" aria-label="Leo Chang's arcade: a dark neon hall you can walk around" />

    <div ref="promptEl" class="prompt" data-on="0">
      <button
        v-if="prompt"
        type="button"
        class="prompt-btn"
        :tabindex="coarse ? 0 : -1"
        :aria-label="`${prompt.label}: ${promptSub}`"
        @click="tapPrompt"
      >
        <span class="p-sub">{{ promptSub }}</span>
        <span class="p-main"><kbd>{{ promptKey }}</kbd>{{ prompt.label }}</span>
      </button>
    </div>

    <Hud
      :frame-ms="frameMs"
      :fps="fps"
      :tutorial-active="tutorialActive && started"
      :coarse="coarse"
      :ready="started"
      @skip="onSkip"
      @move="onMove"
      @jump="onJump"
    />
    <Dialog ref="dialogRef" />
    <Panel />
    <Quests />

    <p class="sr-only" aria-live="polite">
      {{ started ? "Use W A S D or the arrow keys to move, Space to jump, E to interact. Quests are top left." : "" }}
    </p>

    <div v-if="failed" class="fallback" role="alert">
      <p class="f-title">WebGL is unavailable</p>
      <p>The arcade needs WebGL. The editorial mode has everything too.</p>
      <button type="button" class="f-btn" @click="mode.setMode('editorial')">Switch to editorial</button>
    </div>

    <Preloader v-if="preloading" :opening="opening" />
  </div>
</template>

<style scoped>
.arcade {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #000;
  color: #fff;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  /* tokens used across the arcade UI */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
.stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
  outline: none;
}

/* world-space prompt; the engine writes transform each frame */
.prompt {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  pointer-events: none;
  will-change: transform;
}
.prompt-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transform: translate(-50%, 4px) scale(0.95);
  transform-origin: 50% 100%; /* grows out of the world point it labels */
  opacity: 0;
  transition: opacity 150ms var(--ease-out), transform 150ms var(--ease-out);
  white-space: nowrap;
  cursor: pointer;
}
.prompt[data-on="1"] .prompt-btn {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
  pointer-events: auto;
}
.p-sub {
  font: 500 10px/1 var(--font-mono);
  color: rgba(255, 0, 51, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-shadow: 0 0 6px rgba(255, 0, 51, 0.6);
}
.p-main {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px 4px 4px;
  background: var(--ar-red);
  color: #12000a;
  border-radius: 3px;
  font: 800 12px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  box-shadow: 0 0 16px rgba(255, 0, 51, 0.55);
}
.p-main kbd {
  display: grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: #12000a;
  color: var(--ar-red);
  border-radius: 2px;
  font: 700 10px/1 var(--font-mono);
}
.prompt-btn:active .p-main {
  transform: scale(0.97);
}
@media (prefers-reduced-motion: reduce) {
  .prompt-btn,
  .prompt[data-on="1"] .prompt-btn {
    transform: translate(-50%, 0);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
  font: 400 14px/1.5 var(--font-body);
  z-index: 60;
}
.f-title {
  margin: 0;
  font: 800 28px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  color: var(--ar-red);
}
.f-btn {
  margin-top: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--ar-red);
  color: #000;
  font: 800 13px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  cursor: pointer;
}
</style>

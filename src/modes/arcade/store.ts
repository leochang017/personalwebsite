import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { NPCS, QUESTS, SECTIONS, SKINS, TRACKS, creditFor, type QuestId, type Section } from "./content";
import { projects } from "../../content/leo";

export type NoteKind = "music" | "quest" | "tutorial" | "party" | "info";
export type Note = { id: number; kind: NoteKind; label: string; message: string; sub?: string };

export type DialogState = {
  name: string;
  color: string;
  lines: string[];
  /** NPC id to mark as talked when the dialog finishes; null for non-quest speakers */
  npcId: string | null;
};

const TRACK_KEY = "ar.track";
function readTrack(): string {
  try {
    const saved = localStorage.getItem(TRACK_KEY);
    if (saved && TRACKS.some((t) => t.id === saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return TRACKS[0].id;
}

/**
 * Game progress + UI state for arcade mode. Lives as long as the app, so
 * switching to editorial and back keeps quests and skips the tutorial.
 */
export const useArcadeStore = defineStore("arcade", () => {
  const tutorialDone = ref(false);
  const visited = ref<Section[]>([]);
  const talked = ref<string[]>([]);
  const skinsTried = ref<number[]>([0]);
  const tracksRequested = ref<string[]>([]);
  const worksVisited = ref<number[]>([]);
  const skin = ref(0);
  /** id of the current background track (persisted in localStorage "ar.track") */
  const track = ref<string>(readTrack());
  const trackAnnounced = ref(false);
  const currentTrack = computed(() => TRACKS.find((t) => t.id === track.value) ?? TRACKS[0]);
  /** performance.now() when the afterparty started; 0 = never */
  const partyAt = ref(0);

  // UI
  const panel = ref<Section | null>(null);
  const workIndex = ref(0);
  const questsOpen = ref(false);
  const dialog = ref<DialogState | null>(null);
  const notes = ref<Note[]>([]);
  let noteSeq = 0;

  const questDone = computed<Record<QuestId, boolean>>(() => ({
    tutorial: tutorialDone.value,
    sections: SECTIONS.every((s) => visited.value.includes(s)),
    friends: NPCS.every((n) => talked.value.includes(n.id)),
    skins: SKINS.every((_, i) => skinsTried.value.includes(i)),
    tracks: TRACKS.every((t) => tracksRequested.value.includes(t.id)),
    works: projects.every((_, i) => worksVisited.value.includes(i)),
  }));
  const doneCount = computed(() => QUESTS.filter((q) => questDone.value[q.id]).length);
  const allDone = computed(() => doneCount.value === QUESTS.length);
  const uiBlocking = computed(() => panel.value !== null || dialog.value !== null || questsOpen.value);

  function notify(kind: NoteKind, label: string, message: string, sub?: string) {
    notes.value.push({ id: ++noteSeq, kind, label, message, sub });
  }
  function shiftNote() {
    notes.value.shift();
  }

  /** Runs a mutation, then announces any quest it completed. */
  function track$<T>(mutate: () => T, quiet: QuestId[] = []): T {
    const before = { ...questDone.value };
    const result = mutate();
    for (const q of QUESTS) {
      if (!before[q.id] && questDone.value[q.id] && !quiet.includes(q.id)) notify("quest", "Quest completed", q.label);
    }
    if (allDone.value && partyAt.value === 0) {
      partyAt.value = performance.now();
      notify("party", "Afterparty", "All quests completed!");
    }
    return result;
  }

  function completeTutorial() {
    if (tutorialDone.value) return;
    track$(() => (tutorialDone.value = true), ["tutorial"]);
    notify("tutorial", "Tutorial completed!", "Quest 1/6 done. Find the signs, meet everyone in the hall.");
  }
  function visit(section: Section) {
    track$(() => {
      if (!visited.value.includes(section)) visited.value.push(section);
    });
  }
  function visitWork(i: number) {
    track$(() => {
      if (!worksVisited.value.includes(i)) worksVisited.value.push(i);
    });
  }
  function markTalked(id: string) {
    track$(() => {
      if (!talked.value.includes(id)) talked.value.push(id);
    });
  }
  function nextSkin() {
    const next = (skin.value + 1) % SKINS.length;
    track$(() => {
      skin.value = next;
      if (!skinsTried.value.includes(next)) skinsTried.value.push(next);
    });
    return next;
  }
  /** The DJ booth cycles through the tracks in order. */
  const boothNext = computed(() => {
    const i = TRACKS.findIndex((t) => t.id === track.value);
    return TRACKS[(i + 1) % TRACKS.length];
  });

  function announceTrack() {
    trackAnnounced.value = true;
    const c = creditFor(currentTrack.value);
    notify("music", "Now playing…", c.message, c.sub);
  }
  function requestTrack() {
    const next = boothNext.value;
    track$(() => {
      track.value = next.id;
      if (!tracksRequested.value.includes(next.id)) tracksRequested.value.push(next.id);
    });
    try {
      localStorage.setItem(TRACK_KEY, next.id);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    announceTrack();
    return next;
  }

  function openPanel(section: Section, work?: number) {
    dialog.value = null;
    questsOpen.value = false;
    if (work !== undefined) workIndex.value = work;
    panel.value = section;
    visit(section);
    if (section === "works") visitWork(workIndex.value);
  }
  function setWork(i: number) {
    const n = projects.length;
    workIndex.value = ((i % n) + n) % n;
    visitWork(workIndex.value);
  }
  function closePanel() {
    panel.value = null;
  }
  function openDialog(d: DialogState) {
    panel.value = null;
    questsOpen.value = false;
    dialog.value = d;
  }
  function finishDialog() {
    const id = dialog.value?.npcId;
    dialog.value = null;
    if (id) markTalked(id);
  }

  return {
    tutorialDone, visited, talked, skinsTried, tracksRequested, worksVisited, skin, track, currentTrack, trackAnnounced, partyAt,
    panel, workIndex, questsOpen, dialog, notes,
    questDone, doneCount, allDone, uiBlocking,
    boothNext,
    notify, shiftNote, completeTutorial, visit, visitWork, markTalked, nextSkin, requestTrack, announceTrack,
    openPanel, setWork, closePanel, openDialog, finishDialog,
  };
});

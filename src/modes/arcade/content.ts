/**
 * Arcade-mode copy. Every factual line is derived from src/content/leo.ts;
 * the only new strings here are game UI words (names, labels, track titles)
 * and the two decorative languages of the hall:
 *   - Chinese (simplified) for wayfinding: sign subtitles, the place name, booth labels
 *   - Latin for the "system" voice: HUD micro-labels and the wall motto
 * Both come from Leo's own languages list (Chinese · Conversational, Latin · Academic).
 */
import { arcadeTracks, awards, experiences, facets, leadership, person, projects, type Track } from "../../content/leo";

export type Section = "about" | "experience" | "works" | "awards" | "contact";
export const SECTIONS: readonly Section[] = ["about", "experience", "works", "awards", "contact"];

/** Hall palette: lantern red, gold, magenta (DJ), jade (motto). */
export const PALETTE = { red: "#ff0033", gold: "#ffc24a", magenta: "#ff3bd4", jade: "#6ff0c0" } as const;

export const SECTION_META: Record<Section, { title: string; zh: string; color: string }> = {
  about: { title: "About", zh: "关于", color: PALETTE.gold },
  experience: { title: "Experience", zh: "经历", color: PALETTE.magenta },
  works: { title: "Works", zh: "作品", color: PALETTE.gold },
  awards: { title: "Awards", zh: "荣誉", color: PALETTE.magenta },
  contact: { title: "Contact", zh: "联系", color: PALETTE.gold },
};

/** Latin micro-labels for the HUD ("system" voice). */
export const LATIN = {
  notice: "NUNTIUS", // notification
  quests: "LABORES", // the labours (quests)
  motto: "Sapere aude", // dare to know — the wall sign
  mottoZh: "敢于求知",
  /** person.bio: "Student, builder, researcher" */
  roles: "DISCIPULUS · FABER · INVESTIGATOR",
} as const;

/** Chinese wayfinding strings. */
export const ZH = {
  location: "普林斯顿 · 新泽西", // person.location
  dj: "点歌台", // request-a-track booth
  request: "点歌",
  skins: "换装",
  works: "作品",
} as const;

export type QuestId = "tutorial" | "sections" | "friends" | "skins" | "tracks" | "works";
export const QUESTS: readonly { id: QuestId; label: string }[] = [
  { id: "tutorial", label: "Finish the tutorial" },
  { id: "sections", label: "Visit every district" },
  { id: "friends", label: "Meet everyone in the hall" },
  { id: "skins", label: "Try every skin" },
  { id: "tracks", label: "Request every track at the booth" },
  { id: "works", label: `See all ${["zero", "one", "two", "three", "four", "five", "six"][projects.length] ?? projects.length} projects` },
];

/** Dumpling skins. Classic wheat wrapper, then colours from the hall and the kitchen. */
export const SKINS: readonly { name: string; color: string }[] = [
  { name: "Classic", color: "#f3e9dc" },
  { name: "Lotus", color: "#ffb3c7" },
  { name: "Jade", color: PALETTE.jade },
  { name: "Gold", color: PALETTE.gold },
  { name: "Chili", color: PALETTE.red },
];

/** Background music: the DJ booth cycles through these (all CC BY 4.0). */
export const TRACKS: readonly Track[] = arcadeTracks;

/** Attribution strings for a track, used by the notification, tooltip and ABOUT panel. */
export function creditFor(t: Track) {
  const host = t.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return {
    message: `${t.title} · ${t.artist}`,
    sub: `${t.license} · ${host}`,
    host,
    tooltip: `Music: "${t.title}" by ${t.artist} (${host}), licensed ${t.license}`,
  };
}

function lead(org: string) {
  const found = leadership.find((l) => l.org === org);
  if (!found) throw new Error(`leadership entry missing: ${org}`);
  return found;
}
function job(org: string) {
  const found = experiences.find((e) => e.org === org);
  if (!found) throw new Error(`experience entry missing: ${org}`);
  return found;
}
const facet = (label: string) => facets.find((f) => f.label === label)?.line ?? "";
const sentences = (text: string) => text.split(/(?<=[.!?])\s+/).filter(Boolean);
const rotateLast = (arr: string[]) => (arr.length > 1 ? [arr[arr.length - 1], ...arr.slice(0, -1)] : arr);
const award = (title: string) => awards.find((a) => a.title === title);
const startYear = (period: string) => period.split(" – ")[0];

const spokesman = lead("The Spokesman");
const fencing = lead("Varsity Fencing");
const tiRatana = lead("Ti-Ratana Welfare Society");
const scioly = lead("Science Olympiad");
const chess = lead("ObCHESSed Chess Club");
const sims = lead("SiMS Center (Success in Math and Science)");
const hongik = job("Hongik University");
const ggquanta = job("Zhongke Guoguang Quantum (GGQuanta)");
const rutgers = job("Rutgers University");
const microgrid = projects.find((p) => p.slug === "microgrid");
const champ = award("USA Dance National Champion");
const usdc = award("USDC Pro-Am Finalist");
const embassy = award("Embassy Ball World Pro/Am Finalist");

/** Small object the NPC carries; drawn with primitives in Npc.ts. */
export type NpcProp = "saber" | "paper" | "book" | "rotor" | "pawn" | "chip" | "bolt" | "none";

export type NpcDef = {
  id: string;
  name: string;
  color: string;
  position: [number, number];
  prop: NpcProp;
  lines: string[];
};

/** Leo's "friends": each NPC is one facet of Leo, speaking in first person. */
export const NPCS: readonly NpcDef[] = [
  {
    id: "editor",
    name: "The Editor",
    color: PALETTE.gold,
    position: [-5, 7.5],
    prop: "paper",
    lines: [
      `I'm ${spokesman.role.toLowerCase()} of ${spokesman.org}, our school newspaper, since ${startYear(spokesman.period)}.`,
      "I lead 11 editors and 36 writers, artists, and photographers across print and digital.",
      "Associate Editor in ninth grade, Online Editor in tenth, Editor in Chief since eleventh.",
    ],
  },
  {
    id: "fencer",
    name: "The Fencer",
    color: PALETTE.jade,
    position: [4, 1],
    prop: "saber",
    lines: [
      // fencing.desc, last sentence first: "Competitive saber since age 6." then the varsity lines
      ...rotateLast(sentences(fencing.desc)),
    ],
  },
  {
    id: "dancer",
    name: "The Dancer",
    color: PALETTE.magenta,
    position: [-3.5, -6],
    prop: "none",
    lines: [
      "I've danced ballroom for 12 years. International Standard.",
      champ ? `${champ.title}, ${champ.detail}, ${champ.year}.` : facet("Dancer"),
      usdc && embassy ? `${usdc.title} (${usdc.year}), and ${embassy.title} (${embassy.year}).` : "",
    ].filter(Boolean),
  },
  {
    id: "intern",
    name: "The Intern",
    color: "#ff8a5c",
    position: [-7, 13.5],
    prop: "chip",
    lines: [
      facet("Intern"),
      // ggquanta.desc = "At China's first photonic quantum chip company: wrote and ..., and developed ..."
      `${ggquanta.period}, ${ggquanta.location.replace(" (on-site)", "")}: ${ggquanta.org}, ${ggquanta.desc.split(": ")[0].replace(/^At /, "").toLowerCase()}.`,
      `There I ${ggquanta.desc.split(": ").slice(1).join(": ")}`,
      `${hongik.period}: ${hongik.role.replace("Research Intern, ", "")} at ${hongik.org}, ${hongik.location}. ${hongik.focus}.`,
    ],
  },
  {
    id: "teacher",
    name: "The Teacher",
    color: "#7dff9b",
    position: [5, -12],
    prop: "book",
    lines: [
      `Since ${startYear(tiRatana.period)} I've directed a remote education program at the ${tiRatana.org} in Kuala Lumpur.`,
      "Weekly Zoom lessons in English and science for 6+ years, more than 600 volunteer hours.",
      "We raised $8,000+ for e-learning tools, and the program was featured in Malaysian press.",
      `At school I'm a ${sims.role.toLowerCase()} at the ${sims.org.split(" (")[0]}: drop-in math and science help for Upper School students, five periods a day.`,
    ],
  },
  {
    id: "researcher",
    name: "The Researcher",
    color: "#6ea8ff",
    position: [-4, -17],
    prop: "bolt",
    lines: [
      `I'm a research intern with Prof. Yongfeng Zhang, ${rutgers.org} Computer Science, since ${startYear(rutgers.period)}.`,
      microgrid?.tagline ?? facet("Researcher"),
      microgrid ? `In a 30-household simulation, live agents beat a zero-LLM control: ${microgrid.stats[0]}, ${microgrid.stats[1]}.` : "",
    ].filter(Boolean),
  },
  {
    id: "engineer",
    name: "The Engineer",
    color: "#c8f7ff",
    position: [-7, -22.5],
    prop: "rotor",
    lines: [
      `${scioly.org}: ${scioly.role.toLowerCase()}, since ${startYear(scioly.period)}. Varsity engineering events, Helicopter and Electric Vehicle.`,
      ...scioly.highlights.slice(0, 2).map((h) => `${h}.`),
      `${scioly.highlights[3]}.`,
    ],
  },
  {
    id: "chess",
    name: "The Chess Player",
    color: "#ffffff",
    position: [6.5, -22],
    prop: "pawn",
    lines: [
      `${chess.role} of ${chess.org}, ${chess.period}.`,
      `${chess.highlights[0]}.`,
      `${chess.highlights[1]}, plus ${chess.highlights[2].charAt(0).toLowerCase()}${chess.highlights[2].slice(1)}.`,
    ],
  },
];

/** The "i" lantern reads Leo's own intro, sentence by sentence. */
export const INFO_LINES: string[] = sentences(person.intro);

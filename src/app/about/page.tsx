import type { Metadata } from "next";
import Image from "next/image";
import { PopIn } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About — Leo Chang",
  description:
    "Senior at Princeton Day School (Class of 2027). Builder, researcher, and community leader focused on CS, ML/AI, economics, and finance.",
};

const drives = [
  {
    chip: "RESEARCH",
    chipBg: "bg-pop-purple",
    text: "I research whether LLM agents can coordinate a microgrid fairly, working with Prof. Yongfeng Zhang at Rutgers.",
  },
  {
    chip: "BUILDING",
    chipBg: "bg-pop-green",
    text: "NapkinNotes started as a study tool for friends. Now 80+ people use it every week.",
  },
  {
    chip: "FENCING",
    chipBg: "bg-pop-red",
    text: "I have fenced saber since I was six and compete for our varsity team.",
  },
  {
    chip: "WRITING & EDITING",
    chipBg: "bg-pop-blue",
    text: "I am editor-in-chief of The Spokesman, our school newspaper, and write fiction and poetry on the side.",
  },
  {
    chip: "DANCE",
    chipBg: "bg-pop-pink",
    text: "I compete in ballroom dance and won the USA Dance national title in 2024.",
  },
  {
    chip: "SERVICE",
    chipBg: "bg-pop-amber",
    text: "I have taught weekly lessons at the Ti-Ratana orphanage in Malaysia since 2020, over 600 hours so far.",
  },
];

const skillGroups = [
  {
    label: "LANGUAGES & FRAMEWORKS",
    items: ["Python", "TypeScript/JS", "Java", "GDScript", "Flask", "Next.js/React", "TensorFlow/Keras", "scikit-learn", "SQLAlchemy", "Anthropic API"],
  },
  {
    label: "INFRASTRUCTURE & TOOLS",
    items: ["PostgreSQL", "AWS S3", "Google Cloud", "Vercel", "Godot", "pytest & mypy"],
  },
];

const focusAreas = [
  { name: "Machine Learning", bg: "bg-tint-purple" },
  { name: "LLM Agents", bg: "bg-tint-purple" },
  { name: "Multi-Agent Systems", bg: "bg-tint-purple" },
  { name: "Full-Stack Web", bg: "bg-tint-green" },
  { name: "Data Science", bg: "bg-tint-green" },
  { name: "Game Dev", bg: "bg-tint-green" },
];

const coursework = [
  "AP CS A",
  "AP Microeconomics",
  "AP Macroeconomics",
  "AP Chemistry",
  "AP Comparative Gov",
  "Honors Precalculus",
  "Honors Physics",
];

const languages = [
  { name: "English", level: "NATIVE" },
  { name: "Chinese", level: "CONVERSATIONAL" },
  { name: "Latin", level: "ACADEMIC" },
];

const monoChip =
  "font-mono text-[11px] font-semibold border-2 border-foreground px-2.5 py-[5px]";

export default function AboutPage() {
  return (
    <main>
      {/* ═══ Hero ═══ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-16 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
        <div>
          <PopIn>
            <h1 className="font-sans font-extrabold uppercase text-6xl md:text-8xl leading-[0.92] tracking-[-0.04em] m-0 mb-7">
              About
            </h1>
          </PopIn>
          <PopIn delay={0.1}>
            <p className="font-sans font-medium text-lg md:text-[19px] leading-[1.55] m-0 mb-7 max-w-[560px] text-pretty">
              Hi! Welcome to my personal portfolio website! My name is Leo
              Chang, and I am a Senior at Princeton Day School. I have great
              interests in systems engineering, economics, and writing, with a
              particular passion for machine learning, creative writing, and
              artificial intelligence. Feel free to explore my website, and
              reach out to me via email if you have any questions or
              opportunities to discuss!
            </p>
          </PopIn>
          <PopIn delay={0.18}>
            <div className="flex gap-2.5 flex-wrap">
              <span className={`${monoChip} bg-white tracking-[0.08em]`}>PRINCETON, NJ</span>
              <span className={`${monoChip} bg-white tracking-[0.08em]`}>CLASS OF 2027</span>
              <span className={`${monoChip} bg-foreground text-background tracking-[0.08em]`}>SAT 1550</span>
            </div>
          </PopIn>
        </div>

        {/* Photo */}
        <PopIn delay={0.14}>
          <div className="max-w-[400px]">
            <div className="border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] bg-white p-3">
              <Image
                src="/images/baby.jpg"
                alt="Leo Chang"
                width={2560}
                height={1920}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </PopIn>
      </section>

      {/* ═══ What drives me ═══ */}
      <section className="border-t-[3px] border-foreground bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-16">
          <PopIn>
            <h2 className="font-sans font-extrabold text-3xl md:text-[44px] tracking-[-0.03em] m-0 mb-8">
              WHAT DRIVES ME
            </h2>
          </PopIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {drives.map((d) => (
              <PopIn key={d.chip} className="h-full">
                <div className="bg-white border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] p-[22px] flex flex-col gap-2.5 h-full">
                  <span
                    className={`font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground ${d.chipBg} px-[11px] py-1 rounded-full w-fit`}
                  >
                    {d.chip}
                  </span>
                  <p className="font-sans font-medium text-[15.5px] leading-[1.5] m-0">
                    {d.text}
                  </p>
                </div>
              </PopIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Skills & academics ═══ */}
      <section className="border-t-[3px] border-foreground">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-[72px]">
          <PopIn>
            <h2 className="font-sans font-extrabold text-3xl md:text-[44px] tracking-[-0.03em] m-0 mb-8">
              SKILLS &amp; ACADEMICS
            </h2>
          </PopIn>
          <div className="grid md:grid-cols-3 gap-[22px] mb-[22px]">
            {skillGroups.map((g) => (
              <PopIn key={g.label} className="h-full">
                <div className="bg-white border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] p-[22px] h-full">
                  <div className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted mb-3.5">
                    {g.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className={`${monoChip}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </PopIn>
            ))}
            <PopIn className="h-full">
              <div className="bg-white border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] p-[22px] h-full">
                <div className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted mb-3.5">
                  FOCUS AREAS
                </div>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((f) => (
                    <span key={f.name} className={`${monoChip} ${f.bg}`}>
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </PopIn>
          </div>
          <div className="grid md:grid-cols-[2fr_1fr] gap-[22px]">
            <PopIn className="h-full">
              <div className="bg-white border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] p-[22px] h-full">
                <div className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted mb-3.5">
                  COURSEWORK
                </div>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <span key={c} className={monoChip}>
                      {c}
                    </span>
                  ))}
                  <span className={`${monoChip} bg-ink-yellow`}>
                    Latin 4 — St. John&apos;s University dual enrollment
                  </span>
                </div>
              </div>
            </PopIn>
            <PopIn className="h-full">
              <div className="bg-white border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] p-[22px] h-full">
                <div className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted mb-3.5">
                  LANGUAGES
                </div>
                <div className="flex flex-col gap-2.5">
                  {languages.map((l) => (
                    <div key={l.name} className="flex justify-between gap-3 font-sans font-medium text-sm">
                      <span>{l.name}</span>
                      <span className="font-mono text-[11px] font-semibold text-muted">
                        {l.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </PopIn>
          </div>
        </div>
      </section>
    </main>
  );
}

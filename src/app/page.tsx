"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PopIn } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { HeroVideo } from "@/components/HeroVideo";

/* ────────────────────── DATA ────────────────────── */

const facets = [
  {
    label: "RESEARCHER",
    hue: 290,
    line: "Researching whether LLM agents can fairly share solar power during a grid outage.",
    proof: "ACTIVE RESEARCH W/ PROF. YONGFENG ZHANG · RUTGERS CS · REAL NREL DATA",
  },
  {
    label: "BUILDER",
    hue: 150,
    line: "Co-founder of NapkinNotes, a web app that turns handwritten notes into study resources.",
    proof: "80+ REGULAR USERS · 170+ UPLOADED NOTES · FLASK, POSTGRESQL, CLAUDE AI",
  },
  {
    label: "FENCER",
    hue: 25,
    line: "Varsity saber fencer, competing since age six.",
    proof: "4-YEAR VARSITY · 2ND NJSIAA REGIONALS (IND. & TEAM) · NJ STATE FINAL QUALIFIER",
  },
  {
    label: "EDITOR & WRITER",
    hue: 240,
    line: "Editor-in-chief of The Spokesman, leading a staff of 47.",
    proof: "EDITOR-IN-CHIEF, THE SPOKESMAN · PYAA GOLD AWARD · 2× SCHOLASTIC SILVER KEY",
  },
  {
    label: "DANCER",
    hue: 350,
    line: "USA Dance National Champion, 2024.",
    proof: "JUNIOR & YOUTH PRE-CHAMP TITLES, 2024 · USDC PRO-AM NATIONAL FINALIST '23, '25",
  },
  {
    label: "VOLUNTEER",
    hue: 70,
    line: "Six years of weekly lessons for orphaned children in Malaysia.",
    proof: "DIRECTOR, TI-RATANA ORPHANAGE EDUCATION PROGRAM · 600+ HOURS · RAISED $8,000",
  },
];

const highlights = [
  {
    badge: "ACTIVE RESEARCH",
    badgeBg: "bg-pop-purple",
    line: "LLM agents that share power fairly.",
    proof: "w/ Prof. Yongfeng Zhang, Rutgers CS · 30-household sim on real NREL data",
    cta: "Microgrid Agents →",
    href: "/projects",
  },
  {
    badge: "PUBLISHED",
    badgeBg: "bg-pop-blue",
    line: "Accepted for publication.",
    proof: "Stock ML — LSTMs on 80K+ tweets · Journal of Emerging Investigators · lead researcher",
    cta: "Read the paper →",
    href: "/projects/stockml",
  },
  {
    badge: "WEB APP",
    badgeBg: "bg-pop-green",
    line: "A web app with 80+ regular users.",
    proof: "NapkinNotes, co-founder · 170+ notes uploaded · OCR + Claude",
    cta: "NapkinNotes →",
    href: "/projects/napkinnotes",
  },
  {
    badge: "NATIONAL CHAMPION",
    badgeBg: "bg-pop-pink",
    line: "National DanceSport Champion, 2024.",
    proof: "USA Dance Nationals · Junior & Youth Pre-Champ · won as a sophomore",
    cta: "Achievements →",
    href: "/achievements",
  },
  {
    badge: "2ND · NJSIAA",
    badgeBg: "bg-pop-red",
    line: "Four years of varsity saber.",
    proof: "2nd NJSIAA Regionals, individual & team · NJ State Final qualifier · fencing since age 6",
    cta: "Varsity Fencing →",
    href: "/experience/fencing",
  },
  {
    badge: "6 YEARS · MALAYSIA",
    badgeBg: "bg-pop-amber",
    line: "600+ hours teaching in Malaysia.",
    proof: "Director, Ti-Ratana Orphanage Education Program · raised $8,000 for e-learning",
    cta: "Ti-Ratana →",
    href: "/experience/tiratana",
  },
];

const pathways = [
  {
    word: "PROJECTS",
    chip: "04",
    chipBg: "bg-pop-purple",
    desc: "research, a web app, a playable game",
    href: "/projects",
  },
  {
    word: "EXPERIENCE",
    chip: "07",
    chipBg: "bg-pop-green",
    desc: "research, internships & work",
    href: "/experience",
  },
  {
    word: "ACHIEVEMENTS",
    chip: "19+",
    chipBg: "bg-pop-amber",
    desc: "placements, writing awards & a publication",
    href: "/achievements",
  },
  {
    word: "ABOUT",
    chip: "ME",
    chipBg: "bg-pop-pink",
    desc: "bio, skills & coursework",
    href: "/about",
  },
];

/* letter hover colors — oklch(0.62 0.16 H), rotations from the design */
/* Grouped by word so a narrow viewport breaks between words, never mid-name. */
const nameWords: { ch: string; hue: number; rot: number }[][] = [
  [
    { ch: "L", hue: 290, rot: -4 },
    { ch: "E", hue: 150, rot: 3 },
    { ch: "O", hue: 25, rot: -3 },
  ],
  [
    { ch: "C", hue: 240, rot: 4 },
    { ch: "H", hue: 350, rot: -4 },
    { ch: "A", hue: 70, rot: 3 },
    { ch: "N", hue: 290, rot: -3 },
    { ch: "G", hue: 150, rot: 4 },
  ],
];

/* ────────────────────── PAGE ────────────────────── */

export default function Home() {
  const [facet, setFacet] = useState(0);
  const f = facets[facet];

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="relative isolate overflow-hidden border-b-[3px] border-foreground">
        <HeroVideo />
        {/* extra bottom padding on mobile so the floating chat pill never covers a CTA */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-[72px] pb-28 md:pb-14">
        <PopIn delay={0.06}>
          <h1
            aria-label="Leo Chang"
            className="font-sans font-extrabold text-[17vw] sm:text-7xl md:text-8xl lg:text-[132px] leading-[0.9] tracking-[-0.04em] m-0 mb-8 cursor-default select-none"
          >
            {nameWords.map((word, w) => (
              <span key={w} className="inline-block whitespace-nowrap">
                {word.map((l, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="inline-block"
                    whileHover={{
                      y: -10,
                      rotate: l.rot,
                      color: `oklch(0.62 0.16 ${l.hue})`,
                    }}
                    transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {l.ch}
                  </motion.span>
                ))}
                {/* space trails the word so a wrap never indents the next line */}
                {w < nameWords.length - 1 && (
                  <span className="inline-block w-[0.28em]" />
                )}
              </span>
            ))}
          </h1>
        </PopIn>

        {/* Facet tabs */}
        <PopIn delay={0.14}>
          <div className="flex gap-2.5 flex-wrap mb-7">
            {facets.map((ft, i) => (
              <button
                key={ft.label}
                onClick={() => setFacet(i)}
                aria-pressed={i === facet}
                className="font-sans font-bold text-[13px] tracking-[0.05em] px-[18px] py-[9px] border-[3px] border-foreground rounded-full cursor-pointer text-foreground shadow-[3px_3px_0_var(--color-ink-shadow)] transition-[transform,background-color] duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none"
                style={{
                  background:
                    i === facet
                      ? `oklch(0.82 0.12 ${ft.hue})`
                      : "var(--color-background)",
                }}
              >
                {ft.label}
              </button>
            ))}
          </div>
        </PopIn>

        {/* Facet display */}
        <PopIn delay={0.22}>
          <div className="min-h-[158px]">
            <div
              className="w-16 h-3 border-[2.5px] border-foreground mb-4 transition-colors duration-300"
              style={{ background: `oklch(0.82 0.12 ${f.hue})` }}
            />
            <div className="font-sans font-bold text-2xl md:text-[40px] leading-[1.12] tracking-[-0.02em] max-w-[900px] mb-3 text-pretty">
              {f.line}
            </div>
            <div className="font-mono text-xs md:text-sm font-semibold text-secondary">
              {f.proof}
            </div>
          </div>
        </PopIn>

        {/* CTAs */}
        <PopIn delay={0.3}>
          <div className="flex gap-3 md:gap-4 flex-wrap mt-8">
            <a href="#proof" className="ink-btn ink-btn--dark !text-[15px] !px-[26px] !py-[13px]">
              SEE THE WORK ↓
            </a>
            <Link href="/projects" className="ink-btn !text-[15px] !px-[26px] !py-[13px]">
              PROJECTS →
            </Link>
            <a
              href="/images/LeoChangResume_July2026.pdf"
              download
              className="ink-btn !text-[15px] !px-[26px] !py-[13px]"
            >
              RESUME.PDF
            </a>
          </div>
        </PopIn>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-16">
        <PopIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 4, suffix: "", label: "PROJECTS" },
              { value: 5, suffix: "", label: "LEADERSHIP ROLES" },
              { value: 19, suffix: "+", label: "AWARDS" },
            ].map((s) => (
              <div
                key={s.label}
                className="border-[3px] border-foreground bg-white shadow-[3px_3px_0_var(--color-ink-shadow)] px-5 py-[18px]"
              >
                <div className="font-sans font-extrabold text-4xl md:text-[44px] tracking-[-0.03em]">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
            <div className="border-[3px] border-foreground bg-foreground text-background shadow-[3px_3px_0_var(--color-ink-shadow)] px-5 py-[18px]">
              <div className="font-sans font-extrabold text-4xl md:text-[44px] tracking-[-0.03em]">
                <CountUp target={1550} suffix="" />
              </div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-paper-dim">
                SAT
              </div>
            </div>
          </div>
        </PopIn>
      </section>

      {/* ═══ HIGHLIGHTS (proof of depth) ═══ */}
      <section id="proof" className="border-t-[3px] border-foreground bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-[72px]">
          <PopIn>
            <h2 className="font-sans font-extrabold text-4xl md:text-[52px] tracking-[-0.03em] m-0 mb-9">
              HIGHLIGHTS
            </h2>
          </PopIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {highlights.map((h) => (
              <PopIn key={h.badge} className="h-full">
                <Link
                  href={h.href}
                  className="ink-card p-6 flex flex-col gap-3 h-full"
                >
                  <span
                    className={`font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground ${h.badgeBg} px-[11px] py-1 rounded-full w-fit`}
                  >
                    {h.badge}
                  </span>
                  <span className="font-sans font-bold text-[25px] leading-[1.15] tracking-[-0.02em] text-pretty">
                    {h.line}
                  </span>
                  <span className="font-mono text-[12.5px] leading-[1.6] font-medium text-muted">
                    {h.proof}
                  </span>
                  <span className="font-sans font-bold text-[13px] mt-auto">
                    {h.cta}
                  </span>
                </Link>
              </PopIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PATHWAYS ═══ */}
      <section className="border-t-[3px] border-foreground">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-20">
          <div className="flex flex-col">
            {pathways.map((p, i) => (
              <PopIn key={p.word}>
                <Link
                  href={p.href}
                  className={`flex items-center gap-4 md:gap-6 py-6 px-2 border-t-[3px] border-foreground no-underline text-foreground transition-transform duration-150 hover:translate-x-3.5 ${
                    i === pathways.length - 1 ? "border-b-[3px]" : ""
                  }`}
                >
                  <span className="font-sans font-extrabold text-3xl sm:text-5xl md:text-[62px] tracking-[-0.03em]">
                    {p.word}
                  </span>
                  <span
                    className={`font-mono text-[13px] font-semibold border-2 border-foreground ${p.chipBg} px-3 py-[5px] rounded-full shrink-0`}
                  >
                    {p.chip}
                  </span>
                  <span className="hidden md:inline font-sans font-medium text-[15px] text-muted">
                    {p.desc}
                  </span>
                  <span className="font-sans font-extrabold text-2xl md:text-[40px] ml-auto">
                    →
                  </span>
                </Link>
              </PopIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

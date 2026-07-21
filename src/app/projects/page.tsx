"use client";
import { useState } from "react";
import Link from "next/link";
import { Terminal } from "@/components/Terminal";
import { PopIn } from "@/components/ScrollReveal";

type Project = {
  title: string;
  status: string;
  statusBg: string;
  roleChip: string;
  roleChipDashed?: boolean;
  desc: string;
  stats: string[];
  tech: string;
  href?: string;
  repo?: string;
  playHref?: string;
  website?: string;
};

const projects: Project[] = [
  {
    title: "LLM Microgrid Agents",
    status: "ACTIVE RESEARCH",
    statusBg: "bg-pop-purple",
    roleChip: "EXPERIMENTS IN PROGRESS",
    roleChipDashed: true,
    desc: "Can LLM agents, one per household, negotiate in plain English to fairly share limited solar and battery power during a grid outage? A deterministic 30-household simulation on real NREL solar and load data, with a classical optimization baseline, measuring fairness, robustness to bad information, and explainability. With Prof. Yongfeng Zhang, Rutgers CS.",
    stats: ["30 HOUSEHOLDS", "REAL NREL DATA"],
    tech: "Python · NREL ResStock/NSRDB · Anthropic API · multi-agent",
    repo: "https://github.com/leochang017/microgrid-llm-coordination",
  },
  {
    title: "Stock ML",
    status: "ACCEPTED FOR PUBLICATION",
    statusBg: "bg-ink-yellow",
    roleChip: "LEAD RESEARCHER",
    desc: "LSTM neural networks predicting stock prices from Twitter sentiment: 80,793 tweets across AAPL, TSLA, and MSFT with 13 technical indicators. Adding sentiment raised average RMSE by about 32%, a result that runs against common assumptions in financial ML. Accepted by the Journal of Emerging Investigators.",
    stats: ["80K+ TWEETS", "7+ FIGURES"],
    tech: "Python · TensorFlow/Keras · LSTM · TextBlob",
    href: "/projects/stockml",
  },
  {
    title: "NapkinNotes",
    status: "WEB APP",
    statusBg: "bg-pop-green",
    roleChip: "CO-FOUNDER",
    desc: "Web app that turns handwritten notes into study resources: OCR (Google Cloud Vision + PyMuPDF), Claude summarization, a social layer with follows and comments, and a student marketplace. 100+ routes, 22 models, OWASP-aligned audit logging.",
    stats: ["80+ USERS", "170+ NOTES"],
    tech: "Flask · PostgreSQL · Claude AI · AWS S3",
    href: "/projects/napkinnotes",
    website: "https://napkinnotes.net",
  },
  {
    title: "Phase Spector",
    status: "PLAYABLE",
    statusBg: "bg-pop-red",
    roleChip: "SOLO DEV",
    desc: "Top-down wave-based arcade shooter built around a time-rewind mechanic: record 1.5 seconds of movement, then rewind at double speed to damage enemies along your trail. Mini-bosses, chain-kill multipliers, and a top-5 high-score table.",
    stats: ["500+ PDS PLAYERS"],
    tech: "Godot 4 · GDScript",
    href: "/projects/phasespector",
    playHref: "/projects/phase-spector/phase-spector.html",
  },
];

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="ink-card p-6 md:p-7 flex flex-col gap-3.5 h-full">
      <div className="flex gap-2 flex-wrap">
        <span
          className={`font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground ${p.statusBg} px-[11px] py-1 rounded-full`}
        >
          {p.status}
        </span>
        <span
          className={`font-mono text-[10.5px] font-semibold px-[11px] py-1 rounded-full ${
            p.roleChipDashed
              ? "border-2 border-dashed border-muted text-muted"
              : "border-2 border-foreground"
          }`}
        >
          {p.roleChip}
        </span>
      </div>
      <div className="font-sans font-extrabold text-2xl md:text-[34px] tracking-[-0.02em]">
        {p.href ? (
          <Link href={p.href} className="no-underline text-foreground">
            {p.title}
          </Link>
        ) : (
          p.title
        )}
      </div>
      <p className="font-sans text-[15px] leading-[1.55] text-secondary m-0 text-pretty">
        {p.desc}
      </p>
      <div className="flex gap-4 flex-wrap font-mono text-xs font-semibold">
        {p.stats.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-2 mt-auto border-t-2 border-surface pt-3.5">
        <span className="font-mono text-[11px] font-medium text-muted">{p.tech}</span>
        <span className="flex gap-4 shrink-0 font-sans font-bold text-sm">
          {p.playHref && (
            <a href={p.playHref} target="_blank" rel="noopener noreferrer" className="no-underline text-foreground hover:underline">
              PLAY ↗
            </a>
          )}
          {p.website && (
            <a href={p.website} target="_blank" rel="noopener noreferrer" className="no-underline text-foreground hover:underline">
              SITE ↗
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="no-underline text-foreground hover:underline">
              GITHUB ↗
            </a>
          )}
          {p.href && (
            <Link href={p.href} className="no-underline text-foreground hover:underline">
              DETAIL →
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [view, setView] = useState<"terminal" | "browse">("browse");

  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-10">
        <PopIn delay={0.06}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-sans font-extrabold uppercase text-6xl md:text-8xl leading-[0.92] tracking-[-0.04em] m-0">
              Projects
            </h1>
            {/* Terminal / browse toggle */}
            <div className="flex gap-2">
              {(["browse", "terminal"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`font-mono text-[11px] font-semibold tracking-[0.08em] uppercase px-3.5 py-[7px] border-2 border-foreground cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 ${
                    view === v
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </PopIn>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        {view === "terminal" ? (
          <PopIn>
            <div className="max-w-4xl">
              <Terminal />
              <p className="font-mono text-[11px] text-muted mt-4">
                try: <span className="font-semibold">help</span> · <span className="font-semibold">ls</span> · <span className="font-semibold">cat napkinnotes</span> · <span className="font-semibold">clear</span>
              </p>
            </div>
          </PopIn>
        ) : (
          <div className="grid md:grid-cols-2 gap-[26px]">
            {projects.map((p, i) => (
              <PopIn key={p.title} delay={i < 2 ? 0.12 + i * 0.06 : 0} className="h-full">
                <ProjectCard p={p} />
              </PopIn>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

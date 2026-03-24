"use client";
import { useState } from "react";
import { Terminal } from "@/components/Terminal";
import { FadeUp, ScaleIn } from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Phase Spector",
    desc: "Top-down wave-based arcade shooter with a unique time-rewind combat mechanic. Record your movement path, then rewind at 2x speed to damage enemies and deflect projectiles along your trail. Features endless waves with sigmoid-based difficulty scaling, 3 enemy types including mini-bosses, a chain-kill score multiplier, and persistent high score leaderboards.",
    tech: ["Godot 4.6", "GDScript", "Wave Spawning", "Signal Architecture"],
    status: "Playable",
    logo: "/images/gamepad-icon.svg",
    role: "Game Developer",
    href: "/projects/phasespector",
    playHref: "/projects/phase-spector/phase-spector.html",
  },
  {
    title: "NapkinNotes",
    desc: "Full-stack AI-powered EdTech platform serving 500+ Princeton Day School students. Transforms raw class notes into organized study resources using OCR extraction (Google Cloud Vision), AI summarization (Claude API), and a peer-to-peer social layer with reputation scoring. Supports multi-format uploads, course organization, and comprehensive admin tooling.",
    tech: ["Flask", "PostgreSQL", "Claude API", "Google Cloud Vision", "AWS S3", "Redis"],
    status: "Active",
    logo: "/images/napkinnotes-logo.png",
    role: "Co-Founder & Lead Developer",
    href: "/projects/napkinnotes",
    website: "https://napkinnotes.net",
  },
  {
    title: "Stock Price Prediction ML",
    desc: "Research accepted for publishing in the Journal of Emerging Investigators investigating whether Twitter sentiment analysis improves LSTM-based stock price prediction. Tested AAPL, TSLA, and MSFT over one year with 80,793 tweets and 13 technical indicators. Key finding: sentiment-enhanced models showed ~32% average RMSE increase, challenging prevailing assumptions in financial ML.",
    tech: ["Python", "TensorFlow/Keras", "LSTM", "TextBlob", "SciPy"],
    status: "Accepted for Publishing",
    logo: "/images/JEI.png",
    role: "Lead Researcher & Developer",
    href: "/projects/stockml",
  },
];

const commands = [
  { cmd: "help", desc: "Show all commands" },
  { cmd: "ls", desc: "List all projects" },
  { cmd: "cat napkinnotes", desc: "View & open NapkinNotes" },
  { cmd: "cat stockml", desc: "View & open Stock ML" },
  { cmd: "cat phasespector", desc: "View & open Phase Spector" },
  { cmd: "clear", desc: "Clear terminal" },
];

export default function ProjectsPage() {
  const [view, setView] = useState<"terminal" | "scroll">("terminal");

  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="font-sans text-4xl font-black tracking-tight mb-2">Projects</h1>
              <p className="text-muted text-lg font-body">
                Full-stack apps, games, and research.
              </p>
            </div>
            {/* View Toggle */}
            <div className="flex bg-surface border border-border rounded-xl p-1 gap-1">
              <button
                onClick={() => setView("terminal")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border-none cursor-pointer ${
                  view === "terminal"
                    ? "bg-accent text-white"
                    : "bg-transparent text-muted hover:text-foreground"
                }`}
              >
                Terminal
              </button>
              <button
                onClick={() => setView("scroll")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border-none cursor-pointer ${
                  view === "scroll"
                    ? "bg-accent text-white"
                    : "bg-transparent text-muted hover:text-foreground"
                }`}
              >
                Browse
              </button>
            </div>
          </div>
        </FadeUp>

        {view === "terminal" ? (
          <div>
            <ScaleIn>
              <div className="max-w-4xl mx-auto">
                <Terminal />
              </div>
            </ScaleIn>
            {/* Commands reference */}
            <FadeUp delay={0.2}>
              <div className="max-w-4xl mx-auto mt-8">
                <h3 className="font-sans text-sm font-bold text-muted uppercase tracking-wider mb-4 text-center">Available Commands</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {commands.map((c) => (
                    <div key={c.cmd} className="flex items-center gap-3 px-4 py-2.5 bg-surface border border-border rounded-xl">
                      <code className="font-mono text-xs text-accent font-semibold min-w-[140px]">{c.cmd}</code>
                      <span className="text-xs text-muted font-body">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        ) : (
          <div className="space-y-5">
            {projects.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div className="group bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-6 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <div className="shrink-0 flex flex-col items-center gap-3 md:w-20">
                    <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      p.status === "Active"
                        ? "text-green-700 bg-green-100"
                        : "text-accent bg-accent/8"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Link href={p.href} className="no-underline text-foreground flex items-center gap-3">
                      {p.logo.startsWith("/") ? (
                        <div className="w-10 h-10 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                          <Image src={p.logo} alt={p.title} width={32} height={32} className="object-contain" />
                        </div>
                      ) : (
                        <span className="text-2xl shrink-0">{p.logo}</span>
                      )}
                      <h2 className="font-sans text-xl font-bold group-hover:text-accent transition-colors">
                        {p.title}
                      </h2>
                    </Link>
                    <p className="text-xs text-accent font-semibold mb-3">{p.role}</p>
                    <p className="text-sm text-muted leading-relaxed mb-4 font-body">{p.desc}</p>
                    <div className="flex gap-2 flex-wrap items-center">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-surface-light text-muted">{t}</span>
                      ))}
                      <Link href={p.href} className="ml-auto text-sm text-accent font-semibold no-underline hover:underline">
                        View Details &rarr;
                      </Link>
                    </div>
                    {(p.playHref || p.website) && (
                      <div className="mt-3 flex gap-4">
                        {p.playHref && (
                          <a href={p.playHref} target="_blank" rel="noopener noreferrer" className="inline-flex text-xs text-olive font-semibold no-underline hover:underline">
                            Play in Browser ↗
                          </a>
                        )}
                        {p.website && (
                          <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex text-xs text-olive font-semibold no-underline hover:underline">
                            {p.website.replace("https://", "")} ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

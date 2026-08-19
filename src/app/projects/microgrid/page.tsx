import type { Metadata } from "next";
import Link from "next/link";
import { PopIn } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "LLM Microgrid Agents — Leo Chang",
  description: "Can LLM agents negotiate in plain English to fairly share energy during a grid outage? Research with Prof. Yongfeng Zhang, Rutgers CS. Paper in preparation.",
};

const methodology = [
  {
    step: 1,
    title: "Deterministic Simulator",
    desc: "A 30-household neighborhood (5×6 grid) simulated in 15-minute ticks across a 24-hour outage, with realistic battery physics (90% round-trip efficiency, depth-of-discharge floor, transit losses, a shared bus cap) and synthetic load and solar profiles. Fully deterministic: every number regenerates at $0 from committed caches.",
  },
  {
    step: 2,
    title: "LLM Agent Layer",
    desc: "One Claude agent per household. Agents communicate through typed natural-language messages, update beliefs about neighbors solely from what peers report, perceive their own state through a noisy interface, and establish binding commitments to transfer energy.",
  },
  {
    step: 3,
    title: "Controls & Baselines",
    desc: "The key comparison: a zero-LLM control that runs the identical machinery with deterministic policies in place of the LLM. Upper bound: a linear-programming oracle with perfect information. A round-robin heuristic is reported as a secondary reference.",
  },
  {
    step: 4,
    title: "Failure-Axis Stress Tests",
    desc: "Beyond clean runs, single-seed cells probe robustness: defecting households that withhold generation, observation noise on battery and load readings, and a strict cap on how many messages agents may send per tick.",
  },
];

const robustness = [
  {
    cell: "Defectors",
    result: "+2.3 pts",
    positive: true,
    detail: "With 33.6% of generation withheld by defecting households, live agents still beat the control (single seed), retaining 89.1% of coordination value where naive proportional scaling predicts 66.4%.",
  },
  {
    cell: "Observation Noise",
    result: "+0.9 pts",
    positive: true,
    detail: "With ±10% noise on battery state and ±15% on load, the clean-cell edge of +4.6 points compresses to +0.9 (single seed): coordination survives bad information, but barely.",
  },
  {
    cell: "Message Budget",
    result: "−0.86 pts",
    positive: false,
    detail: "Capped at 2 messages per tick, live agents fall below the control (single seed). Natural-language coordination has real bandwidth overhead; most messages were budget-dropped.",
  },
];

const techStackItems = [
  {
    category: "Simulation",
    items: ["Python", "NumPy", "SciPy", "Deterministic replay"],
  },
  {
    category: "Agents",
    items: ["Anthropic API", "Claude Haiku 4.5 agents", "Claude Sonnet judge"],
  },
  {
    category: "Baselines",
    items: ["Zero-LLM control", "LP oracle", "Round-robin"],
  },
  {
    category: "Rigor",
    items: ["424 tests", "mypy", "CI on every push", "$0 reproduction"],
  },
];

const metrics = [
  { number: "+5.8 pts", label: "SERVED LOAD VS ZERO-LLM CONTROL" },
  { number: "29%", label: "CONTROL→ORACLE GAP CLOSED" },
  { number: "3/3", label: "SEEDS REPLICATED · 424 TESTS" },
];

export default function MicrogridPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-20">
      {/* Back link */}
      <PopIn>
        <Link
          href="/projects"
          className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7"
        >
          &larr; ALL PROJECTS
        </Link>
      </PopIn>

      {/* Hero */}
      <PopIn delay={0.06}>
        <div className="flex gap-2 flex-wrap mb-5">
          <span className="font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground bg-pop-purple px-[11px] py-1 rounded-full">
            RESEARCH COMPLETE
          </span>
          <span className="font-mono text-[10.5px] font-semibold border-2 border-foreground px-[11px] py-1 rounded-full">
            PAPER IN PREPARATION
          </span>
        </div>
        <h1 className="font-sans font-extrabold text-5xl md:text-[76px] leading-[0.95] tracking-[-0.04em] m-0 mb-5">
          LLM Microgrid Agents
        </h1>
        <p className="font-sans font-medium text-[21px] leading-[1.45] max-w-[760px] m-0 mb-4">
          Can LLM agents, one per household, negotiate in plain English to fairly
          share limited solar and battery power during a grid outage? Yes: live
          agents beat a zero-LLM control on every clean seed, and fairness improved
          alongside.
        </p>
        <div className="font-mono text-xs font-medium tracking-[0.06em] text-muted uppercase mb-8">
          With Prof. Yongfeng Zhang, Rutgers CS &middot; April 2026 &ndash; Present
        </div>
      </PopIn>

      {/* Metrics */}
      <PopIn delay={0.12}>
        <div className="grid sm:grid-cols-3 gap-[18px] mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-[18px]"
            >
              <div className="font-sans font-extrabold text-[38px] tracking-[-0.03em]">{m.number}</div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Overview */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Overview
        </h2>
        <div className="font-sans text-[16px] leading-[1.65] text-secondary max-w-[760px] space-y-4 mb-14">
          <p className="m-0">
            Climate disasters cause long grid outages, and households ride them out
            very unequally: some have rooftop solar and large batteries, others only
            small batteries. Classical optimization can allocate the neighborhood&apos;s
            energy fairly, but it assumes a central controller with perfect,
            pre-formalized information, and it cannot explain its decisions to the
            residents who live with them.
          </p>
          <p className="m-0">
            This research asks whether a population of LLM agents, one per household,
            can close that gap by negotiating peer-to-peer in natural language:
            reporting needs, updating beliefs about neighbors from nothing but what
            peers say, making binding commitments to transfer energy, and justifying
            their actions afterward. The agents work with limited and potentially
            inaccurate information, just as real neighbors would.
          </p>
          <p className="m-0">
            On the three clean seeds of the showcase scenario, live agents raised
            total served load by 5.8 &plusmn; 1.0 percentage points over a zero-LLM
            control, closing 29.0% &plusmn; 2.9 of the gap between that control and a
            perfect-information oracle, with distributional fairness improving at the
            same time: no efficiency-versus-equity tradeoff. An LLM judge distinct
            from the agent model found the agents&apos; explanations actionable and
            consistent with their actions, though weaker on state accuracy. The stress tests below show
            where the approach bends and where it breaks.
          </p>
        </div>
      </PopIn>

      {/* Key Finding */}
      <PopIn delay={0.06}>
        <div className="border-[3px] border-foreground bg-ink-yellow shadow-[4px_4px_0_var(--color-ink-shadow)] p-7 md:p-9 mb-14 max-w-[860px]">
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] uppercase mb-3">
            Key Finding
          </div>
          <p className="font-sans font-extrabold text-xl md:text-2xl leading-snug tracking-[-0.02em] m-0">
            Natural-language negotiation added +5.8 &plusmn; 1.0 points of served load
            over a zero-LLM control, on all 3 of 3 seeds
          </p>
          <p className="font-sans text-[15px] leading-[1.55] mt-3 m-0">
            Earlier naive versions of the agent layer lost to simple heuristics; the
            result flipped only after reworking how information flows, so that beliefs
            come solely from peer reports and negotiated commitments actually bind.
            The comparison is against a control that runs identical machinery with
            deterministic policies, so the delta isolates what the LLM itself adds.
          </p>
        </div>
      </PopIn>

      {/* Methodology */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Methodology
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {methodology.map((m) => (
            <div key={m.step} className="ink-card p-6 flex items-start gap-4">
              <span className="flex-none w-9 h-9 border-2 border-foreground bg-ink-yellow flex items-center justify-center font-mono text-sm font-bold">
                {m.step}
              </span>
              <div>
                <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0 mb-1.5">{m.title}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Robustness cells */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Robustness Stress Tests
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {robustness.map((r) => (
            <div key={r.cell} className="ink-card p-6 flex flex-col gap-3">
              <h3 className="font-sans font-extrabold text-xl tracking-[-0.02em] m-0">{r.cell}</h3>
              <div className="flex gap-2 flex-wrap">
                <span
                  className={`font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground px-3.5 py-1.5 rounded-full ${
                    r.positive ? "bg-pop-green" : "bg-tint-red"
                  }`}
                >
                  {r.result} vs control
                </span>
                <span className="font-mono text-[11px] font-semibold px-3.5 py-1.5 rounded-full border-2 border-dashed border-muted text-muted">
                  n = 1 seed
                </span>
              </div>
              <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{r.detail}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Technical stack */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Technical Stack
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {techStackItems.map((s) => (
            <div key={s.category} className="ink-card p-6 h-full">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted uppercase m-0 mb-3.5">
                {s.category}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-white px-3.5 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Links */}
      <PopIn>
        <div className="flex gap-4 flex-wrap">
          <a
            href="https://microgrid-llm-coordination.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn ink-btn--dark no-underline"
          >
            RESEARCH DEMO &#8599;
          </a>
          <a
            href="https://github.com/leochang017/microgrid-llm-coordination"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn no-underline"
          >
            GITHUB &#8599;
          </a>
          <Link href="/projects" className="ink-btn no-underline">
            &larr; ALL PROJECTS
          </Link>
        </div>
      </PopIn>
    </main>
  );
}

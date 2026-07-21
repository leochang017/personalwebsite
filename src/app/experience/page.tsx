import type { Metadata } from "next";
import { PopIn } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experience — Leo Chang",
  description: "Work positions, leadership roles, and volunteer commitments across education, finance, healthcare, and athletics.",
};

type Experience = {
  company: string;
  role: string;
  dateLines: [string, string];
  location: string;
  status: "active" | "upcoming" | "completed";
  desc: string;
  tags: string[];
  logo: string;
  href?: string;
  repo?: string;
};

/* Reverse-chronological — upcoming first, matching the timeline design */
const experiences: Experience[] = [
  {
    company: "Hongik University",
    role: "Research Intern — Prof. Eunsoo Choi, Civil Engineering",
    dateLines: ["Jul — Aug", "2026"],
    location: "Seoul ↗",
    status: "upcoming",
    desc: "Summer 2026 research internship at Hongik University in Seoul. I'll share what I worked on once the internship wraps up.",
    tags: ["Research", "Civil Engineering"],
    logo: "/images/hongik.svg",
  },
  {
    company: "Zhongke Guoguang Quantum",
    role: "AI / ML Intern",
    dateLines: ["Jun — Jul", "2026"],
    location: "Beijing ↗",
    status: "upcoming",
    desc: "Summer 2026 AI/ML internship at a quantum-technology company in Beijing. I'll share what I worked on once the internship wraps up.",
    tags: ["AI/ML", "Quantum Tech"],
    logo: "/images/zhongke-quantum.svg",
  },
  {
    company: "Rutgers University",
    role: "Research Intern — Prof. Yongfeng Zhang, Computer Science",
    dateLines: ["Apr 2026 —", "Present"],
    location: "Remote",
    status: "active",
    desc: "Can LLM agents negotiate in plain English to fairly share energy across a neighborhood during a grid outage? Building and testing a 30-household simulation on real NREL data. Experiments in progress.",
    tags: ["LLM Agents", "Multi-Agent Systems", "Python"],
    logo: "/images/rutgers.svg",
    repo: "https://github.com/leochang017/microgrid-llm-coordination",
  },
  {
    company: "Chipotle Mexican Grill",
    role: "Team Member",
    dateLines: ["Sep 2025 —", "May 2026"],
    location: "Yardley & Warrington, PA",
    status: "completed",
    desc: "Team member in a high-volume restaurant: served 200+ customers daily and upheld strict food-safety standards through peak rushes.",
    tags: ["Customer Service", "Teamwork"],
    logo: "/images/chipotle.png",
    href: "/experience/chipotle",
  },
  {
    company: "Mundial Financial Group",
    role: "Intern, Investment Banking",
    dateLines: ["Jul — Sep", "2025"],
    location: "Remote",
    status: "completed",
    desc: "Led a complete website redesign for a financial-services firm: competitor analysis across 10+ sites, all major site copy, and social media strategy.",
    tags: ["Web Design", "Content", "SEO"],
    logo: "/images/mundiallogo3.png",
    href: "/experience/mundial",
  },
  {
    company: "Achievable, Inc.",
    role: "Content Marketing Intern",
    dateLines: ["Jul — Oct", "2024"],
    location: "Remote",
    status: "completed",
    desc: "Authored 15+ researched blog posts and guest articles for an EdTech test-prep startup, working fully independently.",
    tags: ["Content Marketing", "Research"],
    logo: "/images/achievable-logo.png",
    href: "/experience/achievable",
  },
  {
    company: "Capital Health",
    role: "Junior Volunteer",
    dateLines: ["Jul — Aug", "2024"],
    location: "Trenton, NJ",
    status: "completed",
    desc: "66+ volunteer hours across nursing-unit support, patient comfort-cart programs, and discharge-packet preparation.",
    tags: ["Patient Care", "Healthcare"],
    logo: "/images/capitalhealth2.jpg",
    href: "/experience/capitalhealth",
  },
];

type Leadership = {
  title: string;
  role: string;
  period: string;
  hours: string | null;
  desc: string;
  logo: string;
  href: string;
};

const leadership: Leadership[] = [
  {
    title: "Ti-Ratana Welfare Society",
    role: "Director, Orphanage Educational Program",
    period: "2020 – Present",
    hours: "600+ hrs",
    desc: "Direct a remote education program for children at a Kuala Lumpur welfare organization: weekly Zoom lessons for 6+ years and an $8,000 fundraiser for e-learning tools. Featured in Malaysian press.",
    logo: "/images/orphanagelogo.png",
    href: "/experience/tiratana",
  },
  {
    title: "ObCHESSed Chess Club",
    role: "Co-Founder",
    period: "Sep 2025 – Present",
    hours: null,
    desc: "Co-founded Princeton Day School's chess club and grew it to 40+ members with weekly tactics sessions, tournaments, and mentorship for all levels.",
    logo: "/images/chess-icon.svg",
    href: "/experience/obchessed",
  },
  {
    title: "The Spokesman",
    role: "Editor in Chief",
    period: "Sep 2023 – Present",
    hours: null,
    desc: "Editor in Chief of the school newspaper, leading 11 editors and 36 writers, artists, and photographers across print and digital.",
    logo: "/images/spokesman-logo-alt.png",
    href: "/experience/spokesman",
  },
  {
    title: "Science Olympiad",
    role: "Team Member & Co-head",
    period: "Sep 2023 – Present",
    hours: null,
    desc: "Varsity engineering events (Helicopter, Electric Vehicle): 3rd at Regionals, 5th and 6th at NJ States. Club co-head for senior year.",
    logo: "/images/scioly.jpeg",
    href: "/experience/scioly",
  },
  {
    title: "Varsity Fencing",
    role: "Varsity Athlete",
    period: "2023 – Present",
    hours: null,
    desc: "Varsity saber all four years: 2nd at NJSIAA Regionals (individual and team), NJ State Final qualifier. Fencing since age 6.",
    logo: "/images/njsiaa.jpg",
    href: "/experience/fencing",
  },
];

/* ── Ink-timeline building blocks ── */

function StatusChip({ status }: { status: Experience["status"] }) {
  if (status === "active") return <span className="ink-chip ink-chip--active">● Active</span>;
  if (status === "upcoming") return <span className="ink-chip ink-chip--upcoming">Upcoming</span>;
  return <span className="ink-chip ink-chip--completed">Completed</span>;
}

function TimelineNode({ status }: { status: Experience["status"] }) {
  const nodeStyle =
    status === "active"
      ? "border-[3px] border-solid border-foreground bg-ink-go"
      : status === "upcoming"
        ? "border-[3px] border-dashed border-foreground bg-background"
        : "border-[3px] border-solid border-foreground bg-foreground";
  return (
    <div
      className={`absolute top-7 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${nodeStyle}`}
    />
  );
}

function ExperienceCard({ e }: { e: Experience }) {
  const dashed = e.status === "upcoming" ? "ink-card--dashed" : "";
  const body = (
    <>
      <div className="flex gap-3 items-center flex-wrap">
        <div className="w-10 h-10 bg-white border-2 border-foreground rounded-lg flex items-center justify-center overflow-hidden shrink-0 p-1">
          <Image src={e.logo} alt={e.company} width={32} height={32} className="object-contain" />
        </div>
        <span className="font-sans font-extrabold text-xl md:text-[22px] tracking-[-0.02em] leading-tight">
          {e.company}
        </span>
        <StatusChip status={e.status} />
      </div>
      {/* mobile-only date (the date column is hidden below md) */}
      <div className="md:hidden font-mono text-[11px] font-semibold text-muted uppercase tracking-wider">
        {e.dateLines[0]} {e.dateLines[1]}
      </div>
      <div className="font-sans font-semibold text-sm">{e.role}</div>
      <p className="font-body text-sm leading-relaxed text-muted m-0">{e.desc}</p>
      <div className="flex items-center gap-3 flex-wrap font-mono text-[11px] font-medium uppercase tracking-wider">
        <span className={e.status === "upcoming" ? "text-rust" : "text-muted"}>{e.location}</span>
        <span className="text-border" aria-hidden>|</span>
        <span className="text-muted/80">{e.tags.join(" · ")}</span>
        {e.repo && <span className="ml-auto text-olive">GitHub ↗</span>}
        {e.href && <span className="ml-auto text-clay">Details →</span>}
      </div>
    </>
  );

  const cardClass = `ink-card ${dashed} p-5 md:px-6 md:py-[22px] flex flex-col gap-2`;

  if (e.href) {
    return (
      <Link href={e.href} className={cardClass}>
        {body}
      </Link>
    );
  }
  if (e.repo) {
    return (
      <a href={e.repo} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {body}
      </a>
    );
  }
  return <div className={cardClass}>{body}</div>;
}

export default function ExperiencePage() {
  return (
    <main className="pb-20">
      {/* ═══ Header ═══ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-10">
        <PopIn>
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2 mb-5">
            <h1 className="font-sans font-extrabold uppercase text-6xl md:text-8xl leading-[0.92] tracking-[-0.04em] m-0">
              Experience
            </h1>
            <span className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-6 py-3 font-sans font-extrabold text-2xl md:text-[32px] leading-none tracking-[-0.02em] whitespace-nowrap">
              <CountUp target={750} suffix="+" /> Work Hours
            </span>
          </div>
        </PopIn>
        <PopIn delay={0.12}>
          <div className="flex gap-2.5 flex-wrap">
            <span className="ink-chip ink-chip--active">● Active</span>
            <span className="ink-chip ink-chip--upcoming">Upcoming</span>
            <span className="ink-chip ink-chip--completed">Completed</span>
          </div>
        </PopIn>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        {experiences.map((e, i) => {
          const last = i === experiences.length - 1;
          return (
            <PopIn key={e.company}>
              <div className="grid grid-cols-[28px_1fr] md:grid-cols-[150px_44px_1fr]">
                {/* date column (desktop) */}
                <div className="hidden md:block font-mono text-xs font-semibold text-muted uppercase tracking-wider pt-7">
                  {e.dateLines[0]}
                  <br />
                  {e.dateLines[1]}
                </div>
                {/* spine + node */}
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] ${
                      last
                        ? "bg-gradient-to-b from-foreground from-70% to-transparent"
                        : "bg-foreground"
                    }`}
                  />
                  <TimelineNode status={e.status} />
                </div>
                <div className={last ? "" : "pb-5"}>
                  <ExperienceCard e={e} />
                </div>
              </div>
            </PopIn>
          );
        })}
      </section>

      {/* ═══ Leadership & Activities ═══ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <PopIn>
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2 mb-10">
            <h2 className="font-sans font-extrabold uppercase text-4xl md:text-6xl leading-[0.92] tracking-[-0.04em] m-0">
              Leadership
            </h2>
            <span className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-2.5 font-sans font-extrabold text-xl md:text-[26px] leading-none tracking-[-0.02em] whitespace-nowrap">
              <CountUp target={660} suffix="+" /> Volunteer Hours
            </span>
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {leadership.map((l) => (
            <PopIn key={l.title} className="h-full">
              <Link href={l.href} className="ink-card p-5 md:px-6 md:py-[22px] flex flex-col gap-2 h-full">
                <div className="flex gap-3 items-center flex-wrap">
                  <div className="w-10 h-10 bg-white border-2 border-foreground rounded-lg flex items-center justify-center overflow-hidden shrink-0 p-1">
                    <Image src={l.logo} alt={l.title} width={32} height={32} className="object-contain" />
                  </div>
                  <span className="font-sans font-extrabold text-xl md:text-[22px] tracking-[-0.02em] leading-tight">
                    {l.title}
                  </span>
                  <span className="ink-chip ink-chip--active">● Active</span>
                </div>
                <div className="font-sans font-semibold text-sm">{l.role}</div>
                <p className="font-body text-sm leading-relaxed text-muted m-0 flex-1">{l.desc}</p>
                <div className="flex items-center gap-3 flex-wrap font-mono text-[11px] font-medium uppercase tracking-wider">
                  <span className="text-muted">{l.period}</span>
                  {l.hours && (
                    <>
                      <span className="text-border" aria-hidden>|</span>
                      <span className="text-olive">{l.hours}</span>
                    </>
                  )}
                  <span className="ml-auto text-clay">Details →</span>
                </div>
              </Link>
            </PopIn>
          ))}
        </div>
      </section>
    </main>
  );
}

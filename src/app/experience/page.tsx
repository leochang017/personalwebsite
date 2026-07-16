import type { Metadata } from "next";
import { FadeUp } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem, CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { StickerPill } from "@/components/Doodles";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experience — Leo Chang",
  description: "Work positions, leadership roles, and volunteer commitments across education, finance, healthcare, and athletics.",
};

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  status: "active" | "upcoming" | "completed";
  desc: string;
  tags: string[];
  logo: string;
  href?: string;
  repo?: string;
};

const experiences: Experience[] = [
  {
    company: "Rutgers University",
    role: "Research Intern with Prof. Yongfeng Zhang",
    period: "Apr 2026 – Present",
    location: "Remote",
    status: "active",
    desc: "Research with Prof. Yongfeng Zhang (Rutgers CS): can LLM agents negotiate in plain English to fairly share energy across a neighborhood during a grid outage? Building and testing a 30-household simulation on real NREL data. Experiments in progress.",
    tags: ["LLM Agents", "Multi-Agent Systems", "Python"],
    logo: "/images/rutgers.svg",
    repo: "https://github.com/leochang017/microgrid-llm-coordination",
  },
  {
    company: "Zhongke Guoguang Quantum",
    role: "AI / ML Intern",
    period: "Jun – Jul 2026",
    location: "Beijing, China",
    status: "upcoming",
    desc: "Summer 2026 AI/ML internship at a quantum-technology company in Beijing. Details coming soon — I'll share what I worked on once the internship wraps up.",
    tags: ["AI/ML", "Quantum Tech"],
    logo: "/images/zhongke-quantum.svg",
  },
  {
    company: "Hongik University",
    role: "Research Intern",
    period: "Jul – Aug 2026",
    location: "Seoul, South Korea",
    status: "upcoming",
    desc: "Summer 2026 research internship at Hongik University in Seoul. Details coming soon — I'll share what I worked on once the internship wraps up.",
    tags: ["Research", "Civil Engineering"],
    logo: "/images/hongik.svg",
  },
  {
    company: "Chipotle Mexican Grill",
    role: "Team Member",
    period: "Sep 2025 – May 2026",
    location: "Yardley & Warrington, PA",
    status: "completed",
    desc: "Team member in a high-volume restaurant — served 200+ customers daily, upheld strict food-safety standards, and kept operations smooth through peak rushes.",
    tags: ["Customer Service", "Teamwork"],
    logo: "/images/chipotle.png",
    href: "/experience/chipotle",
  },
  {
    company: "Mundial Financial Group",
    role: "Intern, Investment Banking",
    period: "Jul – Sep 2025",
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
    period: "Jul – Oct 2024",
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
    period: "Jul – Aug 2024",
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
  website?: string;
};

const leadership: Leadership[] = [
  {
    title: "Ti-Ratana Welfare Society",
    role: "Director, Orphanage Educational Program",
    period: "2020 – Present",
    hours: "600+",
    desc: "Direct a remote education program for children at a Kuala Lumpur welfare organization — weekly Zoom lessons for 6+ years and an $8,000 fundraiser for e-learning tools. Featured in Malaysian press.",
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
    desc: "Editor in Chief of the school newspaper — leading 11 editors and managing 36 writers, artists, and photographers across print and digital.",
    logo: "/images/spokesman-logo-alt.png",
    href: "/experience/spokesman",
    website: "https://thespokesman.net",
  },
  {
    title: "Science Olympiad",
    role: "Team Member & Co-head",
    period: "Sep 2023 – Present",
    hours: null,
    desc: "Varsity engineering events (Helicopter, Electric Vehicle) at Regionals and NJ States — 3rd Regionals, 5th & 6th States. Club co-head for senior year.",
    logo: "/images/scioly.jpeg",
    href: "/experience/scioly",
  },
  {
    title: "Varsity Fencing",
    role: "Varsity Athlete",
    period: "2023 – Present",
    hours: null,
    desc: "Varsity saber all four years — 2nd at NJSIAA Regionals (individual & team), NJ State Final qualifier. Fencing since age 6.",
    logo: "/images/njsiaa.jpg",
    href: "/experience/fencing",
  },
];

function StatusChip({ status }: { status: Experience["status"] }) {
  if (status === "upcoming") {
    return <span className="sticker-chip sticker-chip--red">Coming Soon</span>;
  }
  if (status === "active") {
    return <span className="sticker-chip sticker-chip--mint">Active</span>;
  }
  return null;
}

export default function ExperiencePage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
              Experience
            </h1>
            <StickerPill color="var(--color-sticker-mint)" rotate={-4} className="text-xs font-bold uppercase tracking-wider wobble-slow">
              580+ Hrs
            </StickerPill>
          </div>
          <p className="text-muted text-lg md:text-xl mb-10 font-body max-w-2xl">
            Professional internships, work experience, and leadership roles that
            have shaped my skills and perspective.
          </p>
        </FadeUp>

        {/* Stats Bar */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: 7, suffix: "", label: "Work Positions" },
              { value: 580, suffix: "+", label: "Work Hours" },
              { value: 660, suffix: "+", label: "Volunteer Hours" },
              { value: 3, suffix: "", label: "Countries" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="sticker-card-surface rounded-2xl p-6 text-center"
              >
                <div className="font-sans text-3xl md:text-4xl font-black text-accent">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs md:text-sm text-muted mt-1 font-body">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Section Title */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Work Experience
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        {/* Experience Grid */}
        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {experiences.map((e) => (
            <StaggerItem key={e.company}>
              <TiltCard className="h-full">
                <div className="sticker-card-surface rounded-2xl p-6 hover:border-accent/30 transition-all h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                      <Image
                        src={e.logo}
                        alt={e.company}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <StatusChip status={e.status} />
                  </div>

                  <h3 className="font-sans text-base font-bold leading-snug">
                    {e.company}
                  </h3>
                  <p className="text-accent font-semibold text-sm mt-0.5">
                    {e.role}
                  </p>
                  <p className="text-xs text-muted font-mono mt-1 mb-3">
                    {e.period} · {e.location}
                  </p>

                  <p className="text-sm text-secondary leading-relaxed font-body flex-1 mb-4">
                    {e.desc}
                  </p>

                  <div className="flex gap-2 flex-wrap items-center">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-surface-light text-muted border border-border"
                      >
                        {t}
                      </span>
                    ))}
                    {e.repo && (
                      <a href={e.repo} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-olive font-semibold no-underline hover:underline">
                        GitHub ↗
                      </a>
                    )}
                    {e.href && (
                      <Link href={e.href} className="ml-auto text-xs text-accent font-semibold no-underline hover:underline">
                        Details →
                      </Link>
                    )}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Leadership Section */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Leadership & Activities
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {leadership.map((l) => (
            <StaggerItem key={l.title}>
              <TiltCard className="h-full">
                <div className="sticker-card-surface rounded-2xl p-6 hover:border-olive/30 transition-all h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                      <Image
                        src={l.logo}
                        alt={l.title}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <span className="sticker-chip sticker-chip--mint">Active</span>
                  </div>

                  <h3 className="font-sans text-base font-bold leading-snug">
                    {l.title}
                  </h3>
                  <p className="text-accent font-semibold text-sm mt-0.5">
                    {l.role}
                  </p>
                  <div className="flex items-center gap-2 mt-1 mb-3 flex-wrap">
                    <span className="text-xs text-muted font-mono">{l.period}</span>
                    {l.hours && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-olive/10 text-olive uppercase tracking-wider">
                        {l.hours} hours
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-secondary leading-relaxed font-body flex-1 mb-4">
                    {l.desc}
                  </p>

                  <div className="flex gap-2 flex-wrap items-center">
                    {l.website && (
                      <a href={l.website} target="_blank" rel="noopener noreferrer" className="text-xs text-olive font-semibold no-underline hover:underline">
                        {l.website.replace("https://", "")} ↗
                      </a>
                    )}
                    <Link href={l.href} className="ml-auto text-xs text-accent font-semibold no-underline hover:underline">
                      Details →
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Science Olympiad — Leo Chang",
  description: "Varsity Science Olympiad (Helicopter, Electric Vehicle) and Club Co-head at PDS. Regional and state placements 2025–2026.",
};

const achievements = [
  "3rd Place — Helicopter, Regionals 2025",
  "3rd Place — Helicopter, Regionals 2026",
  "5th Place — Helicopter, NJ State Finals 2025",
  "6th Place — Electric Vehicle, NJ State Finals 2025",
  "5th Place — Helicopter, NJ State Finals 2026",
  "Co-head of the PDS Science Olympiad club (senior year)",
  "Co-head of the Middle School Science Olympiad team (junior year)",
  "Create and grade practice tests for MS students",
];

const skills = [
  "STEM Competition",
  "Engineering Design",
  "Team Collaboration",
  "Mentorship",
  "Helicopter",
  "Electric Vehicle",
];

const stats = [
  { value: "3rd", label: "PLACE REGIONALS" },
  { value: "5th", label: "PLACE NJ STATES" },
  { value: "6th", label: "PLACE NJ STATES" },
  { value: "Co-head", label: "CLUB LEADERSHIP" },
];

const eventAreas = [
  {
    title: "Helicopter",
    desc: "Design and build a rubber-band powered helicopter for maximum flight time. 3rd Place Regionals (2025, 2026), 5th Place States (2025, 2026).",
  },
  {
    title: "Electric Vehicle",
    desc: "Build a battery-powered vehicle to travel a specified distance and stop as close to a target as possible. 6th Place NJ State Finals 2025.",
  },
  {
    title: "Engineering Design",
    desc: "Apply principles of structural engineering, aerodynamics, and precision building across multiple competition events.",
  },
];

export default function SciOlyPage() {
  return (
    <main className="pt-10 md:pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <PopIn>
          <Link
            href="/experience"
            className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7"
          >
            &larr; ALL EXPERIENCE
          </Link>
        </PopIn>
        <PopIn delay={0.03}>
          <LogoBanner src="/images/scioly.jpeg" alt="Science Olympiad" width={877} height={452} />
        </PopIn>

        {/* ═══ Header grid ═══ */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          {/* Left column */}
          <div>
            <PopIn>
              <div className="flex gap-2.5 flex-wrap items-center">
                <span className="ink-chip ink-chip--active">● ACTIVE</span>
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase border-2 border-foreground px-[11px] py-1 rounded-full">
                  State-Level Competition
                </span>
              </div>
            </PopIn>
            <PopIn delay={0.06}>
              <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] mt-4 mb-3">
                Science Olympiad
              </h1>
              <div className="font-sans font-bold text-lg md:text-[22px] mb-5">
                Team Member &amp; Co-head
              </div>
            </PopIn>
            <PopIn delay={0.12}>
              <div className="font-sans text-[17px] leading-[1.65] max-w-[600px] text-secondary space-y-4">
                <p>
                  Compete on the varsity Science Olympiad team, primarily in engineering
                  events including Helicopter and Electric Vehicle. Achieved 3rd place in
                  Helicopter at Regionals in both 2025 and 2026, and advanced to the NJ
                  State Finals where I placed 5th in Helicopter (2025 and 2026) and 6th
                  in Electric Vehicle (2025).
                </p>
                <p>
                  Selected as Co-head of the Science Olympiad club for senior year, leading the
                  team&apos;s overall direction, recruitment, and event preparation. Previously
                  co-headed the Middle School Science Olympiad team, creating and grading practice
                  tests to help younger students build foundational knowledge and confidence in
                  STEM disciplines.
                </p>
                <p>
                  Focus on hands-on engineering design and building &mdash; from constructing
                  competition-ready helicopters to designing electric vehicles that meet
                  strict specifications and performance criteria.
                </p>
              </div>
              <ul className="list-none p-0 mt-7 space-y-3">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-ink-yellow border-2 border-foreground flex-none mt-[7px]" />
                    <span className="font-sans font-medium text-[15px] leading-[1.5]">{a}</span>
                  </li>
                ))}
              </ul>
            </PopIn>
          </div>

          {/* Right facts aside */}
          <PopIn delay={0.12}>
            <aside className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-6 flex flex-col gap-4">
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">DATES</div>
                <div className="font-sans font-bold text-base">Sep 2023 &ndash; Present</div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">LOCATION</div>
                <div className="font-sans font-bold text-base">Princeton Day School</div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">STATUS</div>
                <div className="font-sans font-bold text-base">Active</div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">EVENTS</div>
                <div className="font-sans font-bold text-base">Helicopter &middot; Electric Vehicle</div>
              </div>
            </aside>
          </PopIn>
        </div>

        {/* ═══ Placement stats ═══ */}
        <PopIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[18px] mt-16">
            {stats.map((s, i) => (
              <div
                key={`${s.value}-${i}`}
                className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-[18px]"
              >
                <div className="font-sans font-extrabold text-[38px] tracking-[-0.03em]">{s.value}</div>
                <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </PopIn>

        {/* ═══ Photo ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            GALLERY
          </div>
          <figure className="m-0 border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-3">
            <Image
              src="/images/scienceolympiad.png"
              alt="Science Olympiad Team"
              width={1200}
              height={800}
              className="w-full h-auto block"
            />
            <figcaption className="font-mono text-[11px] font-medium text-muted pt-2.5">
              Photo Credit: Princeton Day School Instagram
            </figcaption>
          </figure>
        </PopIn>

        {/* ═══ Competition areas ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            COMPETITION AREAS
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eventAreas.map((area, i) => (
            <PopIn key={area.title} delay={i * 0.06} className="h-full">
              <div className="ink-card p-6 h-full flex flex-col gap-2">
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">{area.title}</h3>
                <p className="font-sans text-[15px] leading-[1.55] text-muted m-0">{area.desc}</p>
              </div>
            </PopIn>
          ))}
        </div>

        {/* ═══ Leadership & mentorship ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            LEADERSHIP &amp; MENTORSHIP
          </div>
          <div className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-7">
            <div className="font-sans text-[15px] leading-[1.65] text-secondary space-y-4 max-w-[760px]">
              <p>
                As Co-head of the club for senior year, lead the team&apos;s overall
                direction while continuing to mentor newer competitors. As former
                Co-head of the Middle School Science Olympiad Team, took an active role
                in developing younger students&apos; scientific knowledge and competitive
                skills &mdash; creating practice tests tailored to middle school event topics,
                grading submissions, and providing detailed feedback to help students improve.
              </p>
              <p>
                Build a strong pipeline of future competitors by fostering curiosity,
                teaching study strategies, and instilling confidence in students
                preparing for their first Science Olympiad experiences.
              </p>
            </div>
          </div>
        </PopIn>

        {/* ═══ Skills ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            SKILLS
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {skills.map((s) => (
              <span
                key={s}
                className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-tint-green px-3.5 py-1.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </PopIn>
      </div>
    </main>
  );
}

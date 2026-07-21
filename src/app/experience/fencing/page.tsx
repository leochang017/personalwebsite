import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Varsity Fencing — Leo Chang",
  description: "PDS Varsity Saber. 2nd Place NJSIAA Regional Championship (2025, Individual & Team). Competitive fencing since age 6.",
};

const achievements = [
  "2nd Place — NJSIAA Regional Championship (Individual), 2025",
  "2nd Place — NJSIAA Regional Championship (Team), 2025",
  "Qualified for NJ State Tournament",
  "Varsity since freshman year",
  "Competitive saber fencing since age 6",
  "Over a decade of competitive experience",
];

const skills = [
  "Varsity Athletics",
  "Strategic Thinking",
  "Team Collaboration",
  "Mental Resilience",
  "Discipline",
];

const stats = [
  { value: "2nd", label: "INDIVIDUAL REGIONAL" },
  { value: "2nd", label: "TEAM REGIONAL" },
  { value: "State", label: "QUALIFIER" },
  { value: "10+", label: "YEARS FENCING" },
];

const journey = [
  {
    period: "Age 6",
    title: "Began Fencing",
    desc: "Started competitive fencing training, developing foundational footwork, blade technique, and the mental discipline that defines the sport.",
  },
  {
    period: "2023",
    title: "Varsity Freshman",
    desc: "Earned a spot on the Princeton Day School varsity fencing team as a freshman, competing against upperclassmen in saber events.",
  },
  {
    period: "2025",
    title: "Regional & State",
    desc: "Achieved 2nd place at the NJSIAA Regional Championship and qualified for the New Jersey State Tournament.",
  },
];

const demands = [
  {
    title: "Explosive Speed",
    desc: "Saber bouts are fast and aggressive, requiring lightning-quick advances, lunges, and recovery to score before an opponent can react.",
  },
  {
    title: "Strategic Reading",
    desc: "Every bout is a mental chess match. Anticipating an opponent's attack patterns and setting traps requires deep tactical awareness.",
  },
  {
    title: "Mental Resilience",
    desc: "Maintaining composure under pressure, adapting mid-bout, and recovering from setbacks are essential to performing at a high level.",
  },
  {
    title: "Years of Discipline",
    desc: "Over a decade of consistent training has built the technical foundation, competitive instincts, and work ethic required for varsity-level competition.",
  },
];

export default function FencingPage() {
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
          <LogoBanner src="/images/njsiaa.jpg" alt="NJSIAA" width={340} height={340} />
        </PopIn>

        {/* ═══ Header grid ═══ */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          {/* Left column */}
          <div>
            <PopIn>
              <div className="flex gap-2.5 flex-wrap items-center">
                <span className="ink-chip ink-chip--active">● ACTIVE</span>
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase border-2 border-foreground px-[11px] py-1 rounded-full">
                  Saber
                </span>
              </div>
            </PopIn>
            <PopIn delay={0.06}>
              <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] mt-4 mb-3">
                Varsity Fencing
              </h1>
              <div className="font-sans font-bold text-lg md:text-[22px] mb-5">
                Varsity Athlete
              </div>
            </PopIn>
            <PopIn delay={0.12}>
              <div className="font-sans text-[17px] leading-[1.65] max-w-[600px] text-secondary space-y-4">
                <p>
                  Compete on the Princeton Day School varsity fencing team in saber,
                  one of the three disciplines of competitive fencing. Earned 2nd place
                  at the NJSIAA Regional Championship as a sophomore, qualifying for the
                  State Tournament &mdash; a significant achievement in one of New
                  Jersey&apos;s most competitive athletic circuits.
                </p>
                <p>
                  Have been fencing competitively since age 6, building over a decade of
                  discipline, strategic thinking, and competitive experience. Saber
                  fencing demands explosive speed, split-second decision-making, and the
                  ability to read an opponent&apos;s intentions &mdash; skills that have
                  been honed through years of dedicated training and competition.
                </p>
                <p>
                  Made the varsity roster as a freshman and have continued to develop as
                  a competitor, contributing to the team&apos;s success while pursuing
                  individual excellence on the regional and state stage.
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
                <div className="font-sans font-bold text-base">2023 &ndash; Present</div>
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
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">WEAPON</div>
                <div className="font-sans font-bold text-base">Saber</div>
              </div>
            </aside>
          </PopIn>
        </div>

        {/* ═══ Result stats ═══ */}
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
              src="/images/Fencing.jpg"
              alt="Varsity Fencing"
              width={1200}
              height={800}
              className="w-full h-auto block"
            />
            <figcaption className="font-mono text-[11px] font-medium text-muted pt-2.5">
              Photo Credit: Princeton Day School Flickr
            </figcaption>
          </figure>
        </PopIn>

        {/* ═══ Competitive journey ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            COMPETITION TIMELINE
          </div>
        </PopIn>
        <div className="space-y-5">
          {journey.map((t, i) => (
            <PopIn key={t.period} delay={i * 0.06}>
              <div className="ink-card p-6 flex flex-col sm:flex-row gap-4">
                <div className="sm:w-32 shrink-0">
                  <span className="font-mono text-xs font-bold border-2 border-foreground bg-ink-yellow px-3 py-1 rounded-full">
                    {t.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0 mb-1">{t.title}</h3>
                  <p className="font-sans text-[15px] leading-[1.55] text-muted m-0">{t.desc}</p>
                </div>
              </div>
            </PopIn>
          ))}
        </div>

        {/* ═══ What saber demands ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            WHAT SABER DEMANDS
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {demands.map((d, i) => (
            <PopIn key={d.title} delay={i * 0.06} className="h-full">
              <div className="ink-card p-6 h-full flex flex-col gap-2">
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">{d.title}</h3>
                <p className="font-sans text-[15px] leading-[1.55] text-muted m-0">{d.desc}</p>
              </div>
            </PopIn>
          ))}
        </div>

        {/* ═══ Skills ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            SKILLS
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {skills.map((s) => (
              <span
                key={s}
                className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-tint-red px-3.5 py-1.5 rounded-full"
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

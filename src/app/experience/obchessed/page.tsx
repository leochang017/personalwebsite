import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ObCHESSed — Leo Chang",
  description: "Co-Founder of ObCHESSed Chess Club at PDS (Sep 2025–Present). 40+ active members. Weekly sessions, internal tournaments.",
};

const achievements = [
  "Founded club from ground up",
  "40+ active members recruited",
  "Weekly sessions organized",
  "Tournament coordination",
  "All skill levels welcomed",
];

const skills = [
  "Club Leadership",
  "Organization Building",
  "Event Management",
  "Strategic Thinking",
  "Mentorship",
];

const stats = [
  { value: "40+", label: "ACTIVE MEMBERS" },
  { value: "Weekly", label: "TRAINING SESSIONS" },
  { value: "All Levels", label: "BEGINNERS TO COMPETITIVE" },
];

const highlights = [
  {
    title: "Built from Scratch",
    desc: "Took the initiative to identify student interest, draft a club proposal, secure faculty sponsorship, and build the club from nothing into a thriving organization.",
  },
  {
    title: "Weekly Training",
    desc: "Design and run weekly sessions covering opening theory, tactical puzzles, endgame technique, and full-length friendly matches with post-game analysis.",
  },
  {
    title: "Tournament Organization",
    desc: "Coordinate internal tournaments with structured brackets and time controls, providing members with competitive experience in a supportive setting.",
  },
  {
    title: "Inclusive Community",
    desc: "Built an environment that welcomes complete beginners and experienced players alike, pairing mentors with newcomers to accelerate learning.",
  },
];

export default function ObChessedPage() {
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
          <LogoBanner src="/images/chess-icon.svg" alt="ObCHESSed Chess Club" width={24} height={24} />
        </PopIn>

        {/* ═══ Header grid ═══ */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          {/* Left column */}
          <div>
            <PopIn>
              <span className="ink-chip ink-chip--active">● ACTIVE</span>
            </PopIn>
            <PopIn delay={0.06}>
              <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] mt-4 mb-3">
                ObCHESSed
              </h1>
              <div className="font-sans font-bold text-lg md:text-[22px] mb-5">
                Co-Founder &mdash; Princeton Day School Chess Club
              </div>
            </PopIn>
            <PopIn delay={0.12}>
              <div className="font-sans text-[17px] leading-[1.65] max-w-[600px] text-secondary space-y-4">
                <p>
                  Founded the ObCHESSed Chess Club from scratch at Princeton Day School,
                  building a thriving community of 40+ active members passionate about
                  chess. The club welcomes players of all skill levels, from complete
                  beginners learning the basics to competitive players looking to sharpen
                  their tactics.
                </p>
                <p>
                  Organize weekly tactics training sessions and friendly matches that
                  foster both skill development and camaraderie. Coordinate internal
                  tournaments with structured brackets and work toward establishing
                  inter-school competitions to give members competitive experience.
                </p>
                <p>
                  Manage all logistics, scheduling, and member recruitment to ensure the
                  club runs smoothly. Focus on creating an inclusive, welcoming
                  environment where anyone can learn and enjoy the game of chess.
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
                <div className="font-sans font-bold text-base">Sep 2025 &ndash; Present</div>
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
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">INSTAGRAM</div>
                <a
                  href="https://www.instagram.com/obchessedd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-base no-underline text-foreground hover:underline"
                  aria-label="ObCHESSed Instagram"
                >
                  @obchessedd &#8599;
                </a>
              </div>
            </aside>
          </PopIn>
        </div>

        {/* ═══ Impact stats ═══ */}
        <PopIn>
          <div className="grid sm:grid-cols-3 gap-[18px] mt-16">
            {stats.map((s) => (
              <div
                key={s.label}
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
              src="/images/chess2.png"
              alt="ObCHESSed Chess Club"
              width={1200}
              height={800}
              className="w-full h-auto block"
            />
            <figcaption className="font-mono text-[11px] font-medium text-muted pt-2.5">
              Photo Credit: Princeton Day School Student Council
            </figcaption>
          </figure>
        </PopIn>

        {/* ═══ Club highlights ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            CLUB HIGHLIGHTS
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {highlights.map((h, i) => (
            <PopIn key={h.title} delay={i * 0.06} className="h-full">
              <div className="ink-card p-6 h-full flex flex-col gap-2">
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">{h.title}</h3>
                <p className="font-sans text-[15px] leading-[1.55] text-muted m-0">{h.desc}</p>
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
                className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-tint-purple px-3.5 py-1.5 rounded-full"
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

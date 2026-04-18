import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

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

export default function ObChessedPage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <FadeUp>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors font-body mb-10 no-underline"
          >
            <span>&larr;</span> Back to Experience
          </Link>
        </FadeUp>

        {/* Hero Section */}
        <FadeUp delay={0.05}>
          <div className="mb-12">
            <div className="flex items-start gap-5 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                <Image
                  src="/images/chess-icon.svg"
                  alt="ObCHESSed Chess Club"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    ObCHESSed Chess Club
                  </h1>
                  <span className="sticker-chip sticker-chip--mint">
                    Active
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg">
                  Co-Founder
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted font-mono">
                    Sep 2025 &ndash; Present
                  </span>
                  <a
                    href="https://www.instagram.com/obchessedd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition-colors"
                    aria-label="ObCHESSed Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Impact Stats */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">40+</div>
              <p className="text-xs text-muted mt-1 font-body">Active Members</p>
            </div>
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-olive">Weekly</div>
              <p className="text-xs text-muted mt-1 font-body">Training Sessions</p>
            </div>
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">All Levels</div>
              <p className="text-xs text-muted mt-1 font-body">Beginners to Competitive</p>
            </div>
          </div>
        </FadeUp>

        {/* Photo */}
        <SlideIn direction="right" delay={0.1}>
          <div className="relative w-full rounded-2xl overflow-hidden mb-14 border border-border shadow-lg shadow-accent/10">
            <Image
              src="/images/chess2.png"
              alt="ObCHESSed Chess Club"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-[11px] text-muted font-body text-left py-2 px-4">Photo Credit: Princeton Day School Student Council</p>
          </div>
        </SlideIn>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About the Club</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
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
          </div>
        </SlideIn>

        {/* Key Achievements */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Key Achievements</h2>
        </FadeUp>
        <StaggerList className="space-y-3 mb-14">
          {achievements.map((a) => (
            <StaggerItem key={a}>
              <div className="sticker-card-surface rounded-xl p-5 flex items-start gap-3 hover:border-accent/30 transition-all duration-300">
                <span className="text-accent mt-0.5 shrink-0">&bull;</span>
                <p className="text-sm text-secondary font-body">{a}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Highlights */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Club Highlights</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {[
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
          ].map((h, i) => (
            <ScaleIn key={h.title} delay={i * 0.08}>
              <div className="sticker-card-surface rounded-xl p-6 h-full hover:border-olive/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{h.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {h.desc}
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Skills */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Skills</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex gap-2 flex-wrap mb-14">
            {skills.map((s) => (
              <span
                key={s}
                className="text-[11px] font-semibold px-4 py-2 rounded-full bg-surface-light text-secondary border border-border"
              >
                {s}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* Back to Experience */}
        <FadeUp>
          <div className="text-center">
            <Link
              href="/experience"
              className="sticker-btn text-sm no-underline"
            >
              &larr; All Experience
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

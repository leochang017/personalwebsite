import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

const achievements = [
  "Founded club from ground up",
  "20+ active members recruited",
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
              <div className="w-20 h-20 rounded-xl bg-surface-light flex items-center justify-center overflow-hidden shrink-0 border border-border">
                <Image
                  src="/images/princetondayschool.png"
                  alt="Princeton Day School"
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
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg">
                  Co-Founder
                </p>
                <span className="text-sm text-muted font-mono">
                  Sep 2025 &ndash; Present
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Impact Stats */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">20+</div>
              <p className="text-xs text-muted mt-1 font-body">Active Members</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-olive">Weekly</div>
              <p className="text-xs text-muted mt-1 font-body">Training Sessions</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">All Levels</div>
              <p className="text-xs text-muted mt-1 font-body">Beginners to Competitive</p>
            </div>
          </div>
        </FadeUp>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About the Club</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                Founded the ObCHESSed Chess Club from scratch at Princeton Day School,
                building a thriving community of 20+ active members passionate about
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
              <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/30 transition-all duration-300">
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
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-olive/30 transition-all duration-300">
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
              className="inline-flex px-8 py-3 rounded-full bg-surface border border-border text-secondary font-semibold text-sm no-underline hover:border-accent/40 hover:text-accent transition-all"
            >
              &larr; All Experience
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

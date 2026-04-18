import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

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

export default function FencingPage() {
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
                  src="/images/njsiaa.jpg"
                  alt="NJSIAA"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Varsity Fencing
                  </h1>
                  <span className="sticker-chip sticker-chip--mint">
                    Active
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                    Saber
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg">
                  Varsity Athlete
                </p>
                <span className="text-sm text-muted font-mono">
                  2023 &ndash; Present
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Impact Stats */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">2nd</div>
              <p className="text-xs text-muted mt-1 font-body">Individual Regional</p>
            </div>
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">2nd</div>
              <p className="text-xs text-muted mt-1 font-body">Team Regional</p>
            </div>
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-olive">State</div>
              <p className="text-xs text-muted mt-1 font-body">Qualifier</p>
            </div>
            <div className="sticker-card-surface rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">10+</div>
              <p className="text-xs text-muted mt-1 font-body">Years Fencing</p>
            </div>
          </div>
        </FadeUp>

        {/* Photo */}
        <SlideIn direction="left" delay={0.1}>
          <div className="relative w-full rounded-2xl overflow-hidden mb-14 border border-border shadow-lg shadow-accent/10">
            <Image
              src="/images/Fencing.jpg"
              alt="Varsity Fencing"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-[11px] text-muted font-body text-left py-2 px-4">Photo Credit: Princeton Day School Flickr</p>
          </div>
        </SlideIn>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
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

        {/* Competitive Journey */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Competitive Journey</h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {[
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
          ].map((t) => (
            <StaggerItem key={t.period}>
              <div className="sticker-card-surface rounded-xl p-6 flex flex-col sm:flex-row gap-4 hover:border-accent/30 transition-all duration-300">
                <div className="sm:w-32 shrink-0">
                  <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {t.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm mb-1">{t.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-body">
                    {t.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* What Saber Demands */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">What Saber Demands</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {[
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
          ].map((d, i) => (
            <ScaleIn key={d.title} delay={i * 0.08}>
              <div className="sticker-card-surface rounded-xl p-6 h-full hover:border-olive/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{d.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {d.desc}
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

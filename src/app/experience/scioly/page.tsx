import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

const achievements = [
  "3rd Place — Helicopter, Regionals 2025",
  "3rd Place — Helicopter, Regionals 2026",
  "5th Place — Helicopter, NJ State Finals 2025",
  "6th Place — Electric Vehicle, NJ State Finals 2025",
  "5th Place — Helicopter, NJ State Finals 2026",
  "Co-head of Middle School Science Olympiad team",
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

export default function SciOlyPage() {
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
                  src="/images/scienceolympiad.png"
                  alt="Science Olympiad"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Science Olympiad
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wider">
                    Active
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                    State-Level Competition
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg">
                  Team Member & MS Co-head
                </p>
                <span className="text-sm text-muted font-mono">
                  2024 &ndash; Present
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Impact Stats */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">3rd</div>
              <p className="text-xs text-muted mt-1 font-body">Place Regionals</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-olive">5th</div>
              <p className="text-xs text-muted mt-1 font-body">Place NJ States</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-olive">6th</div>
              <p className="text-xs text-muted mt-1 font-body">Place NJ States</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">Co-head</div>
              <p className="text-xs text-muted mt-1 font-body">MS Team Leadership</p>
            </div>
          </div>
        </FadeUp>

        {/* Photo */}
        <ScaleIn delay={0.1}>
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-14 border border-border">
            <Image
              src="/images/scioly.jpeg"
              alt="Science Olympiad Team"
              fill
              className="object-cover"
            />
          </div>
        </ScaleIn>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About the Role</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                Compete on the varsity Science Olympiad team, primarily in engineering
                events including Helicopter and Electric Vehicle. Achieved 3rd place in
                Helicopter at Regionals in both 2025 and 2026, and advanced to the NJ
                State Finals where I placed 5th in Helicopter (2025 and 2026) and 6th
                in Electric Vehicle (2025).
              </p>
              <p>
                Separately co-head the Middle School Science Olympiad team, taking on
                a leadership and mentorship role to develop the next generation of competitors.
                Create and grade practice tests to help younger students build foundational
                knowledge and confidence in STEM disciplines.
              </p>
              <p>
                Focus on hands-on engineering design and building — from constructing
                competition-ready helicopters to designing electric vehicles that meet
                strict specifications and performance criteria.
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

        {/* Event Areas */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Competition Areas</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
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
          ].map((area, i) => (
            <ScaleIn key={area.title} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-olive/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{area.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {area.desc}
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Mentorship */}
        <SlideIn direction="right" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">
              Middle School Mentorship
            </h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                As Co-head of the Middle School Science Olympiad Team, take an active
                role in developing younger students&apos; scientific knowledge and
                competitive skills. Create practice tests tailored to middle school
                event topics, grade submissions, and provide detailed feedback to help
                students improve.
              </p>
              <p>
                Build a strong pipeline of future competitors by fostering curiosity,
                teaching study strategies, and instilling confidence in students
                preparing for their first Science Olympiad experiences.
              </p>
            </div>
          </div>
        </SlideIn>

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

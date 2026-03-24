import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

const achievements = [
  "Rose from Associate Editor to Editor in Chief",
  "Lead entire editorial team of writers and editors",
  "Manage digital content strategy across print and online",
  "Edit, review, and publish student articles",
  "Maintain publication schedule and editorial calendar",
  "Oversee all editorial decisions",
];

const skills = [
  "Executive Leadership",
  "Digital Media",
  "Content Management",
  "Editorial Strategy",
  "Academic Writing",
  "Team Management",
];

const roleProgression = [
  {
    title: "Associate Editor",
    desc: "Started as an Associate Editor, contributing articles, copy-editing peers' work, and learning the foundations of editorial standards and journalistic integrity.",
  },
  {
    title: "Online Editor",
    desc: "Promoted to Online Editor, taking ownership of the digital platform. Managed web content, coordinated online publication schedules, and expanded the newspaper's digital presence.",
  },
  {
    title: "Editor in Chief",
    desc: "Elevated to Editor in Chief, leading the entire editorial team. Make final editorial decisions, manage writers and editors, and ensure every issue meets the highest standards of quality.",
  },
];

export default function SpokesmanPage() {
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
              <div className="w-44 h-14 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                <Image
                  src="/images/spokesman-logo-alt.png"
                  alt="The Spokesman"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    The Spokesman
                  </h1>
                </div>
                <p className="text-accent font-semibold text-lg">
                  Editor in Chief
                </p>
                <a href="https://thespokesman.net" target="_blank" rel="noopener noreferrer" className="text-sm text-olive font-semibold no-underline hover:underline">
                  thespokesman.net ↗
                </a>
                <span className="text-sm text-muted font-mono block mt-1">
                  3+ Years
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About the Role</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                Rose through the ranks from Associate Editor to Online Editor to
                Editor in Chief of The Spokesman, the school newspaper at Princeton
                Day School. Over 3+ years, progressively took on greater
                responsibility, demonstrating leadership, editorial judgment, and a
                commitment to quality journalism.
              </p>
              <p>
                As Editor in Chief, lead the entire editorial team managing writers
                and editors. Manage digital content strategy across both print and
                online platforms, ensuring consistent voice, quality, and timeliness.
                Edit, review, and publish student articles while maintaining the
                publication schedule and editorial calendar.
              </p>
              <p>
                Oversee all editorial decisions, balancing journalistic integrity with
                student development. Foster a collaborative environment where writers
                grow their skills and gain confidence in their voice.
              </p>
            </div>
          </div>
        </SlideIn>

        {/* Role Progression */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Role Progression</h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {roleProgression.map((role, i) => (
            <StaggerItem key={role.title}>
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row gap-4 hover:border-accent/30 transition-all duration-300">
                <div className="sm:w-44 shrink-0 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm font-mono">
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-sans font-bold text-sm">{role.title}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted leading-relaxed font-body">
                    {role.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Progression Arrow Visual */}
        <FadeUp delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 mb-14">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="font-sans font-bold text-sm text-muted bg-surface-light px-4 py-2 rounded-full border border-border">
                Associate Editor
              </span>
              <span className="text-accent font-bold">&rarr;</span>
              <span className="font-sans font-bold text-sm text-muted bg-surface-light px-4 py-2 rounded-full border border-border">
                Online Editor
              </span>
              <span className="text-accent font-bold">&rarr;</span>
              <span className="font-sans font-bold text-sm text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/30">
                Editor in Chief
              </span>
            </div>
          </div>
        </FadeUp>

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

        {/* Responsibilities */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Responsibilities</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {[
            {
              title: "Editorial Leadership",
              desc: "Make final editorial decisions on all content, ensuring journalistic standards, factual accuracy, and balanced reporting across every issue.",
            },
            {
              title: "Team Management",
              desc: "Manage a team of writers and editors, assigning stories, providing feedback, and mentoring staff to develop their journalistic skills.",
            },
            {
              title: "Digital Strategy",
              desc: "Oversee content strategy across print and online platforms, optimizing for reader engagement and consistent publication cadence.",
            },
            {
              title: "Publication Operations",
              desc: "Maintain the publication schedule and editorial calendar, coordinating deadlines, review cycles, and production timelines.",
            },
          ].map((r, i) => (
            <ScaleIn key={r.title} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-olive/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{r.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {r.desc}
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

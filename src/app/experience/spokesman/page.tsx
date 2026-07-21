import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Spokesman — Leo Chang",
  description: "Editor in Chief of The Spokesman (PDS newspaper). Leads 11 editors and manages 36 writers, artists, and photographers.",
};

const achievements = [
  "Rose from Associate Editor to Editor in Chief",
  "Lead entire editorial team of 11 editors and 36 writers, artists, and photographers",
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
    desc: "Elevated to Editor in Chief, leading a team of 11 editors and managing 36 writers, artists, and photographers. Make final editorial decisions and ensure every issue meets the highest standards of quality.",
  },
];

const responsibilities = [
  {
    title: "Editorial Leadership",
    desc: "Make final editorial decisions on all content, ensuring journalistic standards, factual accuracy, and balanced reporting across every issue.",
  },
  {
    title: "Team Management",
    desc: "Manage a team of 11 editors and 36 writers, artists, and photographers, assigning stories, providing feedback, and mentoring staff to develop their journalistic skills.",
  },
  {
    title: "Digital Strategy",
    desc: "Oversee content strategy across print and online platforms, optimizing for reader engagement and consistent publication cadence.",
  },
  {
    title: "Publication Operations",
    desc: "Maintain the publication schedule and editorial calendar, coordinating deadlines, review cycles, and production timelines.",
  },
];

export default function SpokesmanPage() {
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
          <LogoBanner src="/images/spokesman-logo-alt.png" alt="The Spokesman" width={1357} height={239} />
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
                The Spokesman
              </h1>
              <div className="font-sans font-bold text-lg md:text-[22px] mb-5">
                Editor in Chief
              </div>
            </PopIn>
            <PopIn delay={0.12}>
              <div className="font-sans text-[17px] leading-[1.65] max-w-[600px] text-secondary space-y-4">
                <p>
                  Rose through the ranks from Associate Editor to Online Editor to
                  Editor in Chief of The Spokesman, the school newspaper at Princeton
                  Day School. Since September 2023, progressively took on greater
                  responsibility, demonstrating leadership, editorial judgment, and a
                  commitment to quality journalism.
                </p>
                <p>
                  As Editor in Chief, lead the entire editorial team of 11 editors
                  and manage 36 writers, artists, and photographers. Manage digital
                  content strategy across both print and online platforms, ensuring
                  consistent voice, quality, and timeliness. Edit, review, and publish
                  student articles while maintaining the publication schedule and
                  editorial calendar.
                </p>
                <p>
                  Oversee all editorial decisions, balancing journalistic integrity with
                  student development. Foster a collaborative environment where writers
                  grow their skills and gain confidence in their voice.
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
              <a
                href="https://thespokesman.net"
                target="_blank"
                rel="noopener noreferrer"
                className="ink-btn ink-btn--dark mt-8 no-underline"
              >
                Read The Spokesman &#8599;
              </a>
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
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">WEBSITE</div>
                <a
                  href="https://thespokesman.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-base no-underline text-foreground hover:underline"
                >
                  thespokesman.net &#8599;
                </a>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">INSTAGRAM</div>
                <a
                  href="https://www.instagram.com/spokesmanpds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-base no-underline text-foreground hover:underline"
                  aria-label="The Spokesman Instagram"
                >
                  @spokesmanpds &#8599;
                </a>
              </div>
            </aside>
          </PopIn>
        </div>

        {/* ═══ Role progression ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            ROLE PROGRESSION
          </div>
        </PopIn>
        <div className="space-y-5">
          {roleProgression.map((role, i) => (
            <PopIn key={role.title} delay={i * 0.06}>
              <div className="ink-card p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="sm:w-56 shrink-0 flex items-center gap-3">
                  <span className="w-8 h-8 border-2 border-foreground bg-ink-yellow flex items-center justify-center font-mono text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-sans font-extrabold text-base tracking-[-0.02em]">{role.title}</span>
                </div>
                <p className="font-sans text-[15px] leading-[1.55] text-muted m-0 flex-1">{role.desc}</p>
              </div>
            </PopIn>
          ))}
        </div>

        {/* ═══ Progression path ═══ */}
        <PopIn>
          <div className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-7 mt-8">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-white text-muted px-3.5 py-1.5 rounded-full">
                Associate Editor
              </span>
              <span className="font-sans font-extrabold" aria-hidden>&rarr;</span>
              <span className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-white text-muted px-3.5 py-1.5 rounded-full">
                Online Editor
              </span>
              <span className="font-sans font-extrabold" aria-hidden>&rarr;</span>
              <span className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-ink-yellow px-3.5 py-1.5 rounded-full">
                Editor in Chief
              </span>
            </div>
          </div>
        </PopIn>

        {/* ═══ Responsibilities ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            RESPONSIBILITIES
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {responsibilities.map((r, i) => (
            <PopIn key={r.title} delay={i * 0.06} className="h-full">
              <div className="ink-card p-6 h-full flex flex-col gap-2">
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">{r.title}</h3>
                <p className="font-sans text-[15px] leading-[1.55] text-muted m-0">{r.desc}</p>
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

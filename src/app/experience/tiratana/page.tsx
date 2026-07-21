import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ti-Ratana — Leo Chang",
  description: "Director of the Orphanage Educational Program at Ti-Ratana Welfare Society (Kuala Lumpur). 600+ hours, $8,000 fundraised.",
};

const achievements = [
  "Initiated remote education program from scratch",
  "Weekly Zoom lessons in English & science to children in Ti-Ratana's children's homes",
  "Led a community fundraiser raising $8,000 for e-learning tools",
  "Personally taught all weekly lessons in English and science",
  "Featured in Malaysian newspaper",
  "600+ volunteer hours over 6+ years",
];

const skills = [
  "Community Service",
  "Curriculum Development",
  "Teaching",
  "Program Director",
  "Fundraising",
  "Lesson Delivery",
];

const stats = [
  { value: "600+", label: "VOLUNTEER HOURS" },
  { value: "5+", label: "YEARS RUNNING" },
  { value: "Weekly", label: "ZOOM LESSONS" },
];

const highlights = [
  {
    title: "Remote Education",
    desc: "Built a fully remote educational pipeline connecting student volunteers in the US with children at Ti-Ratana Welfare Society's children's homes in Malaysia via weekly Zoom sessions.",
  },
  {
    title: "Fundraising Success",
    desc: "Organized and led a community fundraiser that raised $8,000 to purchase a projector, laptop, and microphone for e-learning tools.",
  },
  {
    title: "Solo Teaching",
    desc: "Personally develops and delivers all weekly lessons in English and science, maintaining consistent, high-quality education every week.",
  },
  {
    title: "Media Recognition",
    desc: "The program's impact was recognized by a local Malaysian newspaper, bringing wider attention to the educational initiative.",
  },
];

export default function TiRatanaPage() {
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
          <LogoBanner src="/images/orphanagelogo.png" alt="Ti-Ratana Welfare Society" width={991} height={243} />
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
                Ti-Ratana Welfare Society
              </h1>
              <div className="font-sans font-bold text-lg md:text-[22px] mb-5">
                Director of Orphanage Educational Program
              </div>
            </PopIn>
            <PopIn delay={0.12}>
              <div className="font-sans text-[17px] leading-[1.65] max-w-[600px] text-secondary space-y-4">
                <p>
                  Ti-Ratana Welfare Society is one of the largest independent charitable
                  NGOs in Kuala Lumpur, Malaysia, housing over 160 children across three
                  homes regardless of race and creed. Initiated a remote educational program
                  providing weekly Zoom lessons in English and science to children in
                  their children&apos;s homes who would otherwise lack access to quality
                  educational resources.
                </p>
                <p>
                  Led a community fundraiser raising $8,000 for e-learning tools
                  &mdash; including a projector, laptop, and microphone &mdash; enabling
                  continued education and a more engaging learning experience for the
                  children. Personally teaches all weekly lessons, developing and delivering
                  curriculum in English and science.
                </p>
                <p>
                  The program was featured in a Malaysian newspaper for its
                  community impact, highlighting the cross-continental bridge between
                  student volunteers and the children at Ti-Ratana. Over 600 volunteer
                  hours have been contributed across 6+ years of running the program.
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
                <div className="font-sans font-bold text-base">2020 &ndash; Present &middot; 6+ years</div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">LOCATION</div>
                <div className="font-sans font-bold text-base">Kuala Lumpur, Malaysia (remote)</div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">STATUS</div>
                <div className="font-sans font-bold text-base">Active</div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">HOURS</div>
                <div className="font-sans font-bold text-base">600+ volunteer hours</div>
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
            IN THE PRESS
          </div>
          <figure className="m-0 border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-3">
            <Image
              src="/images/Orphanage.jpg"
              alt="Ti-Ratana Educational Program — Featured in Malaysian newspaper"
              width={1200}
              height={800}
              className="w-full h-auto block"
            />
            <figcaption className="font-mono text-[11px] font-medium text-muted pt-2.5">
              Photo Credit: Ti-Ratana Welfare Society
            </figcaption>
          </figure>
        </PopIn>

        {/* ═══ Program highlights ═══ */}
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mt-16 mb-5">
            PROGRAM HIGHLIGHTS
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

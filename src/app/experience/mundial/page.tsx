import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mundial Financial — Leo Chang",
  description: "Intern at Mundial Financial Group (Jul–Sep 2025). Led website redesign, content strategy, and social media for the firm.",
};

const achievements = [
  "Led a complete website redesign for a financial services firm",
  "Conducted comprehensive analysis of 10+ industry competitor websites",
  "Authored and optimized all major web content pages",
  "Managed social media presence and content calendar",
  "Researched and integrated financial news and strategies into content",
];

const skills = [
  "Web Design",
  "Content Writing",
  "SEO",
  "Social Media",
  "Financial Analysis",
];

const projectPhases = [
  {
    phase: "01",
    title: "Research & Analysis",
    desc: "Conducted in-depth competitive analysis across 10+ financial services websites, identifying best practices in UX, messaging, and conversion optimization.",
  },
  {
    phase: "02",
    title: "Content Strategy",
    desc: "Developed a comprehensive content strategy aligned with business goals. Authored all major web pages with SEO-optimized copy that positioned the firm as an industry authority.",
  },
  {
    phase: "03",
    title: "Website Redesign",
    desc: "Translated research findings and content strategy into a modern, professional website redesign that improved user experience and brand perception.",
  },
  {
    phase: "04",
    title: "Social Media & Marketing",
    desc: "Managed the company's social media presence, created a content calendar, and produced posts that drove engagement and brand awareness.",
  },
];

export default function MundialPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-20">
      {/* Back link */}
      <PopIn>
        <Link
          href="/experience"
          className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7"
        >
          &larr; ALL EXPERIENCE
        </Link>
      </PopIn>
      <PopIn delay={0.03}>
        <LogoBanner src="/images/mundiallogo3.png" alt="Mundial Financial Group" width={284} height={60} />
      </PopIn>

      {/* ═══ Header grid ═══ */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
        {/* Left column */}
        <div>
          <PopIn>
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="ink-chip ink-chip--completed">COMPLETED</span>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full">
                Website Redesign
              </span>
            </div>
          </PopIn>
          <PopIn delay={0.06}>
            <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] m-0 mb-4">
              Mundial Financial Group
            </h1>
            <div className="font-sans font-bold text-lg md:text-[22px] mb-6">
              Intern, Investment Banking
            </div>
          </PopIn>
          <PopIn delay={0.12}>
            <div className="flex flex-col gap-4 max-w-[600px] mb-8">
              <p className="font-sans text-[17px] leading-[1.65] m-0">
                As a Web Development and Content Strategy Intern at Mundial Financial Group,
                I led a complete website redesign for the financial services firm, translating
                business requirements into a professional, modern web presence.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                I conducted comprehensive analysis of 10+ industry competitor websites to
                benchmark design patterns, messaging strategies, and user experience best
                practices. This research directly informed the content and design decisions
                that shaped the new site.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                Beyond the website itself, I authored and optimized all major web content pages,
                managed the company&apos;s social media presence and content calendar, and
                researched and integrated timely financial news and strategies into the
                firm&apos;s marketing materials.
              </p>
            </div>
          </PopIn>
          <PopIn delay={0.18}>
            <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-4">
              Key Achievements
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
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
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                DATES
              </div>
              <div className="font-sans font-bold text-base">Jul &ndash; Sep 2025</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                LOCATION
              </div>
              <div className="font-sans font-bold text-base">Remote</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                STATUS
              </div>
              <div className="font-sans font-bold text-base">Completed</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                FOCUS
              </div>
              <div className="font-sans font-bold text-base">Website Redesign</div>
            </div>
          </aside>
        </PopIn>
      </div>

      {/* ═══ Project Phases ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            Project Phases
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {projectPhases.map((p) => (
            <PopIn key={p.phase} className="h-full">
              <div className="ink-card p-6 flex flex-col gap-2.5 h-full">
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full self-start">
                  Phase {p.phase}
                </span>
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">
                  {p.title}
                </h3>
                <p className="font-sans text-sm leading-[1.6] text-secondary m-0">{p.desc}</p>
              </div>
            </PopIn>
          ))}
        </div>
      </section>

      {/* ═══ Skills ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            Skills
          </div>
          <div className="flex gap-3 flex-wrap">
            {skills.map((s) => (
              <span
                key={s}
                className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-white px-3.5 py-1.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </PopIn>
      </section>
    </main>
  );
}

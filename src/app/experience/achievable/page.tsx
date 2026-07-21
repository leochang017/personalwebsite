import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Achievable — Leo Chang",
  description: "Content Marketing Intern at Achievable, Inc. (Jul–Oct 2024). 15+ blog posts, guest publications, remote work.",
};

const achievements = [
  "Authored 15+ high-quality blog posts on test prep topics",
  "Conducted independent research on exam trends and study strategies",
  "Wrote guest posts published on external partner sites",
  "Demonstrated strong remote work autonomy and self-direction",
];

const skills = [
  "Content Marketing",
  "Independent Research",
  "Brand Authority Building",
  "Guest Content",
  "Remote Work",
  "Educational Content",
];

const contentHighlights = [
  {
    title: "Blog Content Creation",
    desc: "Produced 15+ in-depth blog posts covering test preparation strategies, exam breakdowns, and study tips. Each article was thoroughly researched and optimized for organic search visibility.",
  },
  {
    title: "Guest Publications",
    desc: "Extended the brand's reach by writing guest posts published on external partner sites, building backlinks and establishing Achievable's authority in the EdTech space.",
  },
  {
    title: "Research & Analysis",
    desc: "Independently researched exam trends, test format changes, and competitor content strategies to inform editorial direction and identify content gaps.",
  },
  {
    title: "Brand Voice Development",
    desc: "Maintained a consistent, authoritative brand voice across all content that reinforced Achievable's position as a trusted resource for test preparation.",
  },
];

export default function AchievablePage() {
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
        <LogoBanner src="/images/achievable-logo.png" alt="Achievable, Inc." width={1139} height={149} />
      </PopIn>

      {/* ═══ Header grid ═══ */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
        {/* Left column */}
        <div>
          <PopIn>
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="ink-chip ink-chip--completed">COMPLETED</span>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full">
                15+ Articles
              </span>
            </div>
          </PopIn>
          <PopIn delay={0.06}>
            <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] m-0 mb-4">
              Achievable, Inc.
            </h1>
            <div className="font-sans font-bold text-lg md:text-[22px] mb-6">
              Content Marketing Intern
            </div>
          </PopIn>
          <PopIn delay={0.12}>
            <div className="flex flex-col gap-4 max-w-[600px] mb-8">
              <p className="font-sans text-[17px] leading-[1.65] m-0">
                At Achievable, an EdTech startup specializing in test preparation, I served
                as a Content Marketing Intern responsible for creating high-quality educational
                content that drove organic traffic and reinforced the brand&apos;s authority
                in the education space.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                Working independently in a fully remote environment, I authored 15+ blog posts
                covering a wide range of test prep topics, from exam breakdowns and study strategies
                to in-depth guides on specific test sections. Each piece was thoroughly researched,
                carefully written, and optimized for search engine visibility.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                I also contributed guest posts published on external partner sites, extending
                the company&apos;s reach and building valuable backlinks. This role demanded
                strong self-direction, consistent output quality, and the ability to translate
                complex exam topics into accessible, engaging content.
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
              <div className="font-sans font-bold text-base">Jul &ndash; Oct 2024</div>
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
                OUTPUT
              </div>
              <div className="font-sans font-bold text-base">15+ Articles</div>
            </div>
          </aside>
        </PopIn>
      </div>

      {/* ═══ Content Highlights ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            Content Highlights
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {contentHighlights.map((h) => (
            <PopIn key={h.title} className="h-full">
              <div className="ink-card p-6 flex flex-col gap-2.5 h-full">
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">
                  {h.title}
                </h3>
                <p className="font-sans text-sm leading-[1.6] text-secondary m-0">{h.desc}</p>
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

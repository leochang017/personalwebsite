import type { Metadata } from "next";
import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
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
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                <Image
                  src="/images/achievable-logo.png"
                  alt="Achievable, Inc."
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Achievable, Inc.
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                    15+ Articles
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg mt-1">
                  Content Marketing Intern
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted font-mono">
                    Jul &ndash; Oct 2024
                  </span>
                  <span className="text-sm text-muted">Remote</span>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About the Role</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                At Achievable, an EdTech startup specializing in test preparation, I served
                as a Content Marketing Intern responsible for creating high-quality educational
                content that drove organic traffic and reinforced the brand&apos;s authority
                in the education space.
              </p>
              <p>
                Working independently in a fully remote environment, I authored 15+ blog posts
                covering a wide range of test prep topics, from exam breakdowns and study strategies
                to in-depth guides on specific test sections. Each piece was thoroughly researched,
                carefully written, and optimized for search engine visibility.
              </p>
              <p>
                I also contributed guest posts published on external partner sites, extending
                the company&apos;s reach and building valuable backlinks. This role demanded
                strong self-direction, consistent output quality, and the ability to translate
                complex exam topics into accessible, engaging content.
              </p>
            </div>
          </div>
        </SlideIn>

        {/* Key Achievements */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            Key Achievements
          </h2>
        </FadeUp>
        <StaggerList className="space-y-3 mb-14">
          {achievements.map((a) => (
            <StaggerItem key={a}>
              <div className="sticker-card-surface rounded-xl p-5 flex items-start gap-3 hover:border-accent/30 transition-all duration-300">
                <span className="text-accent mt-0.5 shrink-0 text-lg">
                  &bull;
                </span>
                <p className="text-sm text-secondary font-body leading-relaxed">
                  {a}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Content Highlights */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            Content Highlights
          </h2>
        </FadeUp>
        <StaggerList className="grid md:grid-cols-2 gap-4 mb-14">
          {contentHighlights.map((h) => (
            <StaggerItem key={h.title}>
              <div className="sticker-card-surface rounded-xl p-6 h-full hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{h.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {h.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Skills */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Skills</h2>
        </FadeUp>
        <ScaleIn delay={0.1}>
          <div className="flex gap-3 flex-wrap mb-14">
            {skills.map((s) => (
              <span
                key={s}
                className="sticker-btn text-xs no-underline"
              >
                {s}
              </span>
            ))}
          </div>
        </ScaleIn>

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

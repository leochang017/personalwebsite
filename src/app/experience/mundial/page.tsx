import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

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
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                <Image
                  src="/images/mundiallogo3.png"
                  alt="Mundial Financial Group"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Mundial Financial Group
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                    Website Redesign
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg mt-1">
                  Intern, Investment Banking
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted font-mono">
                    Jul &ndash; Sep 2025
                  </span>
                  <span className="text-sm text-muted">Remote</span>
                </div>
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
                As a Web Development and Content Strategy Intern at Mundial Financial Group,
                I led a complete website redesign for the financial services firm, translating
                business requirements into a professional, modern web presence.
              </p>
              <p>
                I conducted comprehensive analysis of 10+ industry competitor websites to
                benchmark design patterns, messaging strategies, and user experience best
                practices. This research directly informed the content and design decisions
                that shaped the new site.
              </p>
              <p>
                Beyond the website itself, I authored and optimized all major web content pages,
                managed the company&apos;s social media presence and content calendar, and
                researched and integrated timely financial news and strategies into the
                firm&apos;s marketing materials.
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
              <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/30 transition-all duration-300">
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

        {/* Project Phases */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            Project Phases
          </h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {projectPhases.map((p) => (
            <StaggerItem key={p.phase}>
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row gap-4 hover:border-accent/30 transition-all duration-300">
                <div className="sm:w-20 shrink-0">
                  <span className="font-mono text-2xl font-black text-accent/30">
                    {p.phase}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-body">
                    {p.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* CEO Quote */}
        <ScaleIn delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <div className="flex gap-3 mb-4">
              <span className="text-accent text-4xl font-serif leading-none">
                &ldquo;
              </span>
            </div>
            <p className="text-secondary italic font-body leading-relaxed text-base mb-6">
              I want to commend Leo for the outstanding work he did during his internship
              at Mundial Financial Group. His dedication, hard work, and eagerness to learn
              were evident throughout. His work in creating a new website showcased both his
              technical skills and ability to translate what he learned into a professional,
              practical result.
            </p>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-bold font-sans">
                  Charles Smulevitz
                </p>
                <p className="text-xs text-muted">
                  CEO, Mundial Financial Group
                </p>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Skills */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Skills</h2>
        </FadeUp>
        <ScaleIn delay={0.1}>
          <div className="flex gap-3 flex-wrap mb-14">
            {skills.map((s) => (
              <span
                key={s}
                className="text-xs font-semibold px-4 py-2 rounded-full bg-surface border border-border text-secondary hover:border-accent/30 hover:text-accent transition-all duration-300"
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

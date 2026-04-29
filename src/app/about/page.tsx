import type { Metadata } from "next";
import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem, CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { StickerPill } from "@/components/Doodles";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Leo Chang",
  description: "Junior at Princeton Day School (Class of 2027). Builder, researcher, and community leader focused on CS, ML/AI, economics, and finance.",
};

const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "HTML/CSS", "GDScript"],
  },
  {
    category: "Frameworks",
    items: ["TensorFlow/Keras", "React", "Node.js", "Flask", "Next.js"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Godot"],
  },
  {
    category: "Focus Areas",
    items: ["Machine Learning", "AI", "Web Dev", "Data Science", "Game Dev"],
  },
];

const courses = [
  { name: "AP Microeconomics", note: null, type: "ap" },
  { name: "AP Macroeconomics", note: null, type: "ap" },
  { name: "AP Chemistry", note: null, type: "ap" },
  { name: "AP Comparative Government", note: null, type: "ap" },
  { name: "Honors Precalculus", note: null, type: "honors" },
  { name: "Honors Physics", note: null, type: "honors" },
];

const completedCourses = [
  { name: "AP Computer Science A", note: "Score: 4", type: "ap" },
  { name: "Latin 4", note: "St. John's University · Dual enrollment, college credit", type: "dual" },
];

const languages = [
  { name: "English", level: "Native" },
  { name: "Chinese", level: "Conversational" },
  { name: "Latin", level: "Academic" },
];

const drives = [
  {
    title: "Building Projects & Applications",
    desc: "From NapkinNotes (500+ students) to Phase Spector to ML research — I love turning ideas into real products",
  },
  {
    title: "Research & Discovery",
    desc: "Accepted for publishing in the Journal of Emerging Investigators — I enjoy diving deep into questions, designing experiments, and contributing original findings to the scientific community",
  },
  {
    title: "Community Impact",
    desc: "660+ volunteer hours, $8,000 fundraised, weekly lessons to children in Malaysia through Ti-Ratana",
  },
  {
    title: "Competitive Spirit",
    desc: "Saber fencing since age 6, USA Dance National DanceSport Champion, programming competitions, competitive writing, Science Olympiad",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Intro */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
              About Me
            </h1>
            <StickerPill color="var(--color-sticker-pink)" rotate={4} className="text-xs font-bold uppercase tracking-wider wobble-slow">
              PDS &apos;27
            </StickerPill>
          </div>
          <p className="text-muted text-lg md:text-xl mb-10 font-body max-w-2xl">
            Student, builder, researcher, and community leader.
          </p>
        </FadeUp>

        {/* Key Numbers */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {[
              { value: 3, suffix: "", label: "Projects" },
              { value: 5, suffix: "", label: "Leadership Roles" },
              { value: 580, suffix: "+", label: "Work Hours" },
              { value: 660, suffix: "+", label: "Volunteer Hours" },
              { value: 18, suffix: "+", label: "Awards" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="sticker-card-surface rounded-2xl p-6 text-center"
              >
                <div className="font-sans text-3xl md:text-4xl font-black text-accent">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs md:text-sm text-muted mt-1 font-body">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Bio Card */}
        <ScaleIn delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-16">
            <div className="grid md:grid-cols-[200px_1fr] gap-8">
              {/* Photo */}
              <SlideIn direction="left" delay={0.15}>
                <div className="rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-lg hover:scale-105 transition-all duration-500">
                  <Image
                    src="/images/baby.jpg"
                    alt="Young Leo"
                    width={200}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SlideIn>

              {/* Bio text */}
              <div className="font-body text-secondary leading-relaxed space-y-4">
                <p className="text-lg">
                  Hi! Welcome to my personal portfolio website! My name is Leo
                  Chang, and I am a Junior at Princeton Day School. I have great
                  interests in systems engineering, economics, and writing, with a
                  particular passion for machine learning, creative writing, and artificial
                  intelligence. Feel free to explore my website, and reach out to
                  me via email if you have any questions or
                  opportunities to discuss!
                </p>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Education Section */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Education
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden p-1.5">
                <Image
                  src="/images/princetondayschool.png"
                  alt="PDS"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold">
                  Princeton Day School
                </h3>
                <p className="text-accent text-sm font-semibold">
                  Junior &middot; Class of 2027 &middot; SAT: 1550
                </p>
              </div>
            </div>

            <h4 className="text-xs font-bold text-olive uppercase tracking-wider mb-4 font-sans">
              Current Coursework
            </h4>
            <StaggerList className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {courses.map((c) => (
                <StaggerItem key={c.name}>
                  <TiltCard className="h-full">
                  <div className="bg-surface-light border border-border rounded-xl p-4 hover:border-accent/20 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          c.type === "ap"
                            ? "bg-accent/10 text-accent"
                            : c.type === "dual"
                            ? "bg-olive/10 text-olive"
                            : "bg-clay/10 text-clay"
                        }`}
                      >
                        {c.type === "ap"
                          ? "AP"
                          : c.type === "dual"
                          ? "Dual Enrollment"
                          : "Honors"}
                      </span>
                    </div>
                    <p className="font-sans font-bold text-sm">{c.name}</p>
                    {c.note && (
                      <p className="text-[11px] text-muted mt-0.5">{c.note}</p>
                    )}
                  </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerList>

            <h4 className="text-xs font-bold text-olive uppercase tracking-wider mb-4 mt-8 font-sans">
              Completed Coursework
            </h4>
            <StaggerList className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {completedCourses.map((c) => (
                <StaggerItem key={c.name}>
                  <TiltCard className="h-full">
                  <div className="bg-surface-light border border-border rounded-xl p-4 hover:border-accent/20 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          c.type === "ap"
                            ? "bg-accent/10 text-accent"
                            : c.type === "dual"
                            ? "bg-olive/10 text-olive"
                            : "bg-clay/10 text-clay"
                        }`}
                      >
                        {c.type === "ap"
                          ? "AP"
                          : c.type === "dual"
                          ? "Dual Enrollment"
                          : "Honors"}
                      </span>
                    </div>
                    <p className="font-sans font-bold text-sm">{c.name}</p>
                    {c.note && (
                      <p className="text-[11px] text-muted mt-0.5">{c.note}</p>
                    )}
                  </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </FadeUp>

        {/* Technical Skills */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Technical Skills
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {skills.map((s, i) => (
            <SlideIn
              key={s.category}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.08}
            >
              <TiltCard className="h-full">
              <div className="sticker-card-surface rounded-2xl p-7 hover:border-accent/20 transition-all h-full">
                <h3 className="font-sans font-bold text-xs text-accent uppercase tracking-wider mb-4">
                  {s.category}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm font-medium px-4 py-2 rounded-xl bg-surface-light text-secondary border border-border hover:border-accent/30 hover:text-accent transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
            </SlideIn>
          ))}
        </div>

        {/* Languages */}
        <SlideIn direction="left" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-7 mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="font-sans text-xl font-bold">
                Languages Spoken
              </h3>
            </div>
            <div className="flex gap-6 flex-wrap">
              {languages.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center gap-3"
                >
                  <span className="font-sans font-bold text-sm">
                    {l.name}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-surface-light text-muted uppercase tracking-wider">
                    {l.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>

        {/* What Drives Me */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              What Drives Me
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {drives.map((d, i) => (
            <SlideIn
              key={d.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.08}
            >
              <TiltCard className="h-full">
              <div className="sticker-card-surface rounded-2xl p-7 hover:border-accent/20 transition-all h-full">
                <h3 className="font-sans font-bold text-base mb-2">
                  {d.title}
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed">
                  {d.desc}
                </p>
              </div>
              </TiltCard>
            </SlideIn>
          ))}
        </div>

        {/* Contact & Resume */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Get in Touch
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <ScaleIn delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-secondary font-body leading-relaxed mb-4">
                  I&apos;m always open to connecting over shared interests in
                  technology, research, or community service. Whether you have a
                  project idea, a question about my work, or just want to say
                  hello &mdash; feel free to reach out.
                </p>
                <div className="bg-surface-light border border-border rounded-xl p-5 mb-4">
                  <p className="text-xs font-bold text-olive uppercase tracking-wider mb-2 font-sans">
                    Email
                  </p>
                  <a
                    href="mailto:leochang017@gmail.com"
                    className="text-accent font-semibold text-sm hover:underline font-sans"
                  >
                    leochang017@gmail.com
                  </a>
                </div>
                <div className="bg-surface-light border border-border rounded-xl p-5 mb-4">
                  <p className="text-xs font-bold text-olive uppercase tracking-wider mb-2 font-sans">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/leo.c000/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold text-sm hover:underline font-sans"
                  >
                    @leo.c000
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <a
                  href="/images/LeoChangResume_May2026.pdf"
                  download
                  className="w-full md:w-auto inline-flex justify-center px-10 py-4 rounded-2xl bg-foreground text-background font-bold text-base no-underline hover:bg-accent transition-colors"
                >
                  Download Resume
                  <span className="ml-2" aria-hidden="true">
                    &darr;
                  </span>
                </a>
                <p className="text-xs text-muted font-body">
                  Updated April 2026 &middot; PDF format
                </p>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </main>
  );
}

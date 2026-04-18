import type { Metadata } from "next";
import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Capital Health — Leo Chang",
  description: "Junior Volunteer at Capital Health Regional Medical Center (Jul–Aug 2024). 66+ hours across nursing units and patient cart programs.",
};

const achievements = [
  "Completed 66+ hours of hands-on volunteer work in a hospital setting",
  "Rotated through Nursing Unit support roles across multiple departments",
  "Assisted with Comfort Cart, Book Cart, Tea Cart, and Art Cart programs",
  "Organized patient files and performed data entry tasks",
  "Prepared discharge packets for departing patients",
];

const skills = [
  "Patient Care",
  "Data Entry",
  "Organization",
  "Communication",
  "Healthcare",
];

const programs = [
  {
    name: "Comfort Cart",
    desc: "Distributed comfort items to patients throughout the hospital, providing personal care essentials and a friendly face during their stay.",
  },
  {
    name: "Book Cart",
    desc: "Brought reading materials to patient rooms, offering a selection of books and magazines to help pass the time during recovery.",
  },
  {
    name: "Tea Cart",
    desc: "Prepared and served warm beverages to patients and visitors, creating moments of calm and comfort within the hospital environment.",
  },
  {
    name: "Art Cart",
    desc: "Facilitated creative activities for patients, providing art supplies and encouraging artistic expression as a form of therapeutic engagement.",
  },
];

const responsibilities = [
  {
    area: "Patient Support",
    title: "Direct Patient Interaction",
    desc: "Engaged with patients across multiple departments, providing comfort, companionship, and assistance with non-medical needs during their hospital stay.",
  },
  {
    area: "Administration",
    title: "File Organization & Data Entry",
    desc: "Organized patient files and performed accurate data entry tasks, supporting the administrative backbone of hospital operations.",
  },
  {
    area: "Discharge",
    title: "Discharge Packet Preparation",
    desc: "Assembled comprehensive discharge packets for departing patients, ensuring all necessary documentation and instructions were included.",
  },
];

export default function CapitalHealthPage() {
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
              <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/images/capitalhealth2.jpg"
                  alt="Capital Health Regional Medical Center"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Capital Health Regional Medical Center
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                    66+ Hours
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg mt-1">
                  Junior Volunteer
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted font-mono">
                    Jul &ndash; Aug 2024
                  </span>
                  <span className="text-sm text-muted">Trenton, NJ</span>
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
                During the summer of 2024, I completed 66+ hours of hands-on volunteer work
                at Capital Health Regional Medical Center, immersing myself in the daily
                operations of a busy hospital environment.
              </p>
              <p>
                I rotated through multiple Nursing Unit support roles, gaining exposure to
                different departments and patient populations. My responsibilities ranged
                from direct patient interaction through the hospital&apos;s cart programs to
                behind-the-scenes administrative work like organizing patient files and
                performing data entry.
              </p>
              <p>
                This experience gave me a deep appreciation for the healthcare system, the
                importance of empathy in patient care, and the critical role that organization
                and attention to detail play in a medical setting.
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

        {/* Cart Programs */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            Patient Cart Programs
          </h2>
        </FadeUp>
        <StaggerList className="grid md:grid-cols-2 gap-4 mb-14">
          {programs.map((p) => (
            <StaggerItem key={p.name}>
              <div className="sticker-card-surface rounded-xl p-6 h-full hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{p.name}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {p.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Core Responsibilities */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            Core Responsibilities
          </h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {responsibilities.map((r) => (
            <StaggerItem key={r.area}>
              <div className="sticker-card-surface rounded-xl p-6 flex flex-col sm:flex-row gap-4 hover:border-olive/30 transition-all duration-300">
                <div className="sm:w-32 shrink-0">
                  <span className="font-mono text-xs font-bold text-olive bg-olive/10 px-3 py-1 rounded-full">
                    {r.area}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-body">
                    {r.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Certificate */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            Volunteer Certificate
          </h2>
        </FadeUp>
        <SlideIn direction="right" delay={0.1}>
          <div className="relative w-full rounded-2xl overflow-hidden mb-14 border border-border shadow-lg shadow-accent/10">
            <Image
              src="/images/capitalhealth.jpg"
              alt="Capital Health Volunteer Certificate"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-[11px] text-muted font-body text-left py-2 px-4">Photo Credit: Leo Chang</p>
          </div>
        </SlideIn>

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

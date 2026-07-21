import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
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
        <LogoBanner src="/images/capitalhealth2.jpg" alt="Capital Health Regional Medical Center" width={320} height={252} />
      </PopIn>

      {/* ═══ Header grid ═══ */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
        {/* Left column */}
        <div>
          <PopIn>
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="ink-chip ink-chip--completed">COMPLETED</span>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full">
                66+ Hours
              </span>
            </div>
          </PopIn>
          <PopIn delay={0.06}>
            <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] m-0 mb-4">
              Capital Health Regional Medical Center
            </h1>
            <div className="font-sans font-bold text-lg md:text-[22px] mb-6">
              Junior Volunteer
            </div>
          </PopIn>
          <PopIn delay={0.12}>
            <div className="flex flex-col gap-4 max-w-[600px] mb-8">
              <p className="font-sans text-[17px] leading-[1.65] m-0">
                During the summer of 2024, I completed 66+ hours of hands-on volunteer work
                at Capital Health Regional Medical Center, immersing myself in the daily
                operations of a busy hospital environment.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                I rotated through multiple Nursing Unit support roles, gaining exposure to
                different departments and patient populations. My responsibilities ranged
                from direct patient interaction through the hospital&apos;s cart programs to
                behind-the-scenes administrative work like organizing patient files and
                performing data entry.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                This experience gave me a deep appreciation for the healthcare system, the
                importance of empathy in patient care, and the critical role that organization
                and attention to detail play in a medical setting.
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
              <div className="font-sans font-bold text-base">Jul &ndash; Aug 2024</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                LOCATION
              </div>
              <div className="font-sans font-bold text-base">Trenton, NJ</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                STATUS
              </div>
              <div className="font-sans font-bold text-base">Completed</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                HOURS
              </div>
              <div className="font-sans font-bold text-base">66+</div>
            </div>
          </aside>
        </PopIn>
      </div>

      {/* ═══ Patient Cart Programs ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            Patient Cart Programs
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {programs.map((p) => (
            <PopIn key={p.name} className="h-full">
              <div className="ink-card p-6 flex flex-col gap-2.5 h-full">
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">
                  {p.name}
                </h3>
                <p className="font-sans text-sm leading-[1.6] text-secondary m-0">{p.desc}</p>
              </div>
            </PopIn>
          ))}
        </div>
      </section>

      {/* ═══ Core Responsibilities ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            Core Responsibilities
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {responsibilities.map((r) => (
            <PopIn key={r.area} className="h-full">
              <div className="ink-card p-6 flex flex-col gap-2.5 h-full">
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full self-start">
                  {r.area}
                </span>
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">
                  {r.title}
                </h3>
                <p className="font-sans text-sm leading-[1.6] text-secondary m-0">{r.desc}</p>
              </div>
            </PopIn>
          ))}
        </div>
      </section>

      {/* ═══ Volunteer Certificate ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            Volunteer Certificate
          </div>
          <div className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-3 max-w-[820px]">
            <Image
              src="/images/capitalhealth.jpg"
              alt="Capital Health Volunteer Certificate"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="font-mono text-[11px] font-medium text-muted pt-2.5 m-0">
              Photo Credit: Leo Chang
            </p>
          </div>
        </PopIn>
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

import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chipotle — Leo Chang",
  description: "Team Member at Chipotle Mexican Grill (Sep 2025–May 2026). Yardley & Warrington, PA. 200+ customers daily.",
};

const achievements = [
  "Serve 200+ customers daily during peak lunch and dinner rushes",
  "Maintain strict food safety and hygiene protocols across all stations",
  "Coordinate with team members for efficient shift transitions",
  "Manage time-sensitive tasks in a fast-paced, high-volume environment",
];

const skills = [
  "Customer Service",
  "Teamwork",
  "Food Safety",
  "Communication",
  "Time Management",
  "Operations",
];

const dayInLife = [
  {
    time: "Prep",
    title: "Station Setup & Food Prep",
    desc: "Arrive and prepare stations with fresh ingredients. Ensure all containers are stocked, portioned, and ready for the rush.",
  },
  {
    time: "Rush",
    title: "Peak Service Hours",
    desc: "Serve a continuous stream of customers through the line, assembling orders with speed and accuracy while maintaining food safety standards.",
  },
  {
    time: "Transition",
    title: "Shift Changeover",
    desc: "Coordinate with incoming team members to ensure seamless handoffs. Communicate stock levels and any outstanding tasks.",
  },
  {
    time: "Close",
    title: "Clean & Restock",
    desc: "Break down stations, deep clean equipment and surfaces, restock for the next shift, and ensure everything meets health code standards.",
  },
];

export default function ChipotlePage() {
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
        <LogoBanner src="/images/chipotle.png" alt="Chipotle Mexican Grill" width={1280} height={1280} />
      </PopIn>

      {/* ═══ Header grid ═══ */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
        {/* Left column */}
        <div>
          <PopIn>
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="ink-chip ink-chip--completed">COMPLETED</span>
            </div>
          </PopIn>
          <PopIn delay={0.06}>
            <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] m-0 mb-4">
              Chipotle Mexican Grill
            </h1>
            <div className="font-sans font-bold text-lg md:text-[22px] mb-6">
              Team Member
            </div>
          </PopIn>
          <PopIn delay={0.12}>
            <div className="flex flex-col gap-4 max-w-[600px] mb-8">
              <p className="font-sans text-[17px] leading-[1.65] m-0">
                Worked at Chipotle locations in Yardley and Warrington, PA from
                Sep 2025 to May 2026, delivering fast, friendly customer service in a
                high-volume environment that demanded precision, speed, and teamwork
                every single shift.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                On any given day, I served 200+ customers during peak lunch and dinner rushes,
                maintaining strict food safety and hygiene protocols across all stations.
                I coordinated closely with team members to ensure efficient shift transitions
                and managed time-sensitive tasks in high-volume conditions where every second
                counted.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                This role sharpened my ability to stay calm under pressure, communicate
                clearly with a diverse team, and consistently deliver quality service even
                during the most demanding rushes.
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
              <div className="font-sans font-bold text-base">Sep 2025 &ndash; May 2026</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                LOCATION
              </div>
              <div className="font-sans font-bold text-base">Yardley &amp; Warrington, PA</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                STATUS
              </div>
              <div className="font-sans font-bold text-base">Completed</div>
            </div>
          </aside>
        </PopIn>
      </div>

      {/* ═══ A Day on the Line ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            A Day on the Line
          </div>
        </PopIn>
        <div className="grid sm:grid-cols-2 gap-5">
          {dayInLife.map((d) => (
            <PopIn key={d.time} className="h-full">
              <div className="ink-card p-6 flex flex-col gap-2.5 h-full">
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full self-start">
                  {d.time}
                </span>
                <h3 className="font-sans font-extrabold text-lg tracking-[-0.02em] m-0">
                  {d.title}
                </h3>
                <p className="font-sans text-sm leading-[1.6] text-secondary m-0">{d.desc}</p>
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

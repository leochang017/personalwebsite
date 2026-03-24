import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

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
              <div className="w-20 h-20 rounded-xl bg-surface-light flex items-center justify-center overflow-hidden shrink-0 border border-border">
                <Image
                  src="/images/chipotle.png"
                  alt="Chipotle Mexican Grill"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Chipotle Mexican Grill
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg mt-1">
                  Team Member
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted font-mono">
                    Sep 2025 &ndash; Present
                  </span>
                  <span className="text-sm text-muted">Yardley & Warrington, PA</span>
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
                Working at Chipotle locations in Yardley and Warrington, PA, I deliver
                fast, friendly customer service in a high-volume environment that demands
                precision, speed, and teamwork every single shift.
              </p>
              <p>
                On any given day, I serve 200+ customers during peak lunch and dinner rushes,
                maintaining strict food safety and hygiene protocols across all stations.
                I coordinate closely with team members to ensure efficient shift transitions
                and manage time-sensitive tasks in high-volume conditions where every second
                counts.
              </p>
              <p>
                This role has sharpened my ability to stay calm under pressure, communicate
                clearly with a diverse team, and consistently deliver quality service even
                during the most demanding rushes.
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

        {/* A Day on the Line */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">
            A Day on the Line
          </h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {dayInLife.map((d) => (
            <StaggerItem key={d.time}>
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row gap-4">
                <div className="sm:w-28 shrink-0">
                  <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {d.time}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm mb-1">
                    {d.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-body">
                    {d.desc}
                  </p>
                </div>
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

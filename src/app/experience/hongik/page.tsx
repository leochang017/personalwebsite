import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hongik University — Leo Chang",
  description: "Research Intern in Prof. Eunsoo Choi's structural engineering lab at Hongik University (Aug 2026, Seoul). Shape memory alloy fibers in concrete.",
};

const achievements = [
  "Ran daily experiments alongside graduate students in one of the leading labs in its niche worldwide",
  "Built computer simulations analyzing test data from experiments I participated in",
  "Went from newcomer to running experiments alongside the lab's graduate students within four weeks",
  "Trained by the lab's graduate students on the delicate handling of fine SMA wire",
];

const skills = [
  "Materials Testing",
  "Data Analysis",
  "Simulation",
  "Lab Research",
  "Cross-Cultural Collaboration",
];

const projectPhases = [
  {
    phase: "01",
    title: "Learning the Science",
    desc: "Shape memory alloy is \"memory metal\": bend it, heat it, and it pulls itself back straight. The lab threads SMA fibers through concrete so that, buried inside, they clamp cracks closed after an earthquake.",
  },
  {
    phase: "02",
    title: "Hands-On Training",
    desc: "Started as the least experienced member of the lab; the graduate students trained me on the delicate technique of handling fine SMA wire.",
  },
  {
    phase: "03",
    title: "Daily Experiments",
    desc: "Joined the graduate students' daily group experiments, including mechanical testing of SMA wires and fibers, with results feeding the lab's ongoing research.",
  },
  {
    phase: "04",
    title: "Simulation & Analysis",
    desc: "Built computer simulations to analyze my own test data, and by the end of the internship was running experiments alongside the graduate students.",
  },
];

export default function HongikPage() {
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
        <LogoBanner src="/images/hongik.svg" alt="Hongik University" width={434} height={126} />
      </PopIn>

      {/* ═══ Header grid ═══ */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
        {/* Left column */}
        <div>
          <PopIn>
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="ink-chip ink-chip--completed">COMPLETED</span>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full">
                Structural Engineering
              </span>
            </div>
          </PopIn>
          <PopIn delay={0.06}>
            <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] m-0 mb-4">
              Hongik University
            </h1>
            <div className="font-sans font-bold text-lg md:text-[22px] mb-6">
              Research Intern, Prof. Eunsoo Choi&apos;s Structural Engineering Lab
            </div>
          </PopIn>
          <PopIn delay={0.12}>
            <div className="flex flex-col gap-4 max-w-[600px] mb-8">
              <p className="font-sans text-[17px] leading-[1.65] m-0">
                In August 2026 I spent four weeks in Prof. Eunsoo Choi&apos;s
                structural engineering lab at Hongik University in Seoul, one of the
                leading groups internationally in its niche: shape memory alloy fibers
                embedded in cementitious composites.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                The idea in plain terms: shape memory alloy is &quot;memory metal.&quot;
                Bend it and heat it, and it pulls itself back straight. The lab threads
                SMA fibers through concrete so that after an earthquake, the fibers buried
                inside clamp cracks closed. The applications are earthquake-resistant
                structures and self-healing concrete.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                I ran daily experiments with the graduate students, including mechanical
                testing of SMA wires and fibers, and built computer simulations analyzing
                my own test data. I arrived as the least experienced member of the group,
                and the graduate students trained me on the delicate work of handling
                fine SMA wire. By the end of the internship I was running experiments
                alongside them, with results feeding the lab&apos;s ongoing research.
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
              <div className="font-sans font-bold text-base">Aug 2026</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                LOCATION
              </div>
              <div className="font-sans font-bold text-base">Seoul, South Korea</div>
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
              <div className="font-sans font-bold text-base">SMA Fibers in Concrete</div>
            </div>
          </aside>
        </PopIn>
      </div>

      {/* ═══ Project Phases ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            The Four Weeks
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

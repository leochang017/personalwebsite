import type { Metadata } from "next";
import { LogoBanner } from "@/components/LogoBanner";
import { PopIn } from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zhongke Guoguang Quantum — Leo Chang",
  description: "AI/ML Intern at Zhongke Guoguang Quantum (Jul 2026, Beijing). Agent skills for QuantaMate and the company's bilingual production website.",
};

const achievements = [
  "Authored and tested agent skills that shipped in QuantaMate at its July 2026 commercial launch",
  "Stress-tested every skill and pinned down the specific conditions that made each one break",
  "Sole builder of the company's production bilingual English-Chinese website",
  "Built an interactive 3D model of the company's photonic chip for the site",
];

const skills = [
  "AI Agents",
  "Skill Authoring",
  "Stress Testing",
  "Web Development",
  "3D Web Graphics",
  "Bilingual Content",
];

const projectPhases = [
  {
    phase: "01",
    title: "Agent Skill Authoring",
    desc: "Wrote skills, modular capabilities that teach QuantaMate's AI agents new tasks, for the company's newly released research assistant for quantum researchers.",
  },
  {
    phase: "02",
    title: "Failure-Condition Testing",
    desc: "Stress-tested how reliably agents completed each skill, isolating the specific inputs and situations that made a skill break so engineers could fix the root cause.",
  },
  {
    phase: "03",
    title: "Bilingual Website Build",
    desc: "Built the company's production public website solo, in English and Chinese, shipping through a senior engineer's detailed daily code reviews.",
  },
  {
    phase: "04",
    title: "Interactive 3D Chip Model",
    desc: "Built an interactive 3D model of the company's photonic chip for the website's products page.",
  },
];

export default function GGQuantaPage() {
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
        <LogoBanner src="/images/ggquanta-logo.png" alt="Zhongke Guoguang Quantum" width={910} height={320} />
      </PopIn>

      {/* ═══ Header grid ═══ */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
        {/* Left column */}
        <div>
          <PopIn>
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="ink-chip ink-chip--completed">COMPLETED</span>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full">
                AI Agents &amp; Web
              </span>
            </div>
          </PopIn>
          <PopIn delay={0.06}>
            <h1 className="font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em] m-0 mb-4">
              Zhongke Guoguang Quantum
            </h1>
            <div className="font-sans font-bold text-lg md:text-[22px] mb-6">
              AI/ML Intern, Multi-Agent Systems &amp; Web
            </div>
          </PopIn>
          <PopIn delay={0.12}>
            <div className="flex flex-col gap-4 max-w-[600px] mb-8">
              <p className="font-sans text-[17px] leading-[1.65] m-0">
                In July 2026 I interned on-site in Beijing at Zhongke Guoguang Quantum
                (GGQuanta), China&apos;s first photonic quantum chip company.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                My main work was on QuantaMate, the company&apos;s AI research assistant for
                quantum researchers, which launched publicly on July 8, 2026. I wrote
                skills, modular capabilities that teach its agents new tasks, then
                stress-tested how reliably the agents completed them, tracking down the
                specific conditions that made each one break rather than just flagging
                that it did. The skills I wrote were test-verified and shipped in the
                commercial product.
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-secondary m-0">
                I was also the sole builder of the company&apos;s production public
                website, bilingual in English and Chinese, with an interactive 3D model of
                the chip, revised daily through a senior engineer&apos;s
                detailed code reviews until it met the bar to ship.
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
              <div className="font-sans font-bold text-base">Jul 2026</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1">
                LOCATION
              </div>
              <div className="font-sans font-bold text-base">Beijing, China</div>
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
              <div className="font-sans font-bold text-base">Agent Skills &amp; Website</div>
            </div>
          </aside>
        </PopIn>
      </div>

      {/* ═══ Project Phases ═══ */}
      <section className="mt-16">
        <PopIn>
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
            What I Worked On
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

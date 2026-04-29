import { FadeUp, SlideIn, ScaleIn, FadeIn } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { ParallaxBg } from "@/components/ParallaxSection";
import { FloatingDoodles, StickerPill } from "@/components/Doodles";
import Link from "next/link";
import Image from "next/image";

/* ────────────────────── DATA ────────────────────── */

const stats = [
  { target: 4, suffix: "", label: "Projects" },
  { target: 5, suffix: "", label: "Leadership Roles" },
  { target: 19, suffix: "+", label: "Awards" },
  { target: 580, suffix: "+", label: "Work Hrs" },
  { target: 660, suffix: "+", label: "Volunteer Hrs" },
];

const projects = [
  {
    title: "LLM Microgrid Agents",
    icon: "⚡",
    logo: "/images/rutgers.svg",
    status: "Upcoming",
    tech: ["Python", "Anthropic API", "Multi-Agent", "SvelteKit"],
    role: "Research with Prof. Yongfeng Zhang (Rutgers)",
    desc: "Studying whether populations of LLM agents — one per household — can negotiate peer-to-peer to allocate scarce energy during grid outages with fairness, robustness to incomplete info, and human-auditable explanations. Building a 20–50 household neighborhood simulator (NREL solar + Pecan Street loads) and benchmarking against centralized-optimal, round-robin, and no-coordination baselines.",
    href: "/projects",
    hideDetails: true,
  },
  {
    title: "Phase Spector",
    icon: "🎮",
    logo: "/images/gamepad-icon.svg",
    status: "Playable",
    tech: ["Godot 4", "GDScript"],
    role: "Game Developer",
    desc: "\"Rewind. Strike. Survive.\" Top-down wave-based arcade shooter with a unique time-rewind combat mechanic. 3 enemy types including multi-pattern mini-bosses, powerups & healing pickups, tiered chain-kill multiplier, projectile deflection, and a top-5 high score table. Available for 500+ PDS students.",
    href: "/projects/phasespector",
  },
  {
    title: "NapkinNotes",
    icon: "💡",
    logo: "/images/napkinnotes-logo.png",
    status: "Active",
    tech: ["Flask", "PostgreSQL", "Claude AI"],
    role: "Co-Founder",
    desc: "Full-stack AI-powered EdTech platform that turns handwritten and digital notes into study resources. OCR + Claude summarization, social layer with follows/comments/bookmarks, student marketplace with meetup scheduling, and test-driven auto-locking. 80+ regular users, 170+ uploaded notes.",
    href: "/projects/napkinnotes",
  },
  {
    title: "Stock ML",
    icon: "📈",
    logo: "/images/JEI.png",
    status: "Accepted for Publishing",
    tech: ["Python", "TensorFlow", "NLP"],
    role: "Lead Researcher",
    desc: "LSTM neural networks for stock price prediction using Twitter sentiment analysis. Accepted for publishing in the Journal of Emerging Investigators. Analyzed 80K+ tweets across AAPL, TSLA, MSFT.",
    href: "/projects/stockml",
  },
];

const experience = [
  {
    company: "Rutgers University",
    role: "Research Intern with Prof. Yongfeng Zhang",
    dates: "Apr 2026 — Present · Remote",
    desc: "Remote research internship with Prof. Yongfeng Zhang (Rutgers CS) on whether LLM-based multi-agent systems can coordinate residential microgrids during grid outages. Targeting publication at the ICLR Tackling Climate Change with ML workshop or NeurIPS Computational Sustainability.",
    skills: ["LLM Agents", "Multi-Agent Systems", "Python", "Research"],
    upcoming: true,
  },
  {
    company: "Zhongke Guoguang Quantum",
    role: "AI / ML Intern",
    dates: "Jun – Jul 2026 · Beijing",
    desc: "Upcoming internship at a Beijing quantum-tech firm (CAS-affiliated, founded 2021) specializing in continuous-variable quantum key distribution and quantum random number generation. Contributing AI/ML work to their quantum-comms research stack.",
    skills: ["Machine Learning", "Quantum Computing", "Research"],
    upcoming: true,
  },
  {
    company: "Nippon Lift Industry (Malaysia)",
    role: "Machine Learning Intern",
    dates: "Jul 2026 · Penang",
    desc: "Upcoming internship at a Penang-based elevator and escalator manufacturer (operating in 10+ countries) applying machine learning to operations — likely predictive maintenance, fault detection, or usage forecasting on lift telemetry.",
    skills: ["Machine Learning", "Industrial AI", "Python"],
    upcoming: true,
  },
  {
    company: "Hongik University",
    role: "Research Intern, Prof. Eunsoo Choi",
    dates: "Jul – Aug 2026 · Seoul",
    desc: "Upcoming research internship in Seoul on smart structural engineering — shape memory alloy materials and earthquake-resistant infrastructure under Prof. Eunsoo Choi (Civil Engineering, 5,800+ citations).",
    skills: ["Research", "Smart Materials", "Seismic Engineering"],
    upcoming: true,
  },
  {
    company: "Chipotle",
    role: "Team Member",
    dates: "Sep 2025 — May 2026",
    desc: "Fast-paced service environment building teamwork, time management, and customer-facing communication skills under high-volume conditions.",
    skills: ["Teamwork", "Time Management", "Customer Service"],
    active: false,
  },
  {
    company: "Mundial Financial",
    role: "Intern, Investment Banking",
    dates: "Jul — Sep 2025",
    desc: "Designed and built client-facing web pages, implemented responsive layouts, and contributed to digital strategy for a growing financial services firm.",
    skills: ["React", "Web Dev", "UI/UX", "Figma"],
    active: false,
  },
  {
    company: "Achievable",
    role: "Content Marketing Intern",
    dates: "Jul — Oct 2024",
    desc: "Authored SEO-optimized blog posts and marketing content for an EdTech startup, driving organic traffic and improving search rankings for test-prep products.",
    skills: ["SEO", "Content Strategy", "Marketing"],
    active: false,
  },
  {
    company: "Capital Health",
    role: "Junior Volunteer",
    dates: "Jul — Aug 2024",
    desc: "Completed 66+ hours assisting hospital staff, supporting patient comfort, and gaining firsthand exposure to healthcare operations and empathy-driven service.",
    skills: ["Healthcare", "Volunteering", "66+ Hours"],
    active: false,
  },
];

const leadership = [
  {
    org: "Ti-Ratana Welfare Society",
    role: "Director, Orphanage Ed. Program",
    highlight: "600+ hours, 5+ years",
    desc: "Directing educational outreach at Ti-Ratana Welfare Society, a charitable welfare organization in Malaysia. Led a community fundraiser raising $8,000 for e-learning tools and providing weekly Zoom lessons to children in their care over 5+ years of continuous service.",
  },
  {
    org: "ObCHESSed (Princeton Day School Chess Club)",
    role: "Co-Founder",
    highlight: "40+ members",
    desc: "Co-founded and grew a competitive chess community from the ground up, organizing weekly sessions, tournaments, and mentorship for beginners.",
  },
  {
    org: "The Spokesman",
    role: "Editor in Chief",
    highlight: "11 editors, 36 writers",
    desc: "Leading a team of 11 editors and managing 36 writers, artists, and photographers for the school newspaper across print and digital formats.",
  },
  {
    org: "Science Olympiad",
    role: "Team Member & MS Co-head",
    highlight: "3rd Regionals, 5th States",
    desc: "Competing on the varsity team, earning 3rd at Regionals and 5th/6th at NJ State Finals in Helicopter and Electric Vehicle. Co-heading the Middle School team as a mentor.",
  },
  {
    org: "Varsity Fencing",
    role: "Varsity Athlete",
    highlight: "2nd Place Regional",
    desc: "Key player since 9th grade, competing for four consecutive years. 2nd place NJSIAA Regionals (individual and team), qualified for NJ State Final. Fencing since age 6.",
  },
];

const competitions = [
  { place: "1st", name: "PClassic — UPenn", detail: "Programming, Fall 2024" },
  { place: "1st", name: "USA Dance National DanceSport Champion", detail: "Junior & Youth Pre Champ, Sophomore 2024" },
  { place: "2nd", name: "NJSIAA Fencing", detail: "NJSIAA Regionals, 2025" },
  { place: "4th", name: "Economics Challenge", detail: "NEC, 2024" },
  { place: "5th/6th", name: "Science Olympiad States", detail: "Helicopter & Electric Vehicle, NJ States 2025" },
];

const honors = [
  { icon: "✒️", title: "PYAA Gold Award", sub: "Short Story — \"Dear Lao-Lao\", 2026" },
];

/* ────────────────────── PAGE ────────────────────── */

export default function Home() {
  return (
    <main>
      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        {/* Floating hand-drawn doodles (Al Murphy / La Puce style) */}
        <FloatingDoodles />

        {/* soft accent glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-accent/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full bg-sticker-mint/10 blur-2xl"
        />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
            {/* Left: Text */}
            <div className="md:w-1/2 shrink-0">
              <FadeUp>
                <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-muted mb-4">
                  Hey there —
                </p>
                <h1 className="font-sans font-black text-foreground leading-[0.9] tracking-tight mb-8 max-w-3xl">
                  <span className="block text-5xl sm:text-6xl lg:text-7xl">I&apos;m</span>
                  <span className="block text-6xl sm:text-7xl lg:text-[6.5rem] mt-2">
                    <StickerPill color="var(--color-sticker-pink)" rotate={-3} className="inline-block px-8 py-2">
                      <span className="font-sans font-black text-foreground">Leo</span>
                    </StickerPill>
                  </span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl mt-4">Chang.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex items-center gap-3 mb-8 flex-wrap">
                  <StickerPill color="var(--color-sticker-yellow)" rotate={2} className="text-xs font-bold uppercase tracking-wider">
                    Junior @ PDS
                  </StickerPill>
                  <StickerPill color="var(--color-sticker-mint)" rotate={-2} className="text-xs font-bold uppercase tracking-wider">
                    Builder
                  </StickerPill>
                  <StickerPill color="var(--color-sticker-blue)" rotate={3} className="text-xs font-bold uppercase tracking-wider">
                    Researcher
                  </StickerPill>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <p className="text-lg text-secondary leading-relaxed mb-10 max-w-lg font-body">
                  Making AI tools, building games, researching markets, and competing in between. Feel free to explore.
                </p>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div className="flex gap-3 flex-wrap mb-16">
                  <Link
                    href="/projects"
                    className="px-7 py-3 rounded-full bg-foreground text-background text-sm font-bold no-underline hover:bg-accent hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                  >
                    View Projects →
                  </Link>
                  <Link
                    href="/about"
                    className="px-7 py-3 rounded-full border-2 border-foreground text-foreground text-sm font-bold no-underline hover:bg-foreground hover:text-background transition-all"
                  >
                    About Me
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right: Photo in rounded sticker frame */}
            <SlideIn direction="right" delay={0.2}>
              <div className="relative shrink-0">
                <div className="w-full rounded-[2rem] overflow-hidden border-[3px] border-foreground shadow-[8px_8px_0_0_var(--color-foreground)] rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/Leo.jpeg"
                    alt="Leo Chang"
                    width={600}
                    height={338}
                    className="w-full h-auto"
                  />
                </div>
                {/* corner sticker */}
                <div className="absolute -top-5 -right-5 z-10">
                  <StickerPill color="var(--color-accent)" rotate={12} className="text-xs font-bold uppercase tracking-wider">
                    Available ✦
                  </StickerPill>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* stats with CountUp */}
          <FadeUp delay={0.6}>
            <div className="flex gap-10 flex-wrap mt-14">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="block font-sans text-3xl font-black text-foreground">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </span>
                  <span className="block text-xs text-muted uppercase tracking-wider mt-1 font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ 4. FEATURED PROJECTS ═══════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex justify-between items-end mb-14">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-2">
                  Portfolio
                </p>
                <h2 className="font-sans text-3xl font-black tracking-tight mb-2">
                  Featured Projects
                </h2>
                <p className="text-muted text-sm font-body">
                  What I&apos;ve been building lately
                </p>
              </div>
              <Link
                href="/projects"
                className="text-accent text-sm font-semibold no-underline hover:underline hidden sm:block"
              >
                All projects →
              </Link>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.12}>
                <Link href={p.href} className="no-underline block h-full">
                  <TiltCard className="h-full group">
                    <div className={`${p.status === "Upcoming" ? "card-upcoming " : ""}bg-surface rounded-2xl p-7 border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full cursor-pointer`}>
                      <div className="flex justify-between items-start mb-5">
                        {p.logo.startsWith("/") ? (
                          <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden p-1.5">
                            <Image src={p.logo} alt={p.title} width={32} height={32} className="object-contain" />
                          </div>
                        ) : (
                          <span className="text-3xl">{p.logo}</span>
                        )}
                        <span className={`sticker-chip ${
                          p.status === "Upcoming" ? "sticker-chip--red" :
                          p.status === "Active" ? "sticker-chip--mint" : "sticker-chip--yellow"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <h3 className="font-sans text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-clay font-semibold mb-3">
                        {p.role}
                      </p>
                      <p className="text-sm text-muted leading-relaxed mb-6 flex-1 font-body">
                        {p.desc}
                      </p>
                      <div className="flex gap-1.5 flex-wrap mb-4">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-surface-light text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {!p.hideDetails && (
                        <span className="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more →
                        </span>
                      )}
                    </div>
                  </TiltCard>
                </Link>
              </FadeUp>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/projects"
              className="text-accent text-sm font-semibold no-underline hover:underline"
            >
              All projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5. EXPERIENCE ═══════════════════ */}
      <section className="py-28 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-2">Career</p>
            <h2 className="font-sans text-3xl font-black tracking-tight mb-14">Experience</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-5">
            {experience.map((exp, i) => (
              <FadeUp key={exp.company} delay={i * 0.1}>
                <div className={`${exp.upcoming ? "card-upcoming " : ""}bg-background rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-md transition-all h-full flex flex-col`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-wider">{exp.dates}</span>
                    {exp.upcoming ? (
                      <span className="sticker-chip sticker-chip--red">Upcoming</span>
                    ) : exp.active && (
                      <span className="sticker-chip sticker-chip--mint">Active</span>
                    )}
                  </div>
                  <h3 className="font-sans text-lg font-bold mb-0.5">{exp.company}</h3>
                  <p className="text-sm font-semibold text-accent mb-3">{exp.role}</p>
                  <p className="text-sm text-muted leading-relaxed font-body mb-4 flex-1">{exp.desc}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {exp.skills.map((s) => (
                      <span key={s} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-accent/8 text-accent">{s}</span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 6. LEADERSHIP ═══════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-sage mb-2 text-center">
              Impact
            </p>
            <h2 className="font-sans text-3xl font-black tracking-tight mb-14 text-center">
              Leadership &amp; Service
            </h2>
          </FadeUp>

          {/* First row: 2 cards centered */}
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-5">
            {leadership.slice(0, 2).map((l, i) => (
              <SlideIn key={l.org} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                <div className="bg-surface rounded-2xl p-7 border border-border hover:border-olive/40 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 flex-wrap max-w-[70%]">
                      <h3 className="font-sans text-base font-bold leading-snug">{l.org}</h3>
                      <span className="sticker-chip sticker-chip--mint">Active</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sage bg-olive/8 px-2.5 py-1 rounded-full shrink-0">{l.role}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed font-body flex-1 mb-4">{l.desc}</p>
                  <p className="text-xs font-bold text-olive">{l.highlight}</p>
                </div>
              </SlideIn>
            ))}
          </div>
          {/* Second row: 3 cards */}
          <div className="grid sm:grid-cols-3 gap-5">
            {leadership.slice(2).map((l, i) => (
              <SlideIn key={l.org} direction={i % 2 === 0 ? "left" : "right"} delay={(i + 2) * 0.08}>
                <div className="bg-surface rounded-2xl p-7 border border-border hover:border-olive/40 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 flex-wrap max-w-[70%]">
                      <h3 className="font-sans text-base font-bold leading-snug">{l.org}</h3>
                      <span className="sticker-chip sticker-chip--mint">Active</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sage bg-olive/8 px-2.5 py-1 rounded-full shrink-0">{l.role}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed font-body flex-1 mb-4">{l.desc}</p>
                  <p className="text-xs font-bold text-olive">{l.highlight}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 7. ACHIEVEMENTS ═══════════════════ */}
      <section className="py-28 px-6 bg-surface/50 relative">
        <ParallaxBg className="bg-accent/[0.02] rounded-[40%] w-[500px] h-[500px] -top-20 -right-20" speed={0.2} />
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-2">
                  Achievements
                </p>
                <h2 className="font-sans text-3xl font-black tracking-tight">
                  Awards & Recognition
                </h2>
              </div>
              <Link href="/achievements" className="text-accent text-sm font-semibold no-underline hover:underline hidden sm:block">
                View all →
              </Link>
            </div>
          </FadeUp>

          {/* Combined grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...competitions.map(c => ({ type: "comp" as const, ...c })), ...honors.map(h => ({ type: "honor" as const, ...h }))].map((item, i) => (
              <SlideIn key={`${item.type}-${i}`} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.04}>
                <TiltCard className="h-full group">
                  <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-accent/30 transition-all h-full">
                    {item.type === "comp" ? (
                      <span className={`w-11 h-11 rounded-xl bg-accent/10 text-accent font-sans font-black flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-background transition-colors ${item.place && item.place.length > 3 ? "text-[9px]" : "text-sm"}`}>
                        {item.place}
                      </span>
                    ) : (
                      <span className="w-11 h-11 rounded-xl bg-olive/10 flex items-center justify-center shrink-0 text-olive">
                        <Image src="/images/star-icon.svg" alt="" width={20} height={20} className="w-5 h-5 opacity-60" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-sans font-bold text-sm truncate">{item.type === "comp" ? item.name : item.title}</h4>
                      <p className="text-xs text-muted truncate">{item.type === "comp" ? item.detail : item.sub}</p>
                    </div>
                  </div>
                </TiltCard>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 8. CALL TO ACTION ═══════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Get in touch
            </p>
            <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight mb-10">
              Let&apos;s connect
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:leochang017@gmail.com"
                className="px-8 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold no-underline hover:bg-accent transition-colors"
              >
                leochang017@gmail.com
              </a>
              <a
                href="/images/LeoChangResume_May2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-border text-foreground text-sm font-semibold no-underline hover:border-accent hover:text-accent transition-colors"
              >
                Download Resume
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

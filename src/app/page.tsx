import { FadeUp, SlideIn, ScaleIn, FadeIn } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { ParallaxBg } from "@/components/ParallaxSection";
import Link from "next/link";
import Image from "next/image";

/* ────────────────────── DATA ────────────────────── */

const stats = [
  { target: 3, suffix: "", label: "Projects" },
  { target: 5, suffix: "", label: "Leadership Roles" },
  { target: 17, suffix: "+", label: "Awards" },
  { target: 580, suffix: "+", label: "Work Hrs" },
  { target: 660, suffix: "+", label: "Volunteer Hrs" },
];

const projects = [
  {
    title: "Phase Spector",
    icon: "🎮",
    logo: "/images/gamepad-icon.svg",
    status: "Playable",
    tech: ["Godot 4", "GDScript"],
    role: "Game Developer",
    desc: "Top-down wave-based arcade shooter with a unique time-rewind combat mechanic. Features 3 enemy types, score multiplier system, projectile deflection, and dynamic difficulty scaling. Available for 500+ PDS students.",
    href: "/projects/phasespector",
  },
  {
    title: "NapkinNotes",
    icon: "💡",
    logo: "/images/napkinnotes-logo.png",
    status: "Active",
    tech: ["React", "Flask", "AI"],
    role: "Co-Founder",
    desc: "Full-stack AI-powered EdTech platform that transforms handwritten and digital notes into study resources. Features OCR, Claude AI summarization, social features, and admin panel. Serving 500+ PDS students.",
    href: "/projects/napkinnotes",
  },
  {
    title: "Stock ML",
    icon: "📈",
    logo: "/images/JEI.png",
    status: "Published",
    tech: ["Python", "TensorFlow", "NLP"],
    role: "Lead Researcher",
    desc: "LSTM neural networks for stock price prediction using Twitter sentiment analysis. Published in the Journal of Emerging Investigators. Analyzed 80K+ tweets across AAPL, TSLA, MSFT.",
    href: "/projects/stockml",
  },
];

const experience = [
  {
    company: "Chipotle",
    role: "Team Member",
    dates: "Sep 2025 — Present",
    desc: "Fast-paced service environment building teamwork, time management, and customer-facing communication skills under high-volume conditions.",
    skills: ["Teamwork", "Time Management", "Customer Service"],
  },
  {
    company: "Mundial Financial",
    role: "Intern, Investment Banking",
    dates: "Jul — Sep 2025",
    desc: "Designed and built client-facing web pages, implemented responsive layouts, and collaborated with the CEO on digital strategy for a growing financial services firm.",
    skills: ["React", "Web Dev", "UI/UX", "Figma"],
  },
  {
    company: "Achievable",
    role: "Content Marketing Intern",
    dates: "Jul — Oct 2024",
    desc: "Authored SEO-optimized blog posts and marketing content for an EdTech startup, driving organic traffic and improving search rankings for test-prep products.",
    skills: ["SEO", "Content Strategy", "Marketing"],
  },
  {
    company: "Capital Health",
    role: "Junior Volunteer",
    dates: "Jul — Aug 2024",
    desc: "Completed 66+ hours assisting hospital staff, supporting patient comfort, and gaining firsthand exposure to healthcare operations and empathy-driven service.",
    skills: ["Healthcare", "Volunteering", "66+ Hours"],
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
    org: "ObCHESSed Chess Club",
    role: "Co-Founder",
    highlight: "20+ members",
    desc: "Co-founded and grew a competitive chess community from the ground up, organizing weekly sessions, tournaments, and mentorship for beginners.",
  },
  {
    org: "The Spokesman",
    role: "Editor in Chief",
    highlight: "3+ years",
    desc: "Managing editorial direction, mentoring writers, and overseeing publication of the school newspaper across print and digital formats.",
  },
  {
    org: "Science Olympiad",
    role: "Team Member & MS Co-head",
    highlight: "State-level",
    desc: "Competing on the varsity Science Olympiad team at regionals and states, while separately co-heading the Middle School Science Olympiad team as a mentor.",
  },
  {
    org: "Varsity Fencing",
    role: "Varsity Athlete",
    highlight: "2nd Place Regional",
    desc: "Competing at the varsity level since age 6, earning regional placement and developing discipline, strategy, and competitive resilience.",
  },
];

const competitions = [
  { place: "1st", name: "PClassic — UPenn", detail: "Programming, Fall 2024" },
  { place: "1st", name: "Ballroom Dance National", detail: "USA Dance, Sophomore 2024" },
  { place: "Finalist", name: "Ballroom Dance National", detail: "USA Dance, Freshman 2023" },
  { place: "Finalist", name: "Ballroom Dance National", detail: "USA Dance, Junior 2025" },
  { place: "2nd", name: "NJSIAA Fencing", detail: "NJSIAA Regionals, 2025" },
  { place: "3rd", name: "Science Olympiad", detail: "Helicopter, Regionals 2025 & 2026" },
  { place: "4th", name: "Economics Challenge", detail: "NEC, 2024" },
  { place: "3rd", name: "HackBac Hackathon", detail: "Social justice, 2024" },
  { place: "2nd", name: "NJSIAA Team Fencing", detail: "Regional Team, 2025" },
];

const honors = [
  { icon: "📄", title: "Published Research", sub: "Journal of Emerging Investigators, 2025" },
  { icon: "✒️", title: "Scholastic Silver Key", sub: "Poetry — \"Legacy\", 2024" },
  { icon: "📖", title: "White Enso Journal", sub: "Published \"Snow Haiku\", 2024" },
  { icon: "📝", title: "Creative Communications", sub: "Published poetry, 2024" },
  { icon: "🎓", title: "Dual Enrollment", sub: "Latin 4, College credit, 2025" },
  { icon: "🏅", title: "Science Olympiad States", sub: "5th Place (2025), 6th Place (2026)" },
];

const testimonials = [
  {
    quote:
      "Leo was a valuable member of our team. He excelled at creating high-quality, information-rich blog posts that were well-researched and informative. Best of all, Leo was a pleasure to work with.",
    name: "Tyler York",
    role: "Founder & CEO, Achievable",
    avatar: "/images/tyleryork.jpeg",
  },
  {
    quote:
      "I want to commend Leo for the outstanding work he did. His dedication, hard work, and eagerness to learn were evident throughout. His work showcased both his technical skills and ability to translate what he learned into practical results.",
    name: "Charles Smulevitz",
    role: "CEO, Mundial Financial",
    initials: "CS",
  },
];

/* ────────────────────── PAGE ────────────────────── */

export default function Home() {
  return (
    <main>
      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* decorative accent circle */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-accent/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-2xl"
        />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
            {/* Left: Text */}
            <div className="md:w-1/2 shrink-0">
              <FadeUp>
                <h1 className="font-sans text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-foreground leading-[0.95] tracking-tight mb-6 max-w-3xl">
                  Hello! I&apos;m Leo
                </h1>
              </FadeUp>

              <FadeUp delay={0.15}>
                <p className="text-lg text-secondary leading-relaxed mb-10 max-w-lg font-body">
                  Junior at Princeton Day School. Feel free to explore my website.
                </p>
              </FadeUp>

              <FadeUp delay={0.35}>
                <div className="flex gap-3 flex-wrap mb-20">
                  <Link
                    href="/projects"
                    className="px-7 py-3 rounded-full bg-foreground text-background text-sm font-semibold no-underline hover:bg-accent transition-colors"
                  >
                    View Projects
                  </Link>
                  <Link
                    href="/about"
                    className="px-7 py-3 rounded-full border border-border text-foreground text-sm font-semibold no-underline hover:border-accent hover:text-accent transition-colors"
                  >
                    About Me
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right: Photo */}
            <SlideIn direction="right" delay={0.2}>
              <div className="relative shrink-0">
                <div className="w-full rounded-2xl overflow-hidden border-2 border-border shadow-xl shadow-accent/10 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/Leo.jpeg"
                    alt="Leo Chang"
                    width={600}
                    height={338}
                    className="w-full h-auto"
                  />
                </div>
                <div aria-hidden className="absolute -inset-3 rounded-2xl border border-accent/20 -z-10 -rotate-2" />
              </div>
            </SlideIn>
          </div>

          {/* stats with CountUp */}
          <FadeUp delay={0.45}>
            <div className="flex gap-10 flex-wrap mt-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="block font-sans text-3xl font-black text-foreground">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </span>
                  <span className="block text-xs text-muted uppercase tracking-wider mt-1">
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

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.12}>
                <Link href={p.href} className="no-underline block h-full">
                  <TiltCard className="h-full group">
                    <div className="bg-surface rounded-2xl p-7 border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                      <div className="flex justify-between items-start mb-5">
                        {p.logo.startsWith("/") ? (
                          <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden p-1.5">
                            <Image src={p.logo} alt={p.title} width={32} height={32} className="object-contain" />
                          </div>
                        ) : (
                          <span className="text-3xl">{p.logo}</span>
                        )}
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/8 px-2.5 py-1 rounded-full">
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
                      <span className="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more →
                      </span>
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
                <div className="bg-background rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-md transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-wider">{exp.dates}</span>
                    {exp.company === "Chipotle" && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wider">Active</span>
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
                    <h3 className="font-sans text-base font-bold leading-snug max-w-[70%]">{l.org}</h3>
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
                    <h3 className="font-sans text-base font-bold leading-snug max-w-[70%]">{l.org}</h3>
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
                        <img src="/images/star-icon.svg" alt="" className="w-5 h-5 opacity-60" />
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

      {/* ═══════════════════ 8. TESTIMONIALS ═══════════════════ */}
      <section className="py-28 px-6 relative">
        <ParallaxBg className="bg-olive/[0.03] rounded-full w-[400px] h-[400px] bottom-0 -left-20" speed={0.15} />
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-2 text-center">
              References
            </p>
            <h2 className="font-sans text-3xl font-black tracking-tight mb-14 text-center">
              What People Say
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <ScaleIn key={t.name} delay={i * 0.12}>
                <TiltCard className="h-full group">
                  <div className="bg-surface rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <p className="text-sm text-secondary leading-relaxed italic mb-6 font-body border-l-2 border-accent/30 pl-4 flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      {t.avatar ? (
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center font-bold text-xs text-muted">
                          {t.initials}
                        </div>
                      )}
                      <div>
                        <strong className="block text-sm">{t.name}</strong>
                        <span className="text-xs text-muted">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 9. CALL TO ACTION ═══════════════════ */}
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
                href="/images/LeoChangResumeMarch2026.pdf"
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
      {/* Chatbot */}
      <div id="chatbot-mount" />
    </main>
  );
}

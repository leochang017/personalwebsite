import type { Metadata } from "next";
import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem, CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { StickerPill } from "@/components/Doodles";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experience — Leo Chang",
  description: "Work positions, leadership roles, and volunteer commitments across education, finance, healthcare, and athletics.",
};

const experiences = [
  {
    company: "Rutgers University",
    role: "Research Intern with Prof. Yongfeng Zhang",
    period: "Apr 2026 – Present",
    location: "Remote",
    upcoming: true,
    desc: "Remote research internship with Prof. Yongfeng Zhang (Rutgers CS) on whether LLM-based multi-agent systems can coordinate residential microgrids during grid outages. Reframing a mature power-systems problem as a CS/ML question: do natural-language agents — with their ability to reason about novel situations and explain decisions — close the gap classical distributed controllers leave around fairness, partial information, and human auditability? Targeting publication at the ICLR Tackling Climate Change with ML workshop or NeurIPS Computational Sustainability.",
    achievements: [
      "Building a discrete-time neighborhood simulator (20–50 households, NREL solar data, Pecan Street load profiles)",
      "Designing per-household LLM agents that negotiate peer-to-peer in natural language using Anthropic tool use",
      "Authoring a benchmark suite of stress scenarios — multi-day outages, vulnerable households, defector agents that lie about battery state, heterogeneous LLMs",
      "Comparing against centralized-optimal LP, round-robin sharing, and no-coordination baselines",
    ],
    logo: "/images/rutgers.svg",
    tags: ["LLM Agents", "Multi-Agent Systems", "Python", "Anthropic API", "Climate ML", "Research"],
  },
  {
    company: "Zhongke Guoguang Quantum",
    role: "AI / ML Intern",
    period: "Jun – Jul 2026",
    location: "Beijing, China",
    upcoming: true,
    desc: "Upcoming AI / ML internship at Beijing Zhongke Guoguang Quantum Technology Co., Ltd. — a 2021-founded quantum-tech company affiliated with the Chinese Academy of Sciences (中科 = Zhongke), based in Beijing E-Town. The company specializes in continuous-variable quantum key distribution (CVQKD) and quantum random number generation, with 26 patents. Specific scope is being finalized; will contribute machine-learning work to their quantum-communications research stack.",
    achievements: [
      "AI/ML at the intersection of quantum communication and classical post-processing",
      "Exposure to a CAS-affiliated research lab working on CVQKD and quantum RNG",
      "International research experience in Beijing's E-Town tech corridor",
    ],
    logo: "/images/zhongke-quantum.svg",
    tags: ["Machine Learning", "Quantum Computing", "Cryptography", "Research"],
  },
  {
    company: "Hongik University",
    role: "Research Intern, Prof. Eunsoo Choi",
    period: "Jul – Aug 2026",
    location: "Seoul, South Korea",
    upcoming: true,
    desc: "Upcoming research internship with Prof. Eunsoo Choi (Civil Engineering, 5,800+ citations) at Hongik University. Prof. Choi's lab works on smart structural engineering — shape memory alloy (SMA) materials for retrofitting reinforced concrete structures, smart dampers for earthquake-resistant infrastructure, and seismic engineering. Will be contributing to ongoing experimental and computational work on smart materials for civil infrastructure.",
    achievements: [
      "Research with a tenured Civil Engineering faculty in Seoul",
      "Working on shape memory alloys and smart-damper systems for earthquake retrofit",
      "Cross-disciplinary exposure to materials science, structural dynamics, and seismic engineering",
    ],
    logo: "/images/hongik.svg",
    tags: ["Research", "Smart Materials", "Seismic Engineering", "Civil Engineering"],
  },
  {
    company: "Chipotle Mexican Grill",
    role: "Team Member",
    period: "Sep 2025 – May 2026",
    location: "Yardley & Warrington, PA",
    active: false,
    href: "/experience/chipotle",
    desc: "Delivered fast, friendly customer service in a high-volume restaurant environment from Sep 2025 to May 2026. Collaborated with a team to maintain food safety standards, ensure quality preparation, and keep operations running smoothly during peak hours. Consistently met time targets while upholding Chipotle's commitment to food with integrity.",
    achievements: [
      "Serve 200+ customers daily during peak lunch and dinner rushes",
      "Maintain strict food safety and hygiene protocols across all stations",
      "Coordinate with team members for efficient shift transitions",
      "Manage time-sensitive tasks in a fast-paced environment",
    ],
    logo: "/images/chipotle.png",
    tags: ["Customer Service", "Teamwork", "Food Safety", "Time Management", "Operations"],
  },
  {
    company: "Mundial Financial Group",
    role: "Intern, Investment Banking",
    period: "Jul – Sep 2025",
    location: "Remote",
    active: false,
    href: "/experience/mundial",
    desc: "Led a complete website redesign for a financial services firm, translating business requirements into a professional, modern web presence. Conducted in-depth industry analysis to benchmark against competitors and authored web content that positioned the company as an authority in their space.",
    achievements: [
      "Conducted comprehensive industry website analysis across 10+ competitor sites",
      "Authored web content and copy for all major site pages",
      "Managed social media strategy and content calendar",
      "Performed financial research to inform marketing content",
    ],
    impact: "Website Redesign",
    logo: "/images/mundiallogo3.png",
    tags: ["Web Design", "Content Writing", "SEO", "Social Media"],
  },
  {
    company: "Achievable, Inc.",
    role: "Content Marketing Intern",
    period: "Jul – Oct 2024",
    location: "Remote",
    active: false,
    href: "/experience/achievable",
    desc: "Created high-quality educational content for Achievable, an EdTech startup specializing in test prep. Worked independently to research, write, and publish blog posts that drove organic traffic and reinforced the brand's authority in the education space.",
    achievements: [
      "Authored 15+ high-quality blog posts on test prep topics",
      "Conducted independent research on exam trends and study strategies",
      "Wrote guest posts published on external partner sites",
      "Demonstrated strong remote work autonomy and self-direction",
    ],
    impact: "15+ Articles",
    logo: "/images/achievable-logo.png",
    tags: ["Content Marketing", "Research", "Brand Building"],
  },
  {
    company: "Capital Health",
    role: "Junior Volunteer",
    period: "Jul – Aug 2024",
    location: "Trenton, NJ",
    active: false,
    href: "/experience/capitalhealth",
    desc: "Completed 66+ hours of hands-on volunteer work in a hospital setting, rotating through multiple departments and patient-facing programs. Gained firsthand experience in healthcare operations while providing comfort and support to patients and staff.",
    achievements: [
      "Rotated through Nursing Unit support roles",
      "Assisted with Comfort Cart, Book Cart, Tea Cart, and Art Cart programs",
      "Organized patient files and performed data entry tasks",
      "Prepared discharge packets for departing patients",
    ],
    impact: "66+ Hours",
    logo: "/images/capitalhealth2.jpg",
    tags: ["Patient Care", "Data Entry", "Healthcare"],
  },
];

const leadership = [
  {
    title: "Ti-Ratana Welfare Society",
    role: "Director of Orphanage Educational Program",
    period: "2020 – Present",
    hours: "600+",
    active: true,
    href: "/experience/tiratana",
    desc: "Lead a remote education initiative providing weekly Zoom lessons to children at the Ti-Ratana Welfare Society, a charitable welfare organization in Kuala Lumpur, Malaysia. Led a community fundraiser raising $8,000 for e-learning tools including a projector, laptop, and microphone. The program was featured in a local Malaysian newspaper for its community impact.",
    highlights: ["Weekly Zoom lessons for children", "$8,000 fundraiser for e-learning tools", "Featured in Malaysian newspaper"],
    logo: "/images/orphanagelogo.png",
    image: "/images/Orphanage.jpg",
  },
  {
    title: "ObCHESSed (Princeton Day School Chess Club)",
    role: "Co-Founder",
    period: "Sep 2025 – Present",
    hours: null,
    active: true,
    href: "/experience/obchessed",
    desc: "Founded and lead a chess club at Princeton Day School with 40+ active members. Organize weekly tactics sessions, host in-school tournaments, and create an inclusive environment welcoming players of all skill levels from beginners to competitive players.",
    highlights: ["40+ active members", "Weekly tactics sessions", "All skill levels welcome"],
    logo: "/images/chess-icon.svg",
    isSvg: true,
    image: "/images/chess2.png",
  },
  {
    title: "The Spokesman",
    role: "Editor in Chief",
    period: "Sep 2023 – Present",
    hours: null,
    active: true,
    href: "/experience/spokesman",
    website: "https://thespokesman.net",
    desc: "Rose through the ranks from Associate Editor to Online Editor to Editor in Chief of the school newspaper. Lead a team of 11 editors and manage 36 writers, artists, and photographers, overseeing all editorial content across print and digital platforms.",
    highlights: ["Associate Editor → Online Editor → EIC", "11 editors, 36 writers/artists/photographers", "Full editorial oversight"],
    logo: "/images/spokesman-logo-alt.png",
    logoSize: 200,
    invertLogo: false,
    image: null,
  },
  {
    title: "Science Olympiad",
    role: "Team Member & MS Co-head",
    period: "Sep 2023 – Present",
    hours: null,
    active: true,
    href: "/experience/scioly",
    desc: "Compete on the varsity Science Olympiad team in engineering events (Helicopter, Electric Vehicle) at the regional and state level. Earned 3rd in Helicopter at Regionals (2025, 2026), 5th in Helicopter and 6th in Electric Vehicle at NJ State Finals. Co-head the Middle School Science Olympiad team, creating practice tests and mentoring younger students.",
    highlights: ["3rd Regionals / 5th & 6th States", "Helicopter & Electric Vehicle", "MS team co-head"],
    logo: "/images/scioly.jpeg",
    image: "/images/scienceolympiad.png",
  },
  {
    title: "Varsity Fencing",
    role: "Varsity Athlete",
    period: "2023 – Present",
    hours: null,
    active: true,
    href: "/experience/fencing",
    desc: "Key player on the varsity fencing team since 9th grade, competing for four consecutive years. Earned 2nd place at NJSIAA Regionals (individual and team) and qualified for the NJ State Final. Competitive saber fencing since age 6 with over a decade of experience.",
    highlights: ["2nd Place Regional (Individual & Team)", "NJ State Final qualifier", "Fencing since age 6"],
    logo: "/images/njsiaa.jpg",
    isSvg: false,
    image: "/images/Fencing.jpg",
  },
];

export default function ExperiencePage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
              Experience
            </h1>
            <StickerPill color="var(--color-sticker-mint)" rotate={-4} className="text-xs font-bold uppercase tracking-wider wobble-slow">
              580+ Hrs
            </StickerPill>
          </div>
          <p className="text-muted text-lg md:text-xl mb-10 font-body max-w-2xl">
            Professional internships, work experience, and leadership roles that
            have shaped my skills and perspective.
          </p>
        </FadeUp>

        {/* Stats Bar */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: 8, suffix: "", label: "Work Positions" },
              { value: 580, suffix: "+", label: "Work Hours" },
              { value: 660, suffix: "+", label: "Volunteer Hours" },
              { value: 4, suffix: "", label: "Countries" },
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

        {/* Section Title */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Work Experience
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        {/* Experience Timeline */}
        <StaggerList className="relative space-y-8 mb-24">
          {experiences.map((e) => (
            <StaggerItem key={e.company}>
              <TiltCard className="h-full">
              <div className={`${e.upcoming ? "card-upcoming " : ""}sticker-card-surface rounded-2xl p-8 md:p-10 hover:border-accent/30 transition-all relative`}>
                {/* Header */}
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                    <Image
                      src={e.logo}
                      alt={e.company}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-sans text-xl font-bold">
                        {e.company}
                      </h3>
                      {e.upcoming ? (
                        <span className="sticker-chip sticker-chip--red">
                          Upcoming
                        </span>
                      ) : e.active && (
                        <span className="sticker-chip sticker-chip--mint">
                          Active
                        </span>
                      )}
                      {e.impact && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                          {e.impact}
                        </span>
                      )}
                    </div>
                    <p className="text-accent font-semibold text-sm mt-0.5">
                      {e.role}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted font-mono">
                        {e.period}
                      </span>
                      <span className="text-xs text-muted">
                        {e.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-secondary leading-relaxed mb-5 font-body">
                  {e.desc}
                </p>

                {/* Achievements */}
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-olive uppercase tracking-wider mb-3 font-sans">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {e.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2 text-sm text-muted font-body"
                      >
                        <span className="text-accent mt-1 shrink-0">
                          &bull;
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags + Link */}
                <div className="flex gap-2 flex-wrap items-center">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-surface-light text-muted border border-border"
                    >
                      {t}
                    </span>
                  ))}
                  {e.href && (
                    <Link href={e.href} className="ml-auto text-sm text-accent font-semibold no-underline hover:underline">
                      View Details →
                    </Link>
                  )}
                </div>
              </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Leadership Section */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Leadership & Activities
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <div className="space-y-6">
          {leadership.map((l, i) => (
            <SlideIn
              key={l.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.1}
            >
              <TiltCard className="h-full">
              <div className="sticker-card-surface rounded-2xl overflow-hidden hover:border-olive/30 transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Image side (if available) */}
                  {l.image && (
                    <div className="md:w-80 h-56 md:h-auto relative shrink-0">
                      <Image
                        src={l.image}
                        alt={l.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-7 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      {l.logo && (
                        <div className={`${l.logoSize && l.logoSize > 120 ? 'w-44 h-14' : l.logoSize && l.logoSize > 80 ? 'w-32 h-20' : l.logoSize && l.logoSize > 56 ? 'w-24 h-24' : l.logoSize && l.logoSize > 44 ? 'w-20 h-20' : l.logoSize ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2`}>
                          <Image
                            src={l.logo}
                            alt={l.title}
                            width={l.isSvg ? 40 : (l.logoSize || 36)}
                            height={l.isSvg ? 40 : (l.logoSize || 36)}
                            className={`object-contain ${l.invertLogo ? 'invert' : ''}`}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-sans text-lg font-bold">
                            {l.title}
                          </h3>
                          {l.active && (
                            <span className="sticker-chip sticker-chip--mint">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-accent text-sm font-semibold">
                          {l.role}
                        </p>
                        {l.website && (
                          <a href={l.website} target="_blank" rel="noopener noreferrer" className="text-xs text-olive font-semibold no-underline hover:underline mt-0.5 block">
                            {l.website.replace('https://', '')} ↗
                          </a>
                        )}
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted font-mono">
                            {l.period}
                          </span>
                          {l.hours && (
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-olive/10 text-olive uppercase tracking-wider">
                              {l.hours} hours
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-secondary leading-relaxed mb-4 font-body">
                      {l.desc}
                    </p>

                    <div className="flex gap-2 flex-wrap items-center">
                      {l.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-surface-light text-sage border border-border"
                        >
                          {h}
                        </span>
                      ))}
                      {l.href && (
                        <Link href={l.href} className="ml-auto text-sm text-accent font-semibold no-underline hover:underline">
                          View Details →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </TiltCard>
            </SlideIn>
          ))}
        </div>
      </div>
    </main>
  );
}

import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem, CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    company: "Chipotle Mexican Grill",
    role: "Team Member",
    period: "Sep 2025 – Present",
    location: "Yardley & Warrington, PA",
    active: true,
    href: "/experience/chipotle",
    desc: "Deliver fast, friendly customer service in a high-volume restaurant environment. Collaborate with a team to maintain food safety standards, ensure quality preparation, and keep operations running smoothly during peak hours. Consistently meet time targets while upholding Chipotle's commitment to food with integrity.",
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
    quote: {
      text: "I want to commend Leo for the outstanding work he did during his internship at Mundial Financial Group. His dedication, hard work, and eagerness to learn were evident throughout. His work in creating a new website showcased both his technical skills and ability to translate what he learned into a professional, practical result.",
      author: "Charles Smulevitz",
      title: "CEO, Mundial Financial Group",
    },
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
    quote: {
      text: "Leo consistently delivered polished, well-researched content that exceeded expectations. His ability to work independently made him an invaluable part of our marketing team.",
      author: "Tyler York",
      title: "CEO, Achievable",
      avatar: "/images/tyleryork.jpeg",
    },
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
    href: "/experience/tiratana",
    desc: "Lead a remote education initiative providing weekly Zoom lessons to children at the Ti-Ratana Welfare Society, a charitable welfare organization in Kuala Lumpur, Malaysia. Led a community fundraiser raising $8,000 for e-learning tools including a projector, laptop, and microphone. The program was featured in a local Malaysian newspaper for its community impact.",
    highlights: ["Weekly Zoom lessons for children", "$8,000 fundraiser for e-learning tools", "Featured in Malaysian newspaper"],
    logo: "/images/orphanagelogo.png",
    image: "/images/Orphanage.jpg",
  },
  {
    title: "ObCHESSed Chess Club",
    role: "Co-Founder",
    period: "Sep 2025 – Present",
    hours: null,
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
    period: "3+ Years",
    hours: null,
    href: "/experience/spokesman",
    website: "https://thespokesman.net",
    desc: "Rose through the ranks from Associate Editor to Online Editor to Editor in Chief of the school newspaper. Oversee all editorial content, manage a team of writers and editors, and ensure timely publication of each issue.",
    highlights: ["Associate Editor to Online Editor to EIC", "Full editorial oversight", "Team management"],
    logo: "/images/spokesman-logo-alt.png",
    logoSize: 200,
    invertLogo: false,
    image: null,
  },
  {
    title: "Science Olympiad",
    role: "Team Member & MS Co-head",
    period: "2024 – Present",
    hours: null,
    href: "/experience/scioly",
    desc: "Compete on the varsity Science Olympiad team in engineering events (Helicopter, Electric Vehicle) at the regional and state level. Separately co-head the Middle School Science Olympiad team, creating practice tests, grading submissions, and mentoring younger students.",
    highlights: ["Helicopter & Electric Vehicle", "Regional + State competitions", "MS team co-head"],
    logo: "/images/scioly.jpeg",
    image: "/images/scienceolympiad.png",
  },
  {
    title: "Varsity Fencing",
    role: "Varsity Athlete",
    period: "2023 – Present",
    hours: null,
    href: "/experience/fencing",
    desc: "Compete on the varsity fencing team, earning 2nd place at NJSIAA Regionals and qualifying for the state championship as a sophomore. Have been fencing competitively since age 6, building over a decade of discipline and competitive experience.",
    highlights: ["2nd Place Regional", "State qualifier", "Fencing since age 6"],
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
          <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tight mb-3">
            Experience
          </h1>
          <p className="text-muted text-lg md:text-xl mb-10 font-body max-w-2xl">
            Professional internships, work experience, and leadership roles that
            have shaped my skills and perspective.
          </p>
        </FadeUp>

        {/* Stats Bar */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: 4, suffix: "", label: "Work Positions" },
              { value: 580, suffix: "+", label: "Work Hours" },
              { value: 660, suffix: "+", label: "Volunteer Hours" },
              { value: 4, suffix: "", label: "Sectors" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface border border-border rounded-2xl p-6 text-center"
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
              <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 hover:border-accent/30 transition-all relative">
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
                      {e.active && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wider">
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

                {/* Quote (if present) */}
                {e.quote && (
                  <div className="bg-surface-light border border-border rounded-xl p-5 mb-5">
                    <p className="text-sm text-secondary italic font-body leading-relaxed mb-3">
                      &ldquo;{e.quote.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      {e.quote.avatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={e.quote.avatar}
                            alt={e.quote.author}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-xs font-bold text-muted">
                          {e.quote.author.split(" ").map(n => n[0]).join("")}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold font-sans">
                          {e.quote.author}
                        </p>
                        <p className="text-[10px] text-muted">
                          {e.quote.title}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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
              <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-olive/30 transition-all">
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
                        <h3 className="font-sans text-lg font-bold">
                          {l.title}
                        </h3>
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

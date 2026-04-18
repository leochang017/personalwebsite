import type { Metadata } from "next";
import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem, CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { StickerPill } from "@/components/Doodles";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Achievements — Leo Chang",
  description: "Competition placements, writing awards, research publication, and academic milestones.",
};

const competitions = [
  { place: "1st", placeLabel: "1st Place", color: "bg-yellow-100 text-yellow-800 border-yellow-300", badgeColor: "bg-yellow-400 text-yellow-900", name: "PClassic Fall 2024", org: "University of Pennsylvania", detail: "Won first place at UPenn's PClassic programming competition.", logo: "/images/pclassic.png", year: "2024" },
  { place: "1st", placeLabel: "1st Place", color: "bg-yellow-100 text-yellow-800 border-yellow-300", badgeColor: "bg-yellow-400 text-yellow-900", name: "USA Dance National DanceSport Championships", org: "Junior & Youth Pre Champ National Champion — Sophomore Year", detail: "USA Dance National Junior and Youth Pre Champ National Champion as a sophomore.", logo: "/images/usadance.png", year: "2024" },
  { place: "2nd", placeLabel: "2nd Place", color: "bg-gray-100 text-gray-700 border-gray-300", badgeColor: "bg-gray-300 text-gray-800", name: "NJSIAA Fencing (Individual)", org: "Regional Championship", detail: "Earned second place at NJSIAA regional fencing championship, qualifying for NJ State Final.", logo: "/images/njsiaa.jpg", year: "2025" },
  { place: "2nd", placeLabel: "2nd Place", color: "bg-gray-100 text-gray-700 border-gray-300", badgeColor: "bg-gray-300 text-gray-800", name: "NJSIAA Fencing (Team)", org: "Regional Team Championship", detail: "Second place team finish at NJSIAA Regionals, qualifying for NJ State Final.", logo: "/images/njsiaa.jpg", year: "2025" },
  { place: "3rd", placeLabel: "3rd Place", color: "bg-orange-100 text-orange-700 border-orange-300", badgeColor: "bg-orange-400 text-orange-900", name: "Science Olympiad Regionals — Helicopter", org: "Regional Competition", detail: "3rd place in Helicopter event at Science Olympiad Regionals.", logo: "/images/scioly.jpeg", year: "2025" },
  { place: "3rd", placeLabel: "3rd Place", color: "bg-orange-100 text-orange-700 border-orange-300", badgeColor: "bg-orange-400 text-orange-900", name: "Science Olympiad Regionals — Helicopter", org: "Regional Competition", detail: "3rd place in Helicopter event at Science Olympiad Regionals.", logo: "/images/scioly.jpeg", year: "2026" },
  { place: "3rd", placeLabel: "3rd Place", color: "bg-orange-100 text-orange-700 border-orange-300", badgeColor: "bg-orange-400 text-orange-900", name: "HackBac Hackathon", org: "Social Justice Theme", detail: "Won third place building a social justice project.", logo: "/images/hackbac.webp", year: "2024" },
  { place: "4th", placeLabel: "4th Place", color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-300 text-blue-900", name: "National Economics Challenge", org: "California States", detail: "Placed 4th at the California state level of the National Economics Challenge.", logo: "/images/nec.png", year: "2024" },
  { place: "5th", placeLabel: "5th Place", color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-300 text-blue-900", name: "Science Olympiad States — Helicopter", org: "NJ State Finals", detail: "5th place in Helicopter at NJ Science Olympiad State Finals.", logo: "/images/scioly.jpeg", year: "2025" },
  { place: "5th", placeLabel: "5th Place", color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-300 text-blue-900", name: "Science Olympiad States — Helicopter", org: "NJ State Finals", detail: "5th place in Helicopter at NJ Science Olympiad State Finals.", logo: "/images/scioly.jpeg", year: "2026" },
  { place: "6th", placeLabel: "6th Place", color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-300 text-blue-900", name: "Science Olympiad States — Electric Vehicle", org: "NJ State Finals", detail: "6th place in Electric Vehicle at NJ Science Olympiad State Finals.", logo: "/images/scioly.jpeg", year: "2025" },
  { place: "Finalist", placeLabel: "National Finalist", color: "bg-yellow-100 text-yellow-800 border-yellow-300", badgeColor: "bg-yellow-200 text-yellow-800", name: "United States Dance Championships", org: "Pro Am Finalist — Freshman Year", detail: "United States Dance Championships Pro Am Finalist as a freshman.", logo: "/images/usdc.png", year: "2023" },
  { place: "Finalist", placeLabel: "National Finalist", color: "bg-yellow-100 text-yellow-800 border-yellow-300", badgeColor: "bg-yellow-200 text-yellow-800", name: "United States Dance Championships", org: "Pro Am Finalist — Junior Year", detail: "United States Dance Championships Pro Am Finalist as a junior.", logo: "/images/usdc.png", year: "2025" },
];

const writingAwards = [
  {
    title: "Scholastic Silver Key",
    category: "Poetry",
    work: "\"Legacy\"",
    detail:
      "Awarded a Silver Key from the Scholastic Art & Writing Awards for the poem \"Legacy,\" recognized for its literary merit among thousands of student submissions nationwide.",
    logo: "/images/scholastic.jpg",
    year: "2024",
  },
  {
    title: "White Enso Journal",
    category: "Poetry",
    work: "\"Snow Haiku\"",
    detail:
      "Published a haiku in White Enso Journal, a curated literary publication celebrating concise and evocative poetry.",
    logo: null,
    year: "2024",
  },
  {
    title: "Creative Communications",
    category: "Poetry",
    work: "Published Collection",
    detail:
      "Selected for publication by Creative Communications, an organization that curates and publishes outstanding student poetry in national anthologies.",
    logo: null,
    year: "2024",
  },
  {
    title: "Scholastic Silver Key",
    category: "Poetry",
    work: <><em>My Grandfather&apos;s Voice</em></>,
    detail:
      "Awarded a Silver Key from the Scholastic Art & Writing Awards for the poem \"My Grandfather's Voice,\" recognized for its literary merit among thousands of student submissions nationwide.",
    logo: "/images/scholastic.jpg",
    year: "2023",
  },
];

export default function AchievementsPage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
              Achievements
            </h1>
            <StickerPill color="var(--color-sticker-yellow)" rotate={-3} className="text-xs font-bold uppercase tracking-wider wobble-slow">
              ★ 18+ Awards
            </StickerPill>
          </div>
          <p className="text-muted text-lg md:text-xl mb-10 font-body max-w-2xl">
            Competition results, published research, and recognition across
            academics, athletics, and the arts.
          </p>
        </FadeUp>

        {/* Stats Bar */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-3 gap-4 mb-16">
            {[
              { value: 18, suffix: "+", label: "Awards" },
              { value: 13, suffix: "", label: "Competitions" },
              { value: 13, suffix: "", label: "Top Placements" },
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

        {/* Competition Results */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Competition Results
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <StaggerList className="grid md:grid-cols-2 gap-5 mb-24">
          {competitions.map((c) => (
            <StaggerItem key={`${c.name}-${c.year}-${c.org}`}>
              <TiltCard className="h-full">
              <div className="sticker-card-surface rounded-2xl p-7 hover:border-accent/30 transition-all h-full flex flex-col">
                {/* Top row: badge + title */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Placement Badge */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${c.badgeColor} flex flex-col items-center justify-center shrink-0 font-sans`}
                  >
                    <span className="text-2xl font-black leading-none">
                      {c.place.replace(/\D/g, "")}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-wider">
                      {c.place.replace(/\d/g, "")}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      {c.logo && (
                        <div className="w-10 h-10 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                          <Image
                            src={c.logo}
                            alt={c.name}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <h3 className="font-sans text-lg font-bold leading-tight">
                        {c.name}
                      </h3>
                    </div>
                    <p className="text-accent text-sm font-semibold">
                      {c.org}
                    </p>
                    <span className="text-[10px] text-muted font-mono">
                      {c.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-secondary leading-relaxed font-body flex-1">
                  {c.detail}
                </p>

                {/* Placement label tag */}
                <div className="mt-4">
                  <span
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${c.color} uppercase tracking-wider`}
                  >
                    {c.placeLabel}
                  </span>
                </div>
              </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Research & Publications */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Research & Publications
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <ScaleIn delay={0.1}>
          <TiltCard className="h-full">
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-24 hover:border-accent/30 transition-all">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-2">
                <Image
                  src="/images/JEI.png"
                  alt="JEI"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                    Accepted for Publishing
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-olive/10 text-olive uppercase tracking-wider">
                    Peer Reviewed
                  </span>
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold mb-2 leading-tight">
                  Analyzing the Impact of Twitter Sentiment on Stock Price
                  Prediction Using Long Short-Term Memory Models
                </h3>
                <p className="text-accent font-semibold text-sm mb-3">
                  Journal of Emerging Investigators (JEI)
                </p>
                <p className="text-sm text-secondary leading-relaxed font-body mb-5">
                  A peer-reviewed research paper accepted for publishing investigating whether
                  Twitter sentiment data improves LSTM neural network models
                  for stock price prediction. Testing Apple, Tesla, and Microsoft
                  with five-fold time series cross-validation, the study found that
                  sentiment-enhanced models consistently underperformed baselines
                  by 24&ndash;40%, contributing original findings to the intersection
                  of AI and financial analysis.
                </p>
                <a
                  href="/projects/stockml"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm no-underline hover:bg-accent transition-colors"
                >
                  View Project Details
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
          </TiltCard>
        </ScaleIn>

        {/* Writing Awards */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-black">
              Writing Awards
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {writingAwards.map((w, i) => (
            <SlideIn key={`${w.title}-${w.year}`} direction="left" delay={i * 0.1}>
              <TiltCard className="h-full">
              <div className="sticker-card-surface rounded-2xl p-7 hover:border-olive/30 transition-all h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  {w.logo ? (
                    <div className="w-10 h-10 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                      <Image
                        src={w.logo}
                        alt={w.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-olive/10 flex items-center justify-center shrink-0">
                      <span className="text-olive font-sans font-bold text-sm">
                        W
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider font-mono">
                      {w.category}
                    </span>
                    <span className="text-[10px] text-muted ml-2 font-mono">
                      {w.year}
                    </span>
                  </div>
                </div>

                <h3 className="font-sans text-base font-bold mb-1">
                  {w.title}
                </h3>
                <p className="text-sm text-accent font-semibold mb-3">
                  {w.work}
                </p>
                <p className="text-sm text-secondary leading-relaxed font-body flex-1">
                  {w.detail}
                </p>
              </div>
              </TiltCard>
            </SlideIn>
          ))}
        </div>
      </div>
    </main>
  );
}

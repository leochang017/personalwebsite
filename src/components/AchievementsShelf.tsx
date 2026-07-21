"use client";
import { useState } from "react";
import Image from "next/image";
import { PopIn } from "@/components/ScrollReveal";

type Domain = "STEM" | "ATHLETICS" | "ARTS";
type Tier = "gold" | "silver" | "bronze" | "plain";

type Award = {
  medal: string;
  tier: Tier;
  domain: Domain;
  year: string;
  title: string;
  detail: string;
  /** Organization logo. Omitted where the publisher has no usable mark. */
  logo?: { src: string; w: number; h: number };
};

const awards: Award[] = [
  { medal: "1ST", tier: "gold", domain: "STEM", year: "2024", title: "PClassic Programming Competition", detail: "1st place · University of Pennsylvania", logo: { src: "/images/pclassic.png", w: 250, h: 216 } },
  { medal: "1ST", tier: "gold", domain: "ATHLETICS", year: "2024", title: "USA Dance National DanceSport Champion", detail: "Junior & Youth Pre-Champ · won as a sophomore", logo: { src: "/images/usadance.png", w: 225, h: 225 } },
  { medal: "PUB", tier: "gold", domain: "STEM", year: "2026", title: "Journal of Emerging Investigators", detail: "Stock ML paper accepted for publication · lead researcher", logo: { src: "/images/JEI.png", w: 411, h: 411 } },
  { medal: "GOLD", tier: "gold", domain: "ARTS", year: "2026", title: "PYAA Gold Award", detail: "“Dear Lao-Lao” · short story", logo: { src: "/images/pyaa.png", w: 512, h: 156 } },
  { medal: "2ND", tier: "silver", domain: "ATHLETICS", year: "2025", title: "NJSIAA Fencing Regionals", detail: "2nd, individual & team · NJ State Final qualifier", logo: { src: "/images/njsiaa.jpg", w: 340, h: 340 } },
  { medal: "KEY", tier: "silver", domain: "ARTS", year: "2023 · 2024", title: "Scholastic Silver Key × 2", detail: "Poetry · “Legacy” and “My Grandfather's Voice”", logo: { src: "/images/scholastic.jpg", w: 400, h: 400 } },
  { medal: "3RD", tier: "bronze", domain: "STEM", year: "2024", title: "HackBac Hackathon", detail: "3rd place · social-justice theme", logo: { src: "/images/hackbac.webp", w: 2500, h: 2500 } },
  { medal: "3RD", tier: "bronze", domain: "STEM", year: "2025 · 2026", title: "Science Olympiad Regionals", detail: "3rd place · Helicopter & Electric Vehicle", logo: { src: "/images/scioly.jpeg", w: 877, h: 452 } },
  { medal: "5TH", tier: "plain", domain: "STEM", year: "2025 · 2026", title: "Science Olympiad NJ States", detail: "5th & 6th place finishes · Helicopter & Electric Vehicle", logo: { src: "/images/scioly.jpeg", w: 877, h: 452 } },
  { medal: "4TH", tier: "plain", domain: "STEM", year: "2024", title: "National Economics Challenge", detail: "4th · California States", logo: { src: "/images/nec.png", w: 226, h: 156 } },
  { medal: "FIN", tier: "plain", domain: "ATHLETICS", year: "2023 · 2025", title: "USDC Pro-Am National Finalist", detail: "DanceSport", logo: { src: "/images/usdc.png", w: 1536, h: 1536 } },
  { medal: "PUB", tier: "plain", domain: "ARTS", year: "2024", title: "White Enso Journal", detail: "Published poetry · “Snow Haiku”" },
  { medal: "PUB", tier: "plain", domain: "ARTS", year: "2024", title: "Creative Communications", detail: "Published in national poetry anthologies" },
];

const tierBg: Record<Tier, string> = {
  gold: "#f2c14e",
  silver: "#d7d3c8",
  bronze: "oklch(0.75 0.1 55)",
  plain: "#fff",
};

const FILTERS = ["ALL", "STEM", "ATHLETICS", "ARTS"] as const;

export function AchievementsShelf() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const shown = awards.filter((a) => filter === "ALL" || a.domain === filter);
  const count = (k: (typeof FILTERS)[number]) =>
    k === "ALL" ? awards.length : awards.filter((a) => a.domain === k).length;

  return (
    <>
      <PopIn delay={0.12}>
        <div className="flex gap-2.5 flex-wrap mb-8">
          {FILTERS.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              aria-pressed={k === filter}
              className={`font-sans font-bold text-xs tracking-[0.06em] px-4 py-2 border-[3px] border-foreground rounded-full cursor-pointer shadow-[3px_3px_0_var(--color-ink-shadow)] transition-[transform,background-color,color] duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
                k === filter ? "bg-foreground text-background" : "bg-white text-foreground"
              }`}
            >
              {k} · {count(k)}
            </button>
          ))}
        </div>
      </PopIn>

      <div className="grid md:grid-cols-2 gap-5">
        {shown.map((a) => (
          <div
            key={`${a.title}-${a.year}`}
            className="bg-white border-[3px] border-foreground shadow-[4px_4px_0_var(--color-ink-shadow)] px-6 py-5 flex gap-5 items-center transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[6px_6px_0_var(--color-ink-shadow)]"
          >
            {/* Landscape box: wordmark logos (PYAA, Science Olympiad) are wide,
                so a square would shrink them to an unreadable sliver. */}
            {a.logo ? (
              <div className="flex-none w-[108px] h-[96px] border-[3px] border-foreground bg-white flex items-center justify-center p-1.5">
                <Image
                  src={a.logo.src}
                  alt=""
                  width={a.logo.w}
                  height={a.logo.h}
                  style={{ width: "auto", height: "auto" }}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div
                className="flex-none w-[108px] h-[96px] border-[3px] border-foreground flex items-center justify-center font-mono font-bold text-[22px] tracking-[0.06em]"
                style={{ background: tierBg[a.tier] }}
              >
                {a.medal}
              </div>
            )}
            <div className="flex flex-col gap-[5px] min-w-0">
              <div className="font-sans font-bold text-lg leading-[1.2] tracking-[-0.01em]">
                {a.title}
              </div>
              <div className="font-mono text-xs leading-[1.5] font-medium text-muted">
                {a.detail}
              </div>
              <div className="flex gap-2 mt-[3px] items-center flex-wrap">
                {/* logo-less cards already show the medal in the box; no repeat */}
                {a.logo && (
                  <span
                    className="font-mono text-[10px] font-bold tracking-[0.08em] border-2 border-foreground px-[9px] py-[3px] rounded-full"
                    style={{ background: tierBg[a.tier] }}
                  >
                    {a.medal}
                  </span>
                )}
                <span className="font-mono text-[10px] font-semibold tracking-[0.08em] border-2 border-foreground px-[9px] py-[3px] rounded-full">
                  {a.domain}
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-muted">
                  {a.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="font-mono text-xs font-medium text-muted pt-5 pb-2">
        Some entries aggregate multiple years and events, 19+ awards in total.
      </div>
    </>
  );
}

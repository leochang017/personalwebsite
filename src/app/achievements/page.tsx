import type { Metadata } from "next";
import { PopIn } from "@/components/ScrollReveal";
import { AchievementsShelf } from "@/components/AchievementsShelf";

export const metadata: Metadata = {
  title: "Achievements — Leo Chang",
  description:
    "Competition placements, writing awards, research publication, and academic milestones.",
};

export default function AchievementsPage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-2">
        <PopIn delay={0.06}>
          <h1 className="font-sans font-extrabold uppercase text-[13.5vw] sm:text-7xl md:text-8xl leading-[0.92] tracking-[-0.04em] m-0 mb-6">
            Achievements
          </h1>
        </PopIn>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <AchievementsShelf />
      </section>
    </main>
  );
}

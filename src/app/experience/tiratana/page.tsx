import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

const achievements = [
  "Initiated remote education program from scratch",
  "Weekly Zoom lessons in English & science to children in Ti-Ratana's children's homes",
  "Led a community fundraiser raising $8,000 for e-learning tools",
  "Personally taught all weekly lessons in English and science",
  "Featured in Malaysian newspaper",
  "600+ volunteer hours over 6+ years",
];

const skills = [
  "Community Service",
  "Curriculum Development",
  "Teaching",
  "Program Director",
  "Fundraising",
  "Lesson Delivery",
];

export default function TiRatanaPage() {
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
          <div className="mb-12">
            <div className="flex items-start gap-5 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                <Image
                  src="/images/orphanagelogo.png"
                  alt="Ti-Ratana Welfare Society"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight">
                    Ti-Ratana Welfare Society
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <p className="text-accent font-semibold text-lg">
                  Director of Orphanage Educational Program
                </p>
                <span className="text-sm text-muted font-mono">
                  2020 &ndash; Present &middot; 6+ years
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Impact Stat */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">600+</div>
              <p className="text-xs text-muted mt-1 font-body">Volunteer Hours</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-olive">5+</div>
              <p className="text-xs text-muted mt-1 font-body">Years Running</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="font-sans text-3xl font-black text-accent">Weekly</div>
              <p className="text-xs text-muted mt-1 font-body">Zoom Lessons</p>
            </div>
          </div>
        </FadeUp>

        {/* Photo */}
        <SlideIn direction="left" delay={0.1}>
          <div className="relative w-full rounded-2xl overflow-hidden mb-14 border border-border shadow-lg shadow-accent/10">
            <Image
              src="/images/Orphanage.jpg"
              alt="Ti-Ratana Educational Program — Featured in Malaysian newspaper"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-[11px] text-muted font-body text-left py-2 px-4">Photo Credit: Ti-Ratana Welfare Society</p>
          </div>
        </SlideIn>

        {/* Description */}
        <SlideIn direction="left" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">About the Program</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                Ti-Ratana Welfare Society is one of the largest independent charitable
                NGOs in Kuala Lumpur, Malaysia, housing over 160 children across three
                homes regardless of race and creed. Initiated a remote educational program
                providing weekly Zoom lessons in English and science to children in
                their children&apos;s homes who would otherwise lack access to quality
                educational resources.
              </p>
              <p>
                Led a community fundraiser raising $8,000 for e-learning tools
                &mdash; including a projector, laptop, and microphone &mdash; enabling
                continued education and a more engaging learning experience for the
                children. Personally teaches all weekly lessons, developing and delivering
                curriculum in English and science.
              </p>
              <p>
                The program was featured in a Malaysian newspaper for its
                community impact, highlighting the cross-continental bridge between
                student volunteers and the children at Ti-Ratana. Over 600 volunteer
                hours have been contributed across 6+ years of running the program.
              </p>
            </div>
          </div>
        </SlideIn>

        {/* Key Achievements */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Key Achievements</h2>
        </FadeUp>
        <StaggerList className="space-y-3 mb-14">
          {achievements.map((a) => (
            <StaggerItem key={a}>
              <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-3 hover:border-accent/30 transition-all duration-300">
                <span className="text-accent mt-0.5 shrink-0">&bull;</span>
                <p className="text-sm text-secondary font-body">{a}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Highlights */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Program Highlights</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {[
            {
              title: "Remote Education",
              desc: "Built a fully remote educational pipeline connecting student volunteers in the US with children at Ti-Ratana Welfare Society's children's homes in Malaysia via weekly Zoom sessions.",
            },
            {
              title: "Fundraising Success",
              desc: "Organized and led a community fundraiser that raised $8,000 to purchase a projector, laptop, and microphone for e-learning tools.",
            },
            {
              title: "Solo Teaching",
              desc: "Personally develops and delivers all weekly lessons in English and science, maintaining consistent, high-quality education every week.",
            },
            {
              title: "Media Recognition",
              desc: "The program's impact was recognized by a local Malaysian newspaper, bringing wider attention to the educational initiative.",
            },
          ].map((h, i) => (
            <ScaleIn key={h.title} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-olive/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{h.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">
                  {h.desc}
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Skills */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Skills</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex gap-2 flex-wrap mb-14">
            {skills.map((s) => (
              <span
                key={s}
                className="text-[11px] font-semibold px-4 py-2 rounded-full bg-surface-light text-secondary border border-border"
              >
                {s}
              </span>
            ))}
          </div>
        </FadeUp>

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

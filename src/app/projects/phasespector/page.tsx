import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Link from "next/link";

const features = [
  {
    title: "Time Rewind Mechanic",
    desc: "Record your movement path, then rewind at 2x speed to attack enemies along your trail. Strategic positioning becomes the core combat loop.",
    icon: "---",
  },
  {
    title: "Projectile Deflection",
    desc: "Enemy projectiles encountered during rewind are deflected back at attackers, turning their offense into your advantage.",
    icon: "---",
  },
  {
    title: "3 Enemy Types",
    desc: "Melee Chargers (50 HP) rush your position, Ranged Shooters (50 HP) fire from distance, and Mini-Bosses (300 HP) combine both with massive health pools.",
    icon: "---",
  },
  {
    title: "Score Multiplier",
    desc: "Chain kills within a 6-second window to build your multiplier. Strategic rewind timing maximizes score potential across enemy clusters.",
    icon: "---",
  },
  {
    title: "Dynamic Difficulty",
    desc: "Sigmoid-based scaling ramps enemy count and speed per wave. Every 5th wave introduces a mini-boss encounter for escalating challenge.",
    icon: "---",
  },
  {
    title: "High Score Leaderboard",
    desc: "Persistent high score tracking lets you compete against your best runs. The leaderboard resets encourage mastery of the rewind mechanic.",
    icon: "---",
  },
];

const techDetails = [
  { label: "Engine", value: "Godot 4.6" },
  { label: "Language", value: "GDScript" },
  { label: "Spawning", value: "Wave-based with sigmoid scaling" },
  { label: "Collision", value: "Layered collision system" },
  { label: "Signals", value: "Event-driven signal architecture" },
  { label: "Scenes", value: "Dynamic scene instancing" },
  { label: "Rewind Buffer", value: "Position history ring buffer" },
  { label: "I-Frames", value: "Invincibility frame management" },
];

const controls = [
  { key: "Arrow Keys", action: "Move your character in any direction" },
  { key: "Space", action: "Activate time rewind along recorded path" },
];

const pipeline = [
  { step: "Move", detail: "Navigate the arena and position strategically" },
  { step: "Record", detail: "Your movement path is continuously saved to the history buffer" },
  { step: "Rewind", detail: "Press Space to retrace your path at 2x speed" },
  { step: "Freeze", detail: "All enemies freeze in place during rewind" },
  { step: "Attack", detail: "Damage enemies and deflect projectiles along your path" },
  { step: "Cooldown", detail: "Rewind ability enters cooldown before next use" },
];

export default function PhaseSpectorPage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <FadeUp>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors font-body mb-10 no-underline"
          >
            <span>&larr;</span> Back to Projects
          </Link>
        </FadeUp>

        {/* Hero Section */}
        <FadeUp delay={0.05}>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight">
                Phase Spector
              </h1>
              <span className="sticker-chip sticker-chip--blue wobble-slow">
                Playable
              </span>
            </div>
            <p className="text-muted text-lg md:text-xl font-body mb-6">
              Top-down Wave-Based Arcade Shooter
            </p>
            <a
              href="/projects/phase-spector/phase-spector.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-3 rounded-full bg-foreground text-background font-semibold text-sm no-underline hover:bg-accent transition-colors"
            >
              Play Phase Spector &rarr;
            </a>
          </div>
        </FadeUp>

        {/* Play in Browser */}
        <FadeUp>
          <div className="mb-14">
            <h2 className="font-sans text-2xl font-bold mb-4">Play in Browser</h2>
            <div className="sticker-card-surface rounded-2xl overflow-hidden">
              <iframe
                src="/projects/phase-spector/phase-spector.html"
                className="w-full aspect-video border-none"
                title="Phase Spector Game"
                allow="autoplay; fullscreen"
              />
              <div className="p-4 border-t border-border flex items-center justify-between">
                <p className="text-xs text-muted font-body">Arrow Keys to move, Space to rewind</p>
                <a
                  href="/projects/phase-spector/phase-spector.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent font-semibold no-underline hover:underline"
                >
                  Open fullscreen →
                </a>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Overview */}
        <SlideIn direction="left" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">Overview</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                Phase Spector is a top-down arcade shooter built around a unique time-rewind combat
                mechanic. Instead of conventional attacks, players record their movement path
                and then rewind through it at double speed, damaging any enemies caught in
                their trail and deflecting incoming projectiles.
              </p>
              <p>
                The game features endless wave-based progression with dynamically scaling
                difficulty. Three distinct enemy types &mdash; melee chargers, ranged
                shooters, and powerful mini-bosses &mdash; force players to constantly adapt
                their positioning strategy. A chain-kill score multiplier rewards aggressive
                play and precise rewind timing.
              </p>
            </div>
          </div>
        </SlideIn>

        {/* Key Features */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Key Features</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.08}>
              <div className="sticker-card-surface rounded-xl p-6 h-full hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Technical Details */}
        <SlideIn direction="right" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-6">Technical Details</h2>
            <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {techDetails.map((t) => (
                <StaggerItem key={t.label}>
                  <div className="bg-surface-light border border-border rounded-xl p-4">
                    <p className="text-[10px] font-bold uppercase text-accent tracking-wider mb-1">
                      {t.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground font-body">{t.value}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </SlideIn>

        {/* Controls */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Controls</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {controls.map((c, i) => (
            <ScaleIn key={c.key} delay={i * 0.1}>
              <div className="sticker-card-surface rounded-xl p-6 flex items-center gap-4">
                <span className="shrink-0 font-mono text-sm font-bold text-accent bg-accent/10 px-4 py-2 rounded-lg">
                  {c.key}
                </span>
                <p className="text-sm text-secondary font-body">{c.action}</p>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Rewind Mechanic Pipeline */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Rewind Mechanic Pipeline</h2>
        </FadeUp>
        <ScaleIn delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <StaggerList className="space-y-0">
              {pipeline.map((p, i) => (
                <StaggerItem key={p.step}>
                  <div className="flex items-start gap-4 py-4 border-b border-border last:border-b-0">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="font-mono text-xs font-bold text-accent">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-sans font-bold text-sm mb-0.5">{p.step}</p>
                      <p className="text-xs text-muted font-body">{p.detail}</p>
                    </div>
                    {i < pipeline.length - 1 && (
                      <span className="text-muted text-lg font-mono self-center">&darr;</span>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-mono text-xs text-muted text-center tracking-wide">
                <span className="text-accent font-semibold">Move</span> &rarr;{" "}
                <span className="text-accent font-semibold">Record history</span> &rarr;{" "}
                <span className="text-accent font-semibold">Rewind at 2x</span> &rarr;{" "}
                <span className="text-accent font-semibold">Freeze enemies</span> &rarr;{" "}
                <span className="text-accent font-semibold">Attack along path</span> &rarr;{" "}
                <span className="text-accent font-semibold">Cooldown</span>
              </p>
            </div>
          </div>
        </ScaleIn>

        {/* Back to Projects */}
        <FadeUp>
          <div className="text-center">
            <Link
              href="/projects"
              className="sticker-btn text-sm no-underline"
            >
              &larr; All Projects
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

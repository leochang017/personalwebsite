import type { Metadata } from "next";
import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Phase Spector — Leo Chang",
  description: "Rewind. Strike. Survive. Top-down wave-based arcade shooter with a time-rewind combat mechanic. Built in Godot 4.6 / GDScript.",
};

const features = [
  {
    title: "Time Rewind Mechanic",
    desc: "Record up to 1.5s of movement, then rewind at 2x speed to attack enemies along your trail. Enemies freeze during rewind, turning positioning into the core combat loop.",
    icon: "---",
  },
  {
    title: "Projectile Deflection",
    desc: "Enemy projectiles caught along the rewind path get re-skinned, flipped to the player's collision layer, and fly back at 50 damage — one-shotting any other shooter they hit.",
    icon: "---",
  },
  {
    title: "Tiered Multiplier Feedback",
    desc: "The on-screen multiplier bar shifts color through five tiers (1.2x → 2.0x), giving instant visual feedback on how aggressive your chain-kill streak is.",
    icon: "---",
  },
  {
    title: "Rewind Ghost Trail",
    desc: "While rewinding, player projection sprites mark each frame of your retraced path, telegraphing exactly where attacks and deflections will land.",
    icon: "---",
  },
  {
    title: "3 Enemy Types",
    desc: "Melee Chargers (50 HP, 8-direction pursuit) rush your position, Ranged Shooters (50 HP) strafe and fire from distance, and Mini-Bosses (300 HP) cycle multiple attack patterns from the top of the arena.",
    icon: "---",
  },
  {
    title: "Multi-Pattern Mini-Bosses",
    desc: "Every 5th wave triggers a mini-boss that cycles between a 5-projectile spread shot, 3 aimed shots, and a telegraphed melee dive. Dive speed ramps up each wave for escalating pressure.",
    icon: "---",
  },
  {
    title: "Powerups & Healing Pickups",
    desc: "Defeated mini-bosses drop powerups that extend your rewind buffer length and healing pickups that restore a life — pause-aware so they never get lost during a rewind.",
    icon: "---",
  },
  {
    title: "Score Multiplier",
    desc: "Chain kills within a 6-second window to build a multiplier from 1.0x up to 2.0x in 0.2x increments. Taking damage resets the chain — risk vs. reward at every rewind.",
    icon: "---",
  },
  {
    title: "Dynamic Difficulty",
    desc: "Wave-based spawner ramps enemy count toward a cap of 7 per wave and increases base move speed each wave (up to 350). Every 5th wave is a mini-boss encounter.",
    icon: "---",
  },
  {
    title: "Top-5 High Score Table",
    desc: "Persistent named-entry leaderboard of the top five runs, displayed on the game-over screen so each session has a clear target to beat.",
    icon: "---",
  },
  {
    title: "Polished Game Flow",
    desc: "Custom title screen, walk-through instruction screen, on-screen tutorials, hit-flash effects, hurt sprites, i-frames after damage and after rewinds — built to feel like a finished arcade game.",
    icon: "---",
  },
];

const techDetails = [
  { label: "Engine", value: "Godot 4.6" },
  { label: "Language", value: "GDScript" },
  { label: "Spawning", value: "Wave-based, mini-boss every 5 waves" },
  { label: "Collision", value: "Layered Area2D collision system" },
  { label: "Signals", value: "Event-driven signal architecture" },
  { label: "Scenes", value: "Dynamic scene instancing" },
  { label: "Rewind Buffer", value: "Position history ring buffer (1.5s)" },
  { label: "I-Frames", value: "Post-hit + post-rewind invincibility" },
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
            <p className="text-muted text-lg md:text-xl font-body mb-2">
              Top-down Wave-Based Arcade Shooter
            </p>
            <p className="font-mono text-sm text-accent uppercase tracking-widest mb-6">
              Rewind. Strike. Survive.
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
                shooters, and multi-pattern mini-bosses &mdash; force players to constantly
                adapt their positioning strategy. A chain-kill score multiplier rewards
                aggressive play and precise rewind timing.
              </p>
              <p>
                Every fifth wave spawns a mini-boss that cycles spread shots, aimed bursts,
                and telegraphed melee dives. Defeating one drops a powerup that extends
                your rewind buffer length, or a healing pickup that restores a life &mdash;
                turning each boss into a real risk-reward decision. Wrapped in a polished
                title screen, walkthrough instruction screen, and persistent high score
                leaderboard.
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

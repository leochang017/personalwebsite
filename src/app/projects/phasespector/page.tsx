import type { Metadata } from "next";
import Link from "next/link";
import { PopIn } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Phase Spector — Leo Chang",
  description: "Rewind. Strike. Survive. Top-down wave-based arcade shooter with a time-rewind combat mechanic. Built in Godot 4.6 / GDScript.",
};

const features = [
  {
    title: "Time Rewind Mechanic",
    desc: "Record up to 1.5s of movement, then rewind at 2x speed to attack enemies along your trail. Enemies freeze during rewind, turning positioning into the core combat loop.",
  },
  {
    title: "Projectile Deflection",
    desc: "Enemy projectiles caught along the rewind path get re-skinned, flipped to the player's collision layer, and fly back at 50 damage, enough to one-shot any other shooter they hit.",
  },
  {
    title: "Tiered Multiplier Feedback",
    desc: "The on-screen multiplier bar shifts color through five tiers (1.2x → 2.0x), giving instant visual feedback on how aggressive your chain-kill streak is.",
  },
  {
    title: "Rewind Ghost Trail",
    desc: "While rewinding, player projection sprites mark each frame of your retraced path, telegraphing exactly where attacks and deflections will land.",
  },
  {
    title: "3 Enemy Types",
    desc: "Melee Chargers (50 HP, 8-direction pursuit) rush your position, Ranged Shooters (50 HP) strafe and fire from distance, and Mini-Bosses (300 HP) cycle multiple attack patterns from the top of the arena.",
  },
  {
    title: "Multi-Pattern Mini-Bosses",
    desc: "Every 5th wave triggers a mini-boss that cycles between a 5-projectile spread shot, 3 aimed shots, and a telegraphed melee dive. Dive speed ramps up each wave for escalating pressure.",
  },
  {
    title: "Powerups & Healing Pickups",
    desc: "Defeated mini-bosses drop powerups that extend your rewind buffer length and healing pickups that restore a life. Both are pause-aware, so they never get lost during a rewind.",
  },
  {
    title: "Score Multiplier",
    desc: "Chain kills within a 6-second window to build a multiplier from 1.0x up to 2.0x in 0.2x increments. Taking damage resets the chain, so every rewind is a calculated risk.",
  },
  {
    title: "Dynamic Difficulty",
    desc: "Wave-based spawner ramps enemy count toward a cap of 7 per wave and increases base move speed each wave (up to 350). Every 5th wave is a mini-boss encounter.",
  },
  {
    title: "Top-5 High Score Table",
    desc: "Persistent named-entry leaderboard of the top five runs, displayed on the game-over screen so each session has a clear target to beat.",
  },
  {
    title: "Polished Game Flow",
    desc: "Custom title screen, walk-through instruction screen, on-screen tutorials, hit-flash effects, hurt sprites, i-frames after damage and after rewinds, all built to feel like a finished arcade game.",
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

const metrics = [
  { number: "1.5s", label: "REWIND BUFFER · 2X PLAYBACK" },
  { number: "3", label: "ENEMY TYPES · BOSS EVERY 5 WAVES" },
  { number: "2.0x", label: "MAX CHAIN-KILL MULTIPLIER" },
];

export default function PhaseSpectorPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-20">
      {/* Back link */}
      <PopIn>
        <Link
          href="/projects"
          className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7"
        >
          &larr; ALL PROJECTS
        </Link>
      </PopIn>

      {/* Hero */}
      <PopIn delay={0.06}>
        <div className="flex gap-2 flex-wrap mb-5">
          <span className="font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground bg-pop-red px-[11px] py-1 rounded-full">
            PLAYABLE
          </span>
          <span className="font-mono text-[10.5px] font-semibold border-2 border-foreground px-[11px] py-1 rounded-full">
            SOLO DEV
          </span>
        </div>
        <h1 className="font-sans font-extrabold text-5xl md:text-[76px] leading-[0.95] tracking-[-0.04em] m-0 mb-5">
          Phase Spector
        </h1>
        <p className="font-sans font-medium text-[21px] leading-[1.45] max-w-[760px] m-0 mb-4">
          Rewind. Strike. Survive. A top-down wave-based arcade shooter where your
          only weapon is retracing your own movement &mdash; record 1.5 seconds of
          motion, then rewind at 2x speed to damage everything along your trail.
        </p>
        <div className="font-mono text-xs font-medium tracking-[0.06em] text-muted uppercase mb-6">
          Top-down Wave-Based Arcade Shooter &middot; Godot 4.6 / GDScript
        </div>
        <div className="flex gap-3 flex-wrap mb-8">
          <a
            href="/projects/phase-spector/phase-spector.html"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn ink-btn--dark no-underline"
          >
            PLAY PHASE SPECTOR &rarr;
          </a>
        </div>
      </PopIn>

      {/* Metrics */}
      <PopIn delay={0.12}>
        <div className="grid sm:grid-cols-3 gap-[18px] mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-[18px]"
            >
              <div className="font-sans font-extrabold text-[38px] tracking-[-0.03em]">{m.number}</div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Play in browser */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Play in Browser
        </h2>
        <div className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-3 mb-14">
          <iframe
            src="/projects/phase-spector/phase-spector.html"
            className="w-full aspect-video border-none block"
            title="Phase Spector Game"
            allow="autoplay; fullscreen"
          />
          <div className="flex items-center justify-between gap-3 flex-wrap pt-2.5">
            <p className="font-mono text-[11px] font-medium text-muted m-0">
              ARROW KEYS TO MOVE &middot; SPACE TO REWIND
            </p>
            <a
              href="/projects/phase-spector/phase-spector.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-semibold no-underline text-foreground hover:underline"
            >
              OPEN FULLSCREEN &rarr;
            </a>
          </div>
        </div>
      </PopIn>

      {/* Overview */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Overview
        </h2>
        <div className="font-sans text-[16px] leading-[1.65] text-secondary max-w-[760px] space-y-4 mb-14">
          <p className="m-0">
            Phase Spector is a top-down arcade shooter built around a unique time-rewind combat
            mechanic. Instead of conventional attacks, players record their movement path
            and then rewind through it at double speed, damaging any enemies caught in
            their trail and deflecting incoming projectiles.
          </p>
          <p className="m-0">
            The game features endless wave-based progression with dynamically scaling
            difficulty. Three distinct enemy types &mdash; melee chargers, ranged
            shooters, and multi-pattern mini-bosses &mdash; force players to constantly
            adapt their positioning strategy. A chain-kill score multiplier rewards
            aggressive play and precise rewind timing.
          </p>
          <p className="m-0">
            Every fifth wave spawns a mini-boss that cycles spread shots, aimed bursts,
            and telegraphed melee dives. Defeating one drops a powerup that extends
            your rewind buffer length, or a healing pickup that restores a life &mdash;
            turning each boss into a real risk-reward decision. Wrapped in a polished
            title screen, walkthrough instruction screen, and persistent high score
            leaderboard.
          </p>
        </div>
      </PopIn>

      {/* Key features */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {features.map((f) => (
            <div key={f.title} className="ink-card p-6 h-full">
              <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0 mb-2">{f.title}</h3>
              <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{f.desc}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Technical details */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Technical Details
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {techDetails.map((t) => (
            <div
              key={t.label}
              className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-5"
            >
              <p className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted uppercase m-0 mb-1">
                {t.label}
              </p>
              <p className="font-sans font-bold text-[15px] leading-[1.4] m-0">{t.value}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Controls */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Controls
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {controls.map((c) => (
            <div key={c.key} className="ink-card p-6 flex items-center gap-4">
              <span className="shrink-0 font-mono text-sm font-bold border-2 border-foreground bg-tint-red px-4 py-2">
                {c.key}
              </span>
              <p className="font-sans font-medium text-[15px] leading-[1.5] m-0">{c.action}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Rewind mechanic pipeline */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Rewind Mechanic Pipeline
        </h2>
        <div className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-7 md:p-9 mb-14">
          <div>
            {pipeline.map((p, i) => (
              <div
                key={p.step}
                className="flex items-start gap-4 py-4 border-b-2 border-surface last:border-b-0"
              >
                <span className="flex-none w-9 h-9 border-2 border-foreground bg-pop-red flex items-center justify-center font-mono text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-sans font-extrabold text-[15px] tracking-[-0.01em] m-0 mb-0.5">{p.step}</p>
                  <p className="font-sans text-[14px] leading-[1.5] text-secondary m-0">{p.detail}</p>
                </div>
                {i < pipeline.length - 1 && (
                  <span className="text-muted text-lg font-mono self-center">&darr;</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t-2 border-surface">
            <p className="font-mono text-[11px] font-medium text-muted text-center tracking-[0.06em] uppercase m-0">
              <span className="font-semibold text-foreground">Move</span> &rarr;{" "}
              <span className="font-semibold text-foreground">Record history</span> &rarr;{" "}
              <span className="font-semibold text-foreground">Rewind at 2x</span> &rarr;{" "}
              <span className="font-semibold text-foreground">Freeze enemies</span> &rarr;{" "}
              <span className="font-semibold text-foreground">Attack along path</span> &rarr;{" "}
              <span className="font-semibold text-foreground">Cooldown</span>
            </p>
          </div>
        </div>
      </PopIn>

      {/* Back to projects */}
      <PopIn>
        <Link href="/projects" className="ink-btn ink-btn--dark no-underline">
          &larr; ALL PROJECTS
        </Link>
      </PopIn>
    </main>
  );
}

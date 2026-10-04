# Plan: make arcade mode a full game ("Lantern Run")

Status: PLANNED 2026-10-04, not started. Execute in a fresh session (see the kickoff prompt at the bottom).

## Goal

Arcade mode today is a walkable neon hall with quests, NPC dialog, a DJ booth and a skin station. Leo asked for "a full fledged video game". That means a real loop: a goal, challenge with fail states, score, progression, a finale, and a leaderboard. Keep everything that exists (hall, districts, panels, quests, tutorial, CRT look); add a game layer on top. Every minigame is one of Leo's real activities so the game stays personal.

## Design

### Loop
1. Tutorial (exists) → the clock starts.
2. Explore the hall: collect **gold ingots** (元宝) scattered around (18), open districts, meet the 8 friends (exists).
3. Four friends challenge you to a **minigame**; each has a win condition and a score.
4. Finishing all quests + all four minigames triggers the finale: the existing lantern afterparty, then a **scoreboard** with the run time, total score, and a 3-letter arcade initials entry; top 5 saved in localStorage (`ar.scores`), like Phase Spector's leaderboard.
5. Pause menu on Esc when nothing else is open: Resume · How to play · Restart run.

### Score
`ingots × 100 + Σ minigame scores + time bonus (max(0, 600 − seconds) × 5)`. Shown in the HUD next to the quests chip as a gold chip: `元宝 12/18 · 4,250`.

### Minigames (each a Vue overlay in the panel style: black, 1px red border, display font; each must work with taps on mobile and respect reduced motion)

| NPC | Game | Rule | Win | Score |
|---|---|---|---|---|
| The Fencer | **Saber Bout** | "EN GARDE" → random 0.8–2.5 s wait → "ALLEZ!" flash. Press E / Space / tap within the window = your touch; pressing early = touch against; too slow = opponent's touch. Opponent window tightens 320 → 180 ms as the bout goes on. | First to 5 touches | 500 + 100 per touch margin + reaction bonus (avg under 250 ms → +300) |
| The Dancer | **Standard Round** | 32 arrow prompts scroll to a target line in time with the current track (World.update already receives `beat` from the audio layer; use it or a fixed BPM per track). ↑←↓→ or taps on four pads. Perfect / Good / Miss windows 60 / 120 ms. | ≥ 70% hits | 20 per Perfect, 10 per Good, combo ×1.5 at 8+ |
| The Engineer | **Max Flight** | 2D side-view helicopter (rubber-band, like his Science Olympiad event). Space / tap adds lift, gravity pulls; stay airborne, pass through gold rings for bonus; touching floor or ceiling ends the flight. | Flight ≥ 20 s | 10 per second + 50 per ring |
| The Chess Player | **Knight's Capture** | 8×8 board, a knight and 5 pawns. Move the knight (click/tap a legal square) to capture every pawn. Puzzle is generated, then BFS-solved so the optimal move count is known; allowed moves = optimal + 2. | All pawns captured within the move budget | 400 + 100 × (moves under budget) |

Optional if time allows: The Editor's "Deadline" typo hunt. Only with real Spokesman headlines supplied by Leo; do not invent headlines.

### Collectibles
`Ingot` class in `game/`: a small gold boat-shaped ingot (two scaled spheres + a box, emissive `PALETTE.gold`), bobbing and rotating, with a point light at low intensity. Pickup radius 0.9 (walk-through, no E). On pickup: scale-pop + 12 gold particles, WebAudio blip (reuse `audio.ts` chime pattern at a higher pitch), HUD counter ticks. Hidden spots count: behind the DJ booth, on the piste end zone, under the motto sign, next to the skin station, and one on top of the works wall frames you reach by double-jump.

### HUD additions
- Gold score chip (top-left, right of QUESTS). Click → opens the Quests panel on a second tab **SCORES** (top 5 runs: initials · score · time).
- Run clock (mono, top-right under the WebGL stats), starts when the tutorial completes, stops at the finale.
- Pause overlay (Esc): Resume / How to play (controls + the four games, one line each) / Restart run (clears ingots, minigame results, clock; keeps skins and track).

### Finale
After `allDone` and all four minigames won: existing afterparty notification + rainbow lanterns, then a centred scoreboard overlay (display font, red border): time, breakdown, total; initials entry with three big letter wheels (↑↓ or tap to change, E to confirm); writes to `ar.scores`; shows the top-5 table with the new row highlighted.

## Engineering

- New files: `game/Ingot.ts`, `game/minigames/{saber,dance,flight,knight}.ts` (pure logic, unit-testable, no DOM), `ui/Minigame.vue` (shell: title, rules line, Esc to quit), `ui/games/{SaberBout,StandardRound,MaxFlight,KnightsCapture}.vue`, `ui/Pause.vue`, `ui/Scoreboard.vue`.
- `content.ts`: add `MINIGAMES` (id, npcId, title, rule line, Chinese subtitle: 击剑 / 标准舞 / 直升机 / 国际象棋) and `NpcDef.game?: MinigameId`. The NPC dialog's last line offers the challenge ("Up for a bout? [E]").
- `store.ts`: `ingots: number[]`, `games: Record<MinigameId, { won: boolean; best: number }>`, `runStart`, `runEnd`, `activeGame`, `paused`, `scores` (top 5), `score` computed; `uiBlocking` must include `activeGame` and `paused` so WASD does not move the player under an overlay.
- `types.ts`: add `"ingot"` to `InteractKind` (auto, no prompt) and a `GameAction` for pause.
- `Engine.ts`: build ingots from a position list in `content.ts`; update them each tick; `collect(i)` plays the pop; `setIngotsCollected(ids)` on restore.
- `Hud.vue` + `Quests.vue`: score chip, SCORES tab, run clock.
- Mobile: all four games must be playable with taps (pads for Standard Round, a big tap zone for Max Flight, tap squares for Knight's Capture, tap anywhere for Saber Bout).
- Reduced motion: no scrolling arrows (show the next prompt statically with a countdown ring), no particle bursts, no screen shake.
- Performance: ingots share one geometry and one material; particles are a single `Points` pool; minigame canvases run their own RAF only while open and pause the engine loop (`setPaused("game", true)`).

## Tasks (in order; each ends with `npm run build` passing)

1. Ingots: class, placement list, pickup, HUD counter, store persistence across mode switch. Screenshot one.
2. Game shell: `Minigame.vue`, store `activeGame`, NPC challenge line, Esc to quit, `uiBlocking`.
3. Saber Bout (logic file + view + tests of the window logic).
4. Knight's Capture (generator + BFS solver + view).
5. Max Flight (canvas, physics tuned so 20 s is hard but fair).
6. Standard Round (needs the beat source; fall back to a per-track BPM table in `content.ts`).
7. Run clock, pause menu, restart.
8. Finale scoreboard, initials, localStorage top 5, SCORES tab.
9. Mobile pass (pointer: coarse) and reduced-motion pass.
10. Verification: build, Puppeteer screenshots of the hall with ingots, each minigame mid-play, the scoreboard; update `docs/spec-arcade.md` with a "Game layer" section and README.

---

## Kickoff prompt for the executing session

> **Mission.** In `~/myproject/portfolio/web-vue` (Vite + Vue 3 + TypeScript + Three.js r186, not a git repo), turn arcade mode into a complete game by implementing `docs/plan-arcade-game.md` ("Lantern Run") exactly as written: gold-ingot collectibles, four NPC minigames (Saber Bout, Standard Round, Max Flight, Knight's Capture), a run clock, a pause menu, and a finale scoreboard with a local top-5 leaderboard. Done means: every task 1–10 in the plan complete, `npm run build` passes with zero errors, each minigame is playable with keyboard and with taps, reduced motion is respected, and Puppeteer screenshots of the hall with ingots, each minigame, and the scoreboard exist in your scratchpad and were looked at.
>
> **System facts.** Entry `src/modes/arcade/ArcadeApp.vue`; game code in `src/modes/arcade/game/` (Engine, World, Player, Npc, Tutorial, Interactables, textures, audio, CrtPass, CameraRig, Input, types); Vue UI in `src/modes/arcade/ui/`; state in `src/modes/arcade/store.ts` (pinia); copy and palette in `src/modes/arcade/content.ts` (`PALETTE`, `ZH`, `LATIN`, `NPCS`, `QUESTS`, `SKINS`, `SECTIONS`). All facts come from `src/content/leo.ts`; never add a fact that is not there. Dev server: `npm run dev` (port 5180, or 5181 if busy). Build: `npm run build` (runs vue-tsc, strict). Read `docs/spec-arcade.md` first, including the "Personalization pass" section at the end.
>
> **Rules.** No git commits. Do not ask "should I continue"; execute the whole plan. Keep the existing hall, districts, panels, NPC props, lanterns, Chinese/Latin labels and the CRT look untouched unless the plan says otherwise. UI copy in the existing register: display font uppercase labels, mono small labels, red `var(--ar-red)` borders on black, gold `#ffc24a` for score. Buttons get `:active { transform: scale(0.97) }`, hover effects only under `@media (hover: hover) and (pointer: fine)`, exits faster than enters, UI transitions under 300 ms.
>
> **Known traps.** (1) Canvas text must be drawn after fonts load; `ArcadeApp.vue` `fontsReady()` already awaits Archivo, JetBrains Mono and Noto Sans SC, so build minigame canvases after `started`. (2) `textures.ts` imports `PALETTE` from `content.ts`; do not import `textures.ts` from `content.ts` (cycle). (3) `Interactables` fires `autoEnter` once per zone entry for `auto: true` targets; signs open panels on entry, so place ingots away from sign zones or the panel will open while collecting. (4) Keyboard input reaches the player unless `bridge.uiBlocking()` returns true; add `activeGame` and `paused` to `store.uiBlocking` or WASD will move the dumpling under the overlay. (5) The AudioContext unlocks on the first pointerdown/keydown (`audio.unlock()`); minigame sounds before that are silent, which is fine. (6) `prefers-reduced-motion` is read once in `ArcadeApp.vue` (`reducedMotion`) and passed to World/Player/Npc; pass it to the minigames too. (7) The quests panel uses a focus trap (`useFocusTrap` in `context.ts`); reuse it for every new overlay and give the first control `data-autofocus`. (8) Headless screenshots need `puppeteer` from `~/.claude/skills/site-teardown/node_modules` (symlink it into your scratchpad) and Chromium flags `--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`; wait about 2.6 s after `networkidle0` for the preloader, then click `.skip`. (9) `World.update` receives `beat` and `musicOn`; check `game/audio.ts` for how `beat` is derived before building Standard Round, and fall back to a BPM table if it is only an amplitude envelope. (10) Mobile uses `Joystick.vue` and a `JUMP` button; `(pointer: coarse)` is `coarse` in `ArcadeApp.vue`.
>
> **Visibility notice.** You cannot see the planning conversation. Everything you need is in this prompt, `docs/plan-arcade-game.md`, `docs/spec-arcade.md`, and the code. Do not assume other hidden context.
>
> **Self-verify before reporting.** `npm run build` output pasted; grep that no string in the new files states a fact absent from `leo.ts`; each minigame played once in the browser via Puppeteer with a screenshot mid-play; `store.uiBlocking` covers `activeGame` and `paused`; reduced-motion branch exists in every new animation; the top-5 leaderboard survives a reload.
>
> **Output contract.** A short report: what was built per task, build result, screenshot paths, and anything left out with the reason. Update `docs/spec-arcade.md` with a "Game layer" section and the README's arcade row.

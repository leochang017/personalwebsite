# Arcade mode — imitate samsy.ninja/about as closely as possible

Reference screenshots: `docs/ref/samsy/*.jpeg`. `scene-overview.jpeg` = the world before the tutorial overlay (row of red lanterns, cat on the floor, neon signs on the right wall, "DREAM" sign left, floor reflections). `samsy-0-load` … `samsy-7-wheel` = the tutorial sequence (floating red keycaps W/A/S/D + SPACE above the character, mirrored on the floor; then the same with arrow keys; `SKIP` pill; "Now playing…" notification top-right with a headphone icon, Japanese subtitle, track name; FPS stats top-right; sound bars bottom-right). **Look at every screenshot before writing code.**

The original is Vite + Vue 3 + Three.js (WebGPU with WebGL fallback) + GSAP + postprocessing + Howler. It is a game: a character you walk around a dark neon room, NPCs you talk to, quests, skins, a DJ booth with track requests, and a works wall. We reproduce the world, controls, HUD, and game loop with **Leo's content** from `src/content/leo.ts`. We do not copy their code, model, fonts, or sounds.

## Tokens

- Background pure black; accent red `#ff0033`; neon yellow `#f2ff3b` and magenta `#ff3bd4` for wall signs; white text.
- Display font: `var(--font-display)` (Archivo, wght 800, `font-stretch: 88%`, uppercase) for HUD labels, keycaps, and signs. Mono `var(--font-mono)` for stats and dialogs' small labels.
- CRT look: horizontal scanlines (2px period, 12% opacity), slight vignette, 0.4px chromatic aberration, bloom (UnrealBloomPass strength 0.9, radius 0.6, threshold 0.2). Everything emissive glows.

## World

Build it with primitives + CanvasTexture signs (no external models):

- **Room**: a long dark hall ~60×24 units. Floor: `MeshStandardMaterial` black with roughness 0.15 + a planar **Reflector** (`three/examples/jsm/objects/Reflector.js`) mixed at low opacity so lights and the character mirror on the floor (see every screenshot: keycaps and eyes reflected). Walls: black boxes with faint grid lines (CanvasTexture) so depth reads. Fog black, near 10, far 45.
- **Lantern row**: 8 red boxes (0.5 units) with emissive `#ff0033` at y≈2.2 in a line across the back, each with a small `PointLight` (red, intensity 2, distance 6), the middle one carries a small `i` badge sprite. They flicker subtly (noise on intensity).
- **Signs** on the right wall (vertical stack, like the screenshots): CanvasTexture planes with glowing text: `ABOUT`, `WORKS`, `AWARDS`, `CONTACT`, plus a magenta `ニューヨーク→プリンストン` style decorative line, chevrons `»` in red. Left wall: a `DREAM` style sign reads **`BUILD`** in dim cyan. Signs are also the **districts**: standing near one (within 3 units) opens its panel (see Districts).
- **Player**: Leo's mascot, a **dumpling**: a slightly squashed sphere body (`#f3e9dc`, roughness 0.9) with 7 small pleat capsules on top, two **glowing white eyes** (emissive spheres, intensity 2) and a tiny `ω` mouth (CanvasTexture decal). Idle breathing scale 1±0.02 at 1.2Hz; eyes blink every 3–5s (scale y to 0.1 for 90ms). A red glowing **ring** (TorusGeometry, emissive) sits on the floor under the player and rotates slowly; it expands + fades on jump landing.
- **NPCs** (their "friends"): 5 small glowing figures (capsule body, emissive eyes, each a different colour) placed around the hall, each with a floating `!` sprite that bobs: `The Editor` (Spokesman), `The Fencer`, `The Dancer`, `The Teacher` (Ti-Ratana), `The Researcher`. Each has 2–3 dialog lines derived from `leadership`/`experiences`/`facets` text in `leo.ts` (first person, no new facts).
- **DJ booth**: a glowing box with a vinyl disc (rotating cylinder) at one end; near it, `REQUEST A TRACK` prompt. Tracks (names only, we synthesize audio): `Dumpling Drift`, `Blackout Boogie`, `Saber Steps`, `Spokesman Beat`. Audio = WebAudio generated chiptune loop (square bass + noise hats + triangle lead arpeggio from a 16-step pattern per track; gain 0.08). Requesting shows the **Now playing…** notification.
- **Skins station**: a glowing pedestal; interacting cycles the dumpling body colour (`#f3e9dc`, `#ffd1dc`, `#c8f7ff`, `#f6e016`, `#ff0033`). Quest: try all 5.
- **Works wall** (route `work`): a wall of 4 glowing frames along the left side; approaching a frame opens the project panel (see Panels) with `Scroll through all projects` hint and left/right to move.

## Controls & camera

- `W/A/S/D` and arrow keys move (acceleration 0.6, max speed 7 u/s, friction 0.85); `Shift` sprints (×1.6); `Space` jumps (vy 7, gravity −22) with a **double jump**; `E` or `Enter` interacts; `Esc` closes panels. The player faces the movement direction (lerp yaw).
- Camera: third-person follow, offset (0, 5, 9), lookAt player + (0,1,0), position lerp 0.08, slight FOV widen on sprint (60→66). Mouse-wheel zooms between 7 and 13 units.
- Mobile (`pointer: coarse`): a left-bottom virtual joystick (outer circle 110px, knob 48px, red 40% opacity) and a right-bottom `JUMP` round button; tap NPC/sign prompt to interact.
- Collisions: keep the player inside the room bounds; NPCs/booths are circles you can't walk through.

## Preloader → tutorial → play

1. **Preloader**: black screen; two glowing red-white eyes blink in the center with the `ω` mouth below (`samsy-0-load.jpeg` at the very start showed exactly this). A thin red progress bar (2px) under it tracks asset readiness (we have no assets, so animate 0→100 over 1.2s). Then the eyes "open" and the scene fades in (1s) with a brief CRT power-on (vertical scale 0.02→1 over 0.5s, white flash 0.1s).
2. **Tutorial** (`samsy-1..7`): 3D **red keycaps** float 1.8 units above the player's head: `W` above, `A S D` in a row, `SPACE` wide to the right; they are boxes 0.6 units, emissive `#ff0033` with the letter as a CanvasTexture, and they are **mirrored in the floor reflector**. Every 4s the labels swap to arrow glyphs (`↑ ← ↓ →`). Pressing a key lights that cap white for 150ms. After the player has moved in 2 directions and jumped once, caps fly up and vanish, `Tutorial completed!` notification fires, and quest 1 completes. `SKIP` pill at the bottom center (`#ff0033` bg, black text, 13px display) skips it.
3. **HUD** (all in red `#ff0033` unless noted):
   - Top-right mono 11px: `Connected: 1, Engine: WebGL, Frame: X.X ms, NN FPS` (real numbers from the render loop, updated every 500ms).
   - Top-right **notification** card (below the stats, 260px): red bordered box, left square with a headphone glyph (CSS/SVG), right: red filled label `NOW PLAYING…` (or `QUEST COMPLETED`, `TUTORIAL COMPLETED!`), a small grey Japanese subtitle `ノティフィケーション`, and the message in white uppercase 13px revealed line-by-line (clip mask). Slides in from +10px/opacity 0 with 0.3s expo.out; auto hides after 3.5s.
   - Bottom-right **sound toggle**: 4 red bars (3×14px) that animate heights when `soundOn`; click toggles `useModeStore().soundOn` and starts/stops the WebAudio loop. First interaction unlocks AudioContext.
   - Bottom-left area is reserved for the shared mode switch (leave 160×60px free).
   - **Quests button** top-left: `QUESTS 2/6` chip; click opens a panel listing: `Complete the tutorial at the start`, `Visit all sections`, `Talk to all my friends`, `Try on all skins`, `Request all tracks from the DJ`, `Visit all works`, each with a red check when done. Completing all → notification `All quests completed!` + the lanterns pulse rainbow for 4s (`Secret party`).
   - Interaction **prompt**: when near something interactive, a small floating label above it in world space (CSS2D via projecting the position): `[E] TALK` / `[E] OPEN` / `[E] REQUEST` / `[E] CHANGE SKIN`.
4. **Dialog box** (NPC talk): bottom-center panel 560px: black with 1px red border, name label red, text typed out 28 chars/s with a short WebAudio blip every 3 chars (square 880Hz 20ms, gain 0.02); `E` advances lines; closes at the end; marks the NPC talked.
5. **Panels** (districts): a right-side drawer 440px, black, 1px red border, red uppercase display title (`ABOUT`, `WORKS`, `AWARDS`, `CONTACT`), content in white body text 14px/1.5 with red mono labels:
   - ABOUT: `person.bio`, then `facets` as a list, then `skills.focus` chips, languages.
   - WORKS: one project at a time from `projects` (title, category, status, desc, stats as red mono lines, tech chips, links as red underlined), `←/→` to change, index `01/04`.
   - AWARDS: the `awards` list (title · detail · year).
   - CONTACT: email, GitHub, Instagram, resume link, each a glowing red pill.
   Opening a panel marks the section visited.

## Scene feel (what makes it read as the reference)

- Extremely dark; the only light is emissive + point lights; bloom makes caps/eyes/signs halo; scanlines on top; reflections on the floor are essential.
- Subtle camera sway (0.15 units, 0.3Hz) and a faint handheld noise on the post pass.
- Hover sound/pop on HUD buttons (WebAudio 440→880Hz 60ms sweep, gain 0.03).

## Engineering notes

- Entry: `src/modes/arcade/ArcadeApp.vue` (default export). Owns the renderer, world, input, HUD, panels. Reads `useRoute().name`: `home` spawns at the center, `about` spawns next to the ABOUT sign and opens its panel, `work` spawns at the works wall. Navigating between routes while mounted should walk/teleport the player (teleport with a 0.3s black blink).
- Three.js r186: use `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `ShaderPass` (custom CRT shader: scanlines + vignette + chromatic aberration + noise) from `three/examples/jsm/...`. WebGL only (no WebGPU).
- Pause the RAF when the tab is hidden and while `useModeStore().switching` is true; `onUnmounted` disposes geometries/materials/renderer and removes listeners.
- `setPixelRatio(Math.min(devicePixelRatio, 1.5))`; the composer renders at ×0.85 resolution on `pointer: coarse` devices.
- Respect `prefers-reduced-motion`: no camera sway, no flicker, no handheld noise.
- No external images/fonts/code/sounds from the reference. Fonts come from `index.html`.
- TypeScript strict; `npm run build` must pass with zero errors.
- Do not edit: `src/content/leo.ts`, `src/stores/mode.ts`, `src/router.ts`, `src/Root.vue`, `src/App.vue`, `src/main.ts`, `index.html`, `src/styles/base.css`, anything under `src/modes/editorial/`. If you need a change there, say so in your final report instead.


## Personalization pass (2026-10-04)

The structure above still holds (room, camera, controls, HUD positions, CRT). The decorative layer was replaced so the hall reads as Leo's, not the reference's:

- Languages: all katakana removed. Chinese (simplified, Noto Sans SC) for wayfinding: sign subtitles 关于 / 经历 / 作品 / 荣誉 / 联系, place line 普林斯顿 · 新泽西, booth 点歌台 / 点歌, skins 换装. Latin for the HUD "system" voice: NUNTIUS (notification), LABORES (quests), wall motto SAPERE AUDE (replaces the "BUILD/DREAM" sign), name-tag line DISCIPULUS · FABER · INVESTIGATOR. Strings live in `content.ts` (`ZH`, `LATIN`).
- Palette: acid yellow `#f2ff3b` → gold `#ffc24a`; cyan → jade `#6ff0c0`. Red and magenta unchanged (`PALETTE` in `content.ts`).
- Lanterns: cubes → red paper lanterns (ribbed emissive sphere, gold caps, tassel).
- Districts: five, with EXPERIENCE added (routes: /about, /experience, /achievements, /projects each spawn at their sign).
- Panels: ABOUT = bio, photo, stats, skills groups, education (SAT, coursework, independent study), languages. EXPERIENCE = 7 jobs + 5 leadership roles as accordion rows. AWARDS = the full editorial achievements shelf grouped STEM / ATHLETICS / ARTS with medal chips. WORKS and CONTACT unchanged.
- NPCs: eight (Editor, Fencer, Dancer, Intern, Teacher, Researcher, Engineer, Chess Player), lines derived from `leo.ts`, each with a small primitive prop (newspaper, saber, chip, book, bolt, spinning rotor, pawn).
- Floor: a fencing piste beside the Fencer; a chessboard under the Chess Player.
- Wall strips: "invader" pixels → pixel glyphs of a dumpling, saber, pawn, helicopter.
- Skins: Classic, Lotus, Jade, Gold, Chili.

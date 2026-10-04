# leochang.net, two-mode rebuild

Vite + Vue 3 + TypeScript. Two interchangeable looks for the same content:

| Mode | Inspired by | What it is |
|---|---|---|
| **Editorial** | leoparpeix.com | Light, typographic, Lenis smooth scroll, 3D hero scenes, cursor companion, project strips |
| **Arcade** | samsy.ninja/about (structure only) | Dark neon lantern hall you walk around (WASD / arrows / Space), eight NPC "friends" with props, five districts (About, Experience, Works, Awards, Contact), quests, DJ booth, CRT post-processing. Decoration is Leo's: red paper lanterns, Chinese sign subtitles, Latin HUD labels and motto, a fencing piste, a chessboard, pixel glyphs of a dumpling / saber / pawn / helicopter |

The pill at the bottom-left switches modes. The choice persists in `localStorage` and can be forced with `?mode=editorial` or `?mode=arcade`.

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # vue-tsc + vite build → dist/
npm run preview
```

## Layout

```
src/
  main.ts            app bootstrap (pinia, router, base css)
  Root.vue           mounts the active mode + the mode switch
  router.ts          routes shared by both modes: / , /about , /work
  stores/mode.ts     mode + sound preference
  content/leo.ts     ALL of Leo's content (single source of truth)
  shared/            ModeSwitch.vue
  modes/editorial/   EditorialApp.vue + pages + Three.js scenes
  modes/arcade/      ArcadeApp.vue + game/ + ui/
docs/
  spec-editorial.md  the build spec for the editorial mode
  spec-arcade.md     the build spec for the arcade mode
  ref/               screenshots of the two reference sites
public/
  images/, video/, projects/  copied from the previous site
```

## Content rules

Every fact on the site traces to `src/content/leo.ts`, which was ported from the previous site and its chatbot knowledge base. Update that file, not the components, when something about Leo changes.

## Credits

Design direction borrowed from Léo Parpeix (editorial) and Samsy (arcade: camera, HUD layout, CRT look; every decorative element was replaced with Leo's own in Oct 2026, see docs/spec-arcade.md). No code, fonts, models, images, or sounds were taken from either site; everything is reimplemented with Three.js primitives, Google Fonts stand-ins, and WebAudio-generated sound.

# Ink Design System — implementation guide for detail pages

The site was redesigned from a "sticker cartoon" theme to an **ink & paper** design language. All detail pages must be restyled to match. **Preserve ALL real content: text, stats, images, links, metadata exports.** Only the visual language changes.

## Tokens (defined in `src/app/globals.css` @theme)

- Background: `bg-background` (#f2f0ea paper) — page bg comes from body, don't set it
- Ink: `text-foreground` / `border-foreground` (#141310)
- Muted text: `text-muted` (#57534a) · Secondary body: `text-secondary` (#3b3830)
- Band background (alternating sections): `bg-surface` (#e9e5db)
- Hard shadow color: `var(--color-ink-shadow)` (#a39d8f)
- Yellow: `bg-ink-yellow` (#f2c14e) · Green: `bg-ink-go` / `bg-pop-green`
- Pop hues: `bg-pop-purple` (research), `bg-pop-blue`, `bg-pop-green` (active/startup), `bg-pop-red` (game/fencing), `bg-pop-pink`, `bg-pop-amber`
- Tints: `bg-tint-purple`, `bg-tint-green`, `bg-tint-red`

## CSS primitives (globals.css)

- `.ink-card` — white panel, 3px ink border, hard offset shadow, springy hover/press. Add `.ink-card--dashed` for "upcoming" items. Add padding/flex via Tailwind.
- `.ink-chip` — status pill. Variants: `.ink-chip--active` (green, prefix "● "), `.ink-chip--upcoming` (dashed), `.ink-chip--completed` (white/muted).
- `.ink-btn` — rectangular CTA button. Variants: `.ink-btn--dark`, `.ink-btn--yellow`, `.ink-btn--on-dark` (footer only).
- Reveal animation: `import { PopIn } from "@/components/ScrollReveal"` — wrap sections: `<PopIn delay={0.06}>…</PopIn>`. Stagger header elements 0 / 0.06 / 0.12.

## Rules

- **No rounded corners** on cards/panels/images (sharp rectangles). Only chips/badges/buttons that are pills use `rounded-full`.
- Typography: display/headers = `font-sans` (Bricolage) `font-extrabold tracking-[-0.03em]`; micro-labels/kickers/meta = `font-mono` `text-[13px] font-semibold tracking-[0.14em] uppercase text-muted`; body = `font-sans` (15–17px, leading 1.55–1.65).
- Section headers within a page: `font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase` (e.g. "OVERVIEW", "GALLERY").
- Bullet lists: flex rows with a small square marker: `<span className="w-2 h-2 bg-ink-yellow border-2 border-foreground flex-none" />` + `font-sans font-medium text-[15px] leading-[1.5]`.
- Images: wrap in `border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-3`, caption below in `font-mono text-[11px] font-medium text-muted pt-2.5`. No rounding.
- Do NOT use legacy classes: `sticker-card*`, `sticker-chip*`, `sticker-btn*`, `StickerPill`, `TiltCard`, `FloatingDoodles`, `wobble`, `card-upcoming`, `text-accent` (legacy orange usages), `FadeUp/SlideIn/ScaleIn` (replace with `PopIn`).
- Old pages use `pt-24` top padding (from the old fixed navbar). New navbar is sticky/in-flow: use `pt-10 md:pt-12` on main sections instead.
- Page container: `max-w-6xl mx-auto px-6 md:px-12`.

## Experience detail page template (`src/app/experience/*/page.tsx`)

Structure (see `Experience Detail.dc.html` design):

1. Back link: `<Link href="/experience" className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7">← ALL EXPERIENCE</Link>`
2. Grid `lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start`:
   - **Left**: status chip (`.ink-chip .ink-chip--active|--upcoming|--completed`), `<h1>` org name (`font-sans font-extrabold text-4xl md:text-[64px] leading-[0.95] tracking-[-0.03em]`), role line (`font-sans font-bold text-lg md:text-[22px]`), summary paragraph (`text-[17px] leading-[1.65] max-w-[600px]`), bullet list of accomplishments (preserve all real bullets/details from existing page), optional related-project `.ink-btn .ink-btn--dark` link.
   - **Right aside**: white facts card `border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-6 flex flex-col gap-4` with DATES / LOCATION / STATUS (+ HOURS, WEBSITE etc. if the page has them): label `font-mono text-[10.5px] font-semibold tracking-[0.12em] text-muted mb-1`, value `font-sans font-bold text-base`.
3. Below the grid: keep any existing photo galleries, press links, stats, or extra sections, restyled as ink cards/framed images in a `grid sm:grid-cols-2 lg:grid-cols-3 gap-5`.

## Project detail page template (`src/app/projects/*/page.tsx`)

Structure (see `Project Detail.dc.html` design):

1. Back link `← ALL PROJECTS` (same style as above, href `/projects`).
2. Hero: badge row (status badge: `font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground bg-<pop-color> px-[11px] py-1 rounded-full` + role chip `font-mono text-[10.5px] font-semibold border-2 border-foreground px-[11px] py-1 rounded-full`), `<h1>` (`text-5xl md:text-[76px] leading-[0.95] tracking-[-0.04em] font-extrabold`), tagline (`font-sans font-medium text-[21px] leading-[1.45] max-w-[760px]`), meta line (`font-mono text-xs font-medium tracking-[0.06em] text-muted uppercase`), CTA row of `.ink-btn .ink-btn--dark` external links (preserve all real links: GitHub, live site, play-in-browser, paper).
3. Metrics: `grid sm:grid-cols-3 gap-[18px]` of stat cards `border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-[18px]` — number `font-sans font-extrabold text-[38px] tracking-[-0.03em]`, label `font-mono text-[11px] font-semibold tracking-[0.1em] text-muted`.
4. OVERVIEW section (mono kicker header + body ≤760px wide).
5. Content sections, preserving ALL existing real content, e.g.:
   - Stock ML: research figures grid (3 cols) of framed images with `FIG. 01 — caption` mono captions (real figures exist in `/public/images/stock-prediction/`).
   - "In progress" callout (if applicable): `border-[3px] border-dashed border-foreground bg-white p-7` with bullet list and mono footnote.
   - Feature pills: `font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-tint-red px-3.5 py-1.5 rounded-full`.
   - Any existing tech-stack lists, findings, screenshots — restyle, don't delete.

Status colors: research = `bg-pop-purple`, published/accepted = `bg-ink-yellow`, active/startup = `bg-pop-green`, playable/game = `bg-pop-red`.

## Verify

Page must compile (`npm run build` type-checks), keep its `export const metadata`, and contain no legacy sticker classes.

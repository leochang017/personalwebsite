# leochang.net

Personal portfolio site — Next.js App Router, deployed on Vercel at
[leochang.net](https://leochang.net).

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — theme tokens live in `@theme` inside `src/app/globals.css`,
  not in a `tailwind.config` file
- **Framer Motion** for page transitions and scroll reveals
- **Vercel** for hosting; Node 20

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

No environment variables are required — the site is fully static apart from the
chat route, which calls a hardcoded public backend URL.

## Layout

```
src/
  app/
    page.tsx              home
    about/ achievements/
    experience/           index + one page per role (achievable, capitalhealth,
                          chipotle, fencing, mundial, obchessed, scioly,
                          spokesman, tiratana)
    projects/             index + napkinnotes, phasespector, stockml
    api/chat/route.ts     chatbot proxy
    layout.tsx            fonts, metadata, JSON-LD, nav/footer/chatbot shell
    globals.css           design tokens + .ink-* component primitives
  components/             Navbar, Footer, Chatbot, HeroVideo, LogoBanner,
                          Terminal, ScrollReveal, ScrollProgress, CountUp, ...
public/                   images, video, projects, CNAME, robots.txt, sitemap.xml
docs/                     design system notes
teardowns/                reference-site scrapes kept for design inspiration
```

## Design system

The site uses an **ink & paper** visual language: warm paper background (`#f2f0ea`),
near-black ink (`#141310`), 3px borders, hard offset shadows, and a small set of
"pop" accent hues used to categorize content (purple = research, green = active,
red = game/fencing).

Reusable CSS primitives — `.ink-card`, `.ink-chip`, `.ink-btn` and their variants —
are defined in `src/app/globals.css`. Prefer these over ad-hoc styling so detail
pages stay consistent. `docs/ink-design-guide.md` documents every token and
primitive.

## Chatbot

The floating assistant ("Boe Beo") posts to `/api/chat`, which is a thin proxy in
`src/app/api/chat/route.ts`. That route:

- holds the entire system prompt — all of Leo's bio, projects, experience,
  leadership, and awards are inlined there as text, so **updating site content
  usually means updating this prompt too**, or the bot will answer with stale facts
- validates the message payload and rate-limits to 10 requests per minute per IP
- forwards to a separate backend deployment (`portfolio-chatbot-backend-sage.vercel.app`)
  with a 20s timeout, mapping failures to 502/504

The backend itself lives outside this repo.

## Notes

- `next.config.ts` sets security headers (HSTS, nosniff, frame options, referrer
  and permissions policy) on every route.
- It also holds permanent redirects from the old static `.html` URLs to the current
  App Router paths — keep these when renaming routes so existing links don't break.
- `dangerouslyAllowSVG` is enabled because first-party SVG logos in `/public` are
  otherwise rejected by the image optimizer.
- `public/CNAME` pins the custom domain.

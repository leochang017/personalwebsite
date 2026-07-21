# Claude Design Prompt — leochang.net Redesign

> Copy everything below this line into Claude Design.

---

Redesign **leochang.net**, the personal portfolio of **Leo Chang** — a senior at Princeton Day School (Class of 2027) who is simultaneously a published ML researcher, a startup co-founder, a varsity saber fencer, a national dance champion, an editor-in-chief, an award-winning writer, and a volunteer who has spent 6+ years teaching orphaned children in Malaysia.

**The mission:** a site that makes an admission officer, professor, or employer take Leo seriously within 5 seconds — and makes a peer smile within the same 5 seconds. The playful craft of the site itself is evidence of creativity; the content underneath is evidence of substance. Both must be unmistakable.

---

## 1. Audience & the dual mandate

Four audiences will visit, each with different needs:

1. **Admission officers** — skim in 60–90 seconds, often on a phone, between hundreds of files. They need instant legibility: who is this person, what has he actually done, is it real? Every claim should feel verifiable (named professors, named journals, named competitions, real numbers).
2. **Professors & researchers** — will click into the research. They need depth on demand: methodology, figures, publication status, links to repos.
3. **Employers / internship hosts** — want shipped things, real users, and evidence he can work on a team.
4. **Peers** — want personality. The site should feel like Leo, not like a résumé wearing a costume.

**The tension to resolve — this is the core design challenge:**

> **Playful, never childish. Credible, never corporate.**

The site must be **skimmable in 90 seconds** (a busy reader gets the full picture from headlines, badges, and numbers alone) and **rewarding for 10 minutes** (an explorer keeps finding delightful details and deeper content). Design for both reading speeds explicitly.

## 2. First-impression requirement (non-negotiable)

The hero must communicate **"well-rounded, multi-dimensional person"** immediately — not "CS kid with hobbies." Within the first viewport, a visitor should perceive all six facets as one coherent identity:

**researcher · builder · athlete (fencer) · editor & writer · dancer · volunteer**

How you express this is open — a constellation of facets orbiting his name, a hand-drawn "many hats" motif, rotating identity words, an interactive facet-switcher, whatever fits your visual direction — but the *balance* matters: no single facet should dominate the first read, and it must never feel like a list of buzzwords. Make the multiplicity itself the story.

## 3. Content inventory — use this real content, no lorem ipsum

### Identity
- **Leo Chang** — Senior at Princeton Day School (Princeton, NJ), Class of 2027. SAT: 1550.
- Email: leochang017@gmail.com · GitHub: github.com/leochang017 · Résumé PDF available.
- Headline stats: **4 projects · 5 leadership roles · 19+ awards · 750+ work hours · 660+ volunteer hours**.
- Languages: English (native), Chinese (conversational), Latin (academic).
- Bio voice: warm, direct, first-person ("Hi! Welcome… feel free to explore and reach out").

### Projects (4)
1. **LLM Microgrid Agents** — *Active research* with Prof. Yongfeng Zhang (Rutgers CS). Can LLM agents — one per household — negotiate to fairly share limited solar/battery power during a grid outage? 30-household simulation on real NREL data; measuring fairness, robustness to bad information, explainability. Experiments in progress. (Python, NREL ResStock/NSRDB, multi-agent)
2. **Stock ML** — *Accepted for publication in the Journal of Emerging Investigators.* LSTM neural networks predicting stock prices from Twitter sentiment; 80K+ tweets across AAPL, TSLA, MSFT. Lead researcher. Has 7+ research figures available for the detail page. (Python, TensorFlow, NLP)
3. **NapkinNotes** — *Active startup, co-founder.* AI-powered EdTech platform turning handwritten notes into study resources: OCR + Claude summarization, social layer, student marketplace. **80+ regular users, 170+ uploaded notes.** (Flask, PostgreSQL, Claude AI)
4. **Phase Spector** — *Playable game.* "Rewind. Strike. Survive." Top-down wave-based arcade shooter with a time-rewind combat mechanic, mini-bosses, chain-kill multipliers, high-score table. Available to 500+ PDS students. (Godot 4, GDScript)

### Experience (7, reverse-chronological)
- **Rutgers University** — Research Intern with Prof. Yongfeng Zhang, Apr 2026–Present (remote, *active*)
- **Zhongke Guoguang Quantum** — AI/ML Intern, Jun–Jul 2026, Beijing (*upcoming*)
- **Hongik University** — Research Intern with Prof. Eunsoo Choi (civil engineering), Jul–Aug 2026, Seoul (*upcoming*)
- **Chipotle** — Team Member, Sep 2025–May 2026 (real-world work ethic — keep this, it reads as authentic)
- **Mundial Financial** — Investment Banking Intern, Jul–Sep 2025 (built client-facing web pages)
- **Achievable** — Content Marketing Intern, Jul–Oct 2024 (SEO content for EdTech startup)
- **Capital Health** — Junior Volunteer, Jul–Aug 2024 (66+ hospital hours)

### Leadership (5)
- **Ti-Ratana Welfare Society (Malaysia)** — Director, Orphanage Education Program. 600+ hours over 5+ years; weekly Zoom lessons; led a fundraiser raising **$8,000** for e-learning tools.
- **The Spokesman** (school newspaper) — Editor-in-Chief; leads 11 editors and 36 writers/artists/photographers.
- **ObCHESSed** — Co-founder of PDS chess club; grew to 40+ members.
- **Science Olympiad** — Varsity member & club co-head; 3rd Regionals, 5th/6th NJ States (Helicopter, Electric Vehicle).
- **Varsity Fencing** — 4-year varsity saber fencer (fencing since age 6); 2nd NJSIAA Regionals individual & team; NJ State Final qualifier.

### Achievements (19+; highlights)
- 🥇 **1st place, PClassic** programming competition, UPenn, Fall 2024
- 🥇 **USA Dance National DanceSport Champion** (Junior & Youth Pre-Champ), 2024 — as a sophomore
- 🥈 **2nd, NJSIAA Fencing** Regionals (individual & team), 2025
- 🥉 3rd, HackBac Hackathon (social justice theme), 2024
- 4th, National Economics Challenge (California States), 2024
- Science Olympiad: 3rd Regionals (2025, 2026), 5th/6th NJ States (2025, 2026)
- USDC Pro-Am National Finalist (2023, 2025)
- ✍️ Writing: **PYAA Gold Award** ("Dear Lao-Lao," short story, 2026), **2× Scholastic Silver Key** (poetry, 2023 & 2024), published in White Enso Journal and Creative Communications anthologies
- 📄 Research **accepted for publication in the Journal of Emerging Investigators**

### Skills & academics (About page)
- Languages/frameworks: Python, TypeScript/JavaScript, Java, GDScript; Flask, Next.js/React, TensorFlow/Keras, scikit-learn, SQLAlchemy, Anthropic API; PostgreSQL, AWS S3, Google Cloud, Vercel, Godot, pytest & mypy.
- Focus areas: Machine Learning, LLM Agents, Multi-Agent Systems, Full-Stack Web Dev, Data Science, Game Dev.
- Coursework: AP CS A, AP Micro/Macroeconomics, AP Chemistry, AP Comparative Government, Honors Precalculus, Honors Physics, Latin 4 (St. John's University dual enrollment).

### Assets available
Portrait photo, "sky ladder" mountain-climbing hero photo, baby photo (About page charm), fencing/chess/orphanage/hospital photos, organization logos (Rutgers, UPenn PClassic, Scholastic, NJSIAA, USA Dance, JEI, school, etc.), 7+ Stock ML research figures, résumé PDF.

## 4. Site map & per-page briefs

Persistent elements on every page: navbar, footer (email, GitHub, résumé), floating **AI chatbot** ("ask anything about Leo" — keep it; it's a differentiator that demos his AI skills), scroll-progress indicator, page transitions.

- **Home** — Restructure the hierarchy around the 90-second skim:
  1. *Identity hero* — the multi-faceted first impression (§2) + headline stats + primary CTAs (Projects, About, Résumé).
  2. *Proof of depth* — a curated highlight from each dimension: the Rutgers research, the published paper, NapkinNotes' real users, the national dance title, the fencing medal, the $8,000 fundraiser. Each highlight links deeper.
  3. *Pathways* — clear routes into Projects, Experience, Achievements, About.
  The current site buries leadership and athletics below projects; rebalance so a skimmer sees the whole person without scrolling forever.
- **About** — the human page: bio (keep the baby photo — it's charming), the six "what drives me" facets, skills, coursework, languages. This is where personality gets the most room.
- **Projects (index + 4 detail pages)** — index cards with status badges ("Accepted for Publication," "Active," "Playable," "Research in Progress"), tech stacks, real metrics. Detail template must handle: research figures & methodology (Stock ML), product screenshots & user metrics (NapkinNotes), gameplay (Phase Spector), and an honest "experiments in progress" state (Microgrid).
- **Experience (index + detail template)** — timeline treatment distinguishing *active*, *upcoming*, and *completed*. The two upcoming international internships (Beijing, Seoul) deserve visual excitement without overclaiming — they haven't happened yet.
- **Achievements** — the fun one. A trophy-shelf/sticker-collection concept: 13 competition placements + 5 writing awards + the publication, filterable or grouped by domain (STEM / athletics / arts). Gold-silver-bronze visual language welcome, but keep it sophisticated.

## 5. Visual direction — open brief

**Personality words:** playful, warm, hand-crafted, confident, curious.

For reference only: the current site is a warm cartoon "sticker" aesthetic — cream paper background (#f5efe4), thick black outlines, hard offset shadows, candy-colored pill badges, hand-drawn floating doodles, subtle grain, Bricolage Grotesque display type. **That's the spirit, not a constraint.** You are explicitly invited to propose a new, distinctive playful direction — evolve the sticker language, or take playfulness somewhere else entirely (editorial-zine, field-notebook, tactile-paper, hand-illustrated, playful-brutalist…). Bring a point of view; surprise us.

**Requirements regardless of direction:**
- A real design system: full color palette with semantic roles, a typographic scale with genuine hierarchy (display/heading/body/mono), spacing rhythm, and a reusable component language (cards, badges, buttons, timelines, stat blocks).
- Personality lives in the details — custom touches, hand-crafted moments, one or two running visual motifs — not in visual noise.
- Status/credential badges ("Published," "1st Place," "National Champion") must read as *earned*, not decorative.

**Anti-goals — do not produce:**
- The generic dark-mode developer portfolio (navy + neon gradient + glassmorphism).
- Corporate SaaS blandness or template energy.
- Anything childish or elementary-school themed — playful ≠ juvenile; this must impress a professor.
- AI-slop clichés: random gradient meshes, meaningless 3D blobs, emoji as a design system.

## 6. Motion design brief

Playful animation is a headline feature of this redesign — level it up, don't tone it down:

- **1–2 signature moments**: a hero entrance sequence with real choreography (staggered, physical, memorable) and one surprising interaction somewhere that makes visitors want to show a friend.
- **A consistent micro-interaction language**: every hover/press across cards, buttons, and badges shares the same physics personality (springy? squashy? snappy? — pick one and commit).
- **Scroll-triggered reveals** that support reading flow — content should feel like it's *welcoming* you down the page, never withholding it. Count-up animations on stat numbers.
- **Page transitions** between routes that reinforce the theme.
- **Constraints**: transform/opacity only (60fps on mid-range phones); full `prefers-reduced-motion` fallbacks; motion never delays access to content — a skimmer scrolling fast must never wait for an animation to finish to read something.

## 7. Practical constraints

- Design for implementation in **Next.js (App Router) + Tailwind CSS v4 + Framer Motion**, deployed on Vercel. Use Google-Fonts-available typefaces.
- **Fully responsive, mobile-first** — assume admission officers open this on a phone from a link in an application. The 90-second skim must work on a 375px screen.
- **WCAG AA** contrast for all text; visible focus states; semantic heading structure.
- **Fast**: no heavy hero videos or giant image backdrops; the playfulness should come from vector/CSS/motion, not megabytes.
- Keep the floating AI chatbot entry point and the existing page inventory (don't add or remove pages).

## 8. Deliverables & quality bar

Deliver a cohesive full-site design: the design system (colors, type, components, motion language) plus layouts for Home, About, Projects index + project detail template, Experience index + experience detail template, and Achievements, at mobile and desktop widths.

Before finishing, self-review against:
1. **The 5-second test, per audience**: Would an admission officer think "impressive and real"? Would a professor think "serious about research"? Would a peer think "this is so cool"?
2. **The balance test**: Playful but never childish; credible but never corporate; all six facets of the identity present in the first impression.
3. **The skim test on mobile**: headlines + badges + numbers alone tell the whole story in 90 seconds at 375px.
4. **The honesty test**: nothing overclaims — upcoming internships read as upcoming, in-progress research reads as in-progress.

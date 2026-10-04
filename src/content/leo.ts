/**
 * Single source of truth for Leo's content. Every fact here traces to the
 * previous leochang.net site (its pages and chatbot knowledge base). Do not
 * invent claims. Plain, specific language; no slogans.
 */

export const person = {
  name: "Leo Chang",
  tagline: "Senior at Princeton Day School, Class of 2027",
  school: "Princeton Day School",
  classOf: 2027,
  location: "Princeton, NJ",
  email: "leochang017@gmail.com",
  github: "https://github.com/leochang017",
  instagram: "https://www.instagram.com/leo.c000/",
  resume: "/LeoChangResume_October2026.pdf",
  photo: "/images/Leo.jpeg",
  heroVideo: "/video/hero.mp4",
  heroVideoWide: "/video/hero-wide.mp4",
  heroPoster: "/video/hero-poster.jpg",
  /** still photo used in the home intro card */
  introPhoto: "/images/lake.jpg",
  /** Home intro, from the previous site's About page. */
  intro:
    "Hi! Welcome to my personal portfolio website. My name is Leo Chang, and I am a senior at Princeton Day School. I have great interests in computer science, economics and finance, and writing, with a particular passion for machine learning, LLM agent systems, and creative writing. For the past six years I have also taught weekly lessons to children at an orphanage in Malaysia. Feel free to explore, and reach out by email if you have questions or opportunities to discuss.",
  bio: "Senior at Princeton Day School (Class of 2027) in Princeton, NJ. Student, builder, researcher, and community leader with primary interests in computer science, economics and finance, and writing, and a particular passion for machine learning, LLM agent systems, and creative writing.",
};

/* ───────────────────────────── Projects ───────────────────────────── */

export type ProjectVisual =
  | { kind: "video"; src: string; poster: string; caption: string }
  | { kind: "logo"; src: string; alt: string; bg?: string }
  | { kind: "figures"; items: { src: string; caption: string }[] }
  | { kind: "embed"; src: string; title: string; note: string; fullscreenHref: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  role: string;
  year: string;
  team: string;
  tagline: string;
  /** one-paragraph summary (lists, arcade panel) */
  desc: string;
  /** full write-up, several paragraphs */
  overview: string[];
  keyFinding?: { headline: string; detail: string };
  highlights: string[];
  stats: string[];
  tech: string[];
  visual: ProjectVisual;
  logo?: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "microgrid",
    title: "LLM Microgrid Agents",
    category: "Research",
    status: "Research complete · paper drafted for an AAAI-27 workshop",
    role: "Researcher",
    year: "Apr 2026 – Present",
    team: "With Prof. Yongfeng Zhang, Rutgers Computer Science",
    tagline: "Can LLM agents, one per household, negotiate in plain English to fairly share limited solar and battery power during a grid outage?",
    desc: "Research with Prof. Yongfeng Zhang (Rutgers CS) on whether a population of LLM agents, one per household, can negotiate peer-to-peer in plain English to share limited solar and battery power during a simulated 24-hour outage. In a deterministic 30-household simulation, live agents beat a zero-LLM control by 5.8 points of served load on every clean seed, closing 29% of the gap to a perfect-information oracle, with fairness improving at the same time.",
    overview: [
      "Climate disasters cause long grid outages, and households ride them out very unequally: some have rooftop solar and large batteries, others only small batteries. Classical optimization can allocate a neighborhood's energy fairly, but it assumes a central controller with perfect, pre-formalized information, and it cannot explain its decisions to the residents who live with them.",
      "This research asks whether a population of LLM agents, one per household, can close that gap by negotiating peer-to-peer in natural language: reporting needs, updating beliefs about neighbors from nothing but what peers say, making binding commitments to transfer energy, and justifying their actions afterward. The agents work with limited and potentially inaccurate information, just as real neighbors would.",
      "The infrastructure is a deterministic 30-household discrete-time simulator (15-minute ticks, one 24-hour outage, synthetic load and solar profiles) with realistic battery physics; a zero-LLM control that runs identical machinery with deterministic policies; a linear-programming oracle with perfect information as the upper bound; and an LLM-agent layer (Claude Haiku 4.5 agents, a Claude Sonnet judge) whose beliefs come only from peer messages and whose energy-transfer commitments bind. 424 automated tests, strict type checking, GitHub Actions CI, and every number reproducible at $0 from committed caches.",
      "Earlier naive versions of the agent layer lost to simple heuristics. The result flipped only after reworking how information flows, so that beliefs come solely from peer reports and negotiated commitments actually bind. Stress tests show where the approach bends and where it breaks: agents stayed ahead under defection (+2.3 points) and observation noise (+0.9), but a strict two-messages-per-tick budget reversed the ordering (−0.86), showing the bandwidth cost of natural-language coordination.",
    ],
    keyFinding: {
      headline: "+5.8 ± 1.0 points of served load over a zero-LLM control, on all 3 of 3 clean seeds",
      detail: "That closes 29.0% ± 2.9 of the gap between the control and a perfect-information oracle, with distributional fairness improving at the same time: no efficiency-versus-equity tradeoff. An LLM judge distinct from the agent model found the agents' explanations actionable and consistent with their actions.",
    },
    highlights: [
      "Deterministic 30-household simulator with real battery physics and a 24-hour outage scenario",
      "Zero-LLM control and a linear-programming oracle bracket the agents from below and above",
      "Belief updates from peer messages only; negotiated energy transfers are binding commitments",
      "Stress-tested against defectors, observation noise, and a tight messaging budget",
      "424 automated tests, mypy strict, GitHub Actions CI; results reproducible at $0 from caches",
    ],
    stats: ["+5.8 pts served load", "29% of oracle gap closed", "424 tests"],
    tech: ["Python", "Anthropic API", "Multi-agent systems", "Linear programming (HiGHS)", "NumPy/SciPy"],
    visual: {
      kind: "video",
      src: "/video/microgrid-day.mp4",
      poster: "/video/microgrid-day-poster.jpg",
      caption: "A recorded day in the simulated neighborhood, from the live research demo",
    },
    logo: "/images/rutgers.svg",
    links: [
      { label: "Research demo", href: "https://microgrid-llm-coordination.vercel.app" },
      { label: "GitHub", href: "https://github.com/leochang017/microgrid-llm-coordination" },
    ],
  },
  {
    slug: "stockml",
    title: "Stock Price Prediction ML",
    category: "Research · publication",
    status: "Accepted for publication in the Journal of Emerging Investigators",
    role: "Lead researcher",
    year: "Jun 2024 – 2025",
    team: "With Aditya Saraf (Cornell) and Jenjen Chen",
    tagline: "Does Twitter sentiment actually help LSTM stock prediction? A three-stock, 80K-tweet study says no.",
    desc: "Lead researcher of a peer-reviewed study, accepted by the Journal of Emerging Investigators, testing whether Twitter sentiment improves LSTM stock prediction for AAPL, TSLA, and MSFT. Adding sentiment raised average RMSE by about 32% and contributed under 5% of predictive importance, evidence against the naive integration of social-media sentiment into price models.",
    overview: [
      "This research investigates whether incorporating Twitter sentiment improves LSTM-based stock price prediction. The study tested Apple, Tesla, and Microsoft, comparing baseline technical-indicator models against sentiment-enhanced variants over one year of data: a Kaggle dataset of 80,793 tweets covering 25 stocks (September 2021 to September 2022), filtered to the three target stocks and scored with TextBlob.",
      "A one-layer baseline LSTM trained on 21 technical indicators was compared against a three-layer sentiment-augmented LSTM that added five daily sentiment metrics (mean, standard deviation, count, minimum, and maximum polarity) over 60-day input windows, with batch normalization and L2 regularization. Both models used early stopping and dropout and were validated with five-fold time-series cross-validation that preserves chronological order.",
      "Contrary to common assumptions in financial machine learning, sentiment features consistently degraded accuracy: average RMSE rose 32.1% (AAPL +39.7%, TSLA +32.5% with p = 0.003, MSFT +24.3%). The sentiment models showed signs of overfitting, with smaller training losses but larger validation losses, and permutation importance showed sentiment contributed less than 5% of predictive importance. Public tweet sentiment appears to carry too little signal for large-cap technology stocks, and may add noise instead.",
    ],
    keyFinding: {
      headline: "Sentiment-enhanced models underperformed the baseline by about 32% average RMSE",
      detail: "Across all three stocks, adding Twitter sentiment features to the LSTM made predictions worse than technical indicators alone. Only Tesla's degradation was statistically significant (t = 6.50, p = 0.003).",
    },
    highlights: [
      "80,793-tweet Kaggle dataset filtered to AAPL, TSLA, and MSFT and scored with TextBlob",
      "21 technical indicators plus 5 sentiment metrics over 60-day windows",
      "Five-fold time-series cross-validation, paired t-tests, permutation feature importance",
      "Seven figures covering model performance, per-stock predictions, significance, and directional accuracy",
    ],
    stats: ["80K+ tweets", "3 stocks", "7 figures", "Peer reviewed"],
    tech: ["Python", "TensorFlow/Keras", "scikit-learn", "TextBlob", "SciPy", "pandas"],
    visual: {
      kind: "figures",
      items: [
        { src: "/images/stock-prediction/Figure1_Model_Performance_Comparison.png", caption: "Fig. 1 · Model performance comparison" },
        { src: "/images/stock-prediction/Figure2_AAPL_Price_Predictions.png", caption: "Fig. 2 · AAPL price predictions" },
        { src: "/images/stock-prediction/Figure3_TSLA_Price_Predictions.png", caption: "Fig. 3 · TSLA price predictions" },
        { src: "/images/stock-prediction/Figure4_MSFT_Price_Predictions.png", caption: "Fig. 4 · MSFT price predictions" },
        { src: "/images/stock-prediction/Figure5_Statistical_Significance_Analysis_v2.png", caption: "Fig. 5 · Statistical significance" },
        { src: "/images/stock-prediction/Figure6_Permutation_Feature_Importance.png", caption: "Fig. 6 · Permutation feature importance" },
        { src: "/images/stock-prediction/Figure7_Directional_Accuracy_Comparison_v2.png", caption: "Fig. 7 · Directional accuracy" },
      ],
    },
    logo: "/images/JEI.png",
    links: [{ label: "Journal of Emerging Investigators", href: "https://emerginginvestigators.org" }],
  },
  {
    slug: "napkinnotes",
    title: "NapkinNotes",
    category: "Web app",
    status: "Live at napkinnotes.net",
    role: "Co-founder and lead developer",
    year: "Aug 2025 – May 2026",
    team: "Personal project, built for Princeton Day School students",
    tagline: "A full-stack web app that turns raw class notes into organized, searchable study resources.",
    desc: "Co-founder and lead developer of a full-stack web app that turns handwritten scans, PDFs, and Word documents into organized, searchable study resources: OCR with Google Cloud Vision and PyMuPDF, Claude summarization, a social layer with follows and comments, and a student marketplace. 100+ Flask routes, 31 SQLAlchemy models, and OWASP-aligned audit logging. A personal project, not a company.",
    overview: [
      "NapkinNotes combines optical character recognition, Claude-driven summarization, and a peer-to-peer social layer in one platform. Students upload notes in any format (handwritten scans, PDFs, Word documents, or plain text) and the app extracts, processes, and summarizes the content automatically. Course-level organization keeps study materials structured, and a student marketplace with photo galleries, favorites, and on-campus meetup scheduling extends the platform beyond notes.",
      "Under the hood: Flask 3.1 with SQLAlchemy 2.0 on PostgreSQL, Google Cloud Vision and PyMuPDF for OCR, the Claude API for summaries, AWS S3 with presigned URLs for batch uploads, dual authentication (Google OAuth through Authlib and email/password with bcrypt), Flask-Limiter rate limiting, and a full admin panel with content moderation, marketplace oversight, a user-alias mode, and OWASP-aligned audit logging. 100+ routes, 31 models, 50 Jinja templates.",
      "Timeline: ideation in August 2025, a development sprint through September, then launch and iteration until May 2026. The site remains live.",
    ],
    highlights: [
      "OCR from scans, PDFs, and DOCX, then Claude-powered summaries",
      "Social layer: follow, like, comment, bookmark; course organization",
      "Student marketplace with photo galleries, favorites, and meetup scheduling",
      "Google OAuth and email/password auth, rate limiting, bcrypt, CSRF and CSP hardening",
      "Admin panel with moderation, audit logging, and user-alias mode",
    ],
    stats: ["100+ routes", "31 models", "50 templates"],
    tech: ["Flask", "PostgreSQL", "SQLAlchemy", "Claude API", "Google Cloud Vision", "AWS S3", "Google OAuth"],
    visual: {
      kind: "video",
      src: "/video/napkinnotes-tour.mp4",
      poster: "/video/napkinnotes-tour-poster.jpg",
      caption: "A walkthrough of the app on a demo school account: sign-in, the notes feed, a note with its summary and comments, search, saved notes, profile, and upload",
    },
    logo: "/images/napkinnotes-logo.png",
    links: [
      { label: "napkinnotes.net", href: "https://napkinnotes.net" },
      { label: "Instagram", href: "https://instagram.com/napkinnotes27/" },
    ],
  },
  {
    slug: "phasespector",
    title: "Phase Spector",
    category: "Game",
    status: "Completed · playable in the browser",
    role: "Co-developer and designer (3-person team)",
    year: "Jan – May 2026",
    team: "Team of 3",
    tagline: "Rewind. Strike. Survive. A top-down arcade shooter where your only weapon is retracing your own movement.",
    desc: "Co-developer and designer of a top-down wave-based arcade shooter built in Godot 4.6 around a time-rewind combat mechanic: record about two seconds of movement, then rewind at double speed to damage enemies along your trail and deflect projectiles. Three enemy types, mini-bosses every fifth wave, a chain-kill multiplier, and a persistent top-5 leaderboard. Available to 500+ PDS students.",
    overview: [
      "Instead of conventional attacks, the player records about 1.9 seconds of movement (112 physics frames at 60 Hz; each powerup adds about 0.4 s, with no cap), then rewinds through it at 2x, dealing 100 damage to enemies caught in the trail and deflecting projectiles back at attackers for 50. The player has five lives, with invincibility frames after damage and after a rewind.",
      "Waves scale endlessly. Three enemy types (melee chargers, ranged shooters, and mini-bosses every fifth wave) force constant repositioning; mini-bosses cycle spread shots, aimed bursts, and telegraphed melee dives. Mini-boss kills drop powerups that extend the rewind buffer, and every third one drops a healing pickup. A chain-kill multiplier climbs from 1.0x to 2.0x inside a six-second window, and a persistent top-5 leaderboard keeps score.",
      "Built in Godot 4.6 with GDScript: wave-based spawning, Area2D collision, a signal-driven architecture, dynamic scene instancing, a position-history ring buffer for the rewind, and a group-based pause system. Exported to HTML5 so it runs in the browser.",
    ],
    highlights: [
      "Time-rewind attack: record ~1.9 s of motion, rewind at 2x, damage along the trail",
      "Melee chargers, ranged shooters, multi-pattern mini-bosses every fifth wave",
      "Powerups extend the rewind buffer; healing pickups restore a life",
      "Chain-kill multiplier 1.0x to 2.0x and a persistent top-5 leaderboard",
    ],
    stats: ["500+ PDS players", "3 enemy types", "Godot 4.6"],
    tech: ["Godot 4", "GDScript", "HTML5 export"],
    visual: {
      kind: "embed",
      src: "/projects/phase-spector/phase-spector.html",
      title: "Phase Spector, playable",
      note: "Arrow keys to move · Space to rewind",
      fullscreenHref: "/projects/phase-spector/phase-spector.html",
    },
    links: [{ label: "Open fullscreen", href: "/projects/phase-spector/phase-spector.html" }],
  },
];

/* ──────────────────────────── Experience ──────────────────────────── */

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  status: "active" | "completed";
  focus?: string;
  /** one-paragraph summary */
  desc: string;
  /** full write-up */
  details: string[];
  highlights: string[];
  tags: string[];
  logo: string;
  photo?: { src: string; alt: string; credit?: string };
};

export const experiences: Experience[] = [
  {
    org: "Hongik University",
    role: "Research Intern, Prof. Eunsoo Choi's Civil Engineering Lab",
    period: "Aug 2026",
    location: "Seoul, South Korea",
    status: "completed",
    focus: "Shape memory alloy fibers in concrete",
    desc: "Four weeks in one of the leading labs internationally in its niche, shape memory alloy fibers embedded in cementitious composites for post-earthquake crack closure: daily experiments alongside graduate students, mechanical testing of SMA wires and fibers, and computer simulations analyzing my own test data.",
    details: [
      "In August 2026 I spent four weeks in Prof. Eunsoo Choi's civil engineering lab at Hongik University in Seoul, one of the leading groups internationally in its niche: shape memory alloy fibers embedded in cementitious composites.",
      "The idea in plain terms: shape memory alloy is \"memory metal.\" Bend it and heat it, and it pulls itself back straight. The lab threads SMA fibers through concrete so that after an earthquake, the fibers buried inside clamp cracks closed. The applications are earthquake-resistant structures and self-healing concrete.",
      "I ran daily experiments with the graduate students, including mechanical testing of SMA wires and fibers, and built computer simulations analyzing my own test data. I handled fine SMA wire for the mechanical tests, and my results fed the lab's ongoing research.",
    ],
    highlights: [
      "Ran daily experiments alongside graduate students in a leading lab in its niche",
      "Mechanical testing of SMA wires and fibers",
      "Built computer simulations analyzing test data from experiments I took part in",
      "Results from my experiments fed the lab's ongoing research",
    ],
    tags: ["Materials testing", "Data analysis", "Simulation", "Lab research"],
    logo: "/images/hongik.svg",
    photo: { src: "/images/orgs/hongik-university.jpg", alt: "Hongik University main building, Seoul", credit: "IMKSv, Wikimedia Commons, CC BY-SA 4.0" },
  },
  {
    org: "Zhongke Guoguang Quantum (GGQuanta)",
    role: "AI/ML Intern, Multi-Agent Systems & Web",
    period: "Jul 2026",
    location: "Beijing, China (on-site)",
    status: "completed",
    focus: "Agent skills and the company website",
    desc: "At China's first photonic quantum chip company: wrote and stress-tested agent skills that shipped in QuantaMate, its AI research assistant, at the July 2026 commercial launch, and developed the company's production bilingual English-Chinese website with an interactive 3D model of the chip.",
    details: [
      "In July 2026 I interned on-site in Beijing at Zhongke Guoguang Quantum (GGQuanta), China's first photonic quantum chip company. My main work was on QuantaMate, the company's AI research assistant for quantum researchers, which launched publicly on July 8, 2026.",
      "I wrote skills, modular capabilities that teach its agents new tasks, then stress-tested how reliably the agents completed them, tracking down the specific conditions that made each one break rather than just flagging that it did. The skills I wrote were test-verified and shipped in the commercial product.",
      "I also developed the company's production public website, bilingual in English and Chinese, with an interactive 3D model of the chip, revised daily through a senior engineer's detailed code reviews until it met the bar to ship.",
    ],
    highlights: [
      "Authored and tested agent skills that shipped in QuantaMate at its July 2026 launch",
      "Stress-tested every skill and pinned down the specific conditions that made each one break",
      "Developed the production bilingual English-Chinese website",
      "Built an interactive 3D model of the company's photonic chip for the site",
    ],
    tags: ["AI agents", "Skill authoring", "Stress testing", "Web development", "3D web graphics", "Bilingual content"],
    logo: "/images/ggquanta-mark.png",
    photo: { src: "/images/orgs/ggquanta-office-park.jpg", alt: "The office park where GGQuanta is based", credit: "GGQuanta" },
  },
  {
    org: "Rutgers University",
    role: "Research Intern, Prof. Yongfeng Zhang, Computer Science",
    period: "Apr 2026 – Present",
    location: "Remote",
    status: "active",
    focus: "LLM agents sharing energy during a blackout",
    desc: "Research on whether LLM agents, one per household, can negotiate in plain English to fairly share energy across a neighborhood during a grid outage. Built and tested a 30-household simulation; live agents beat a zero-LLM control by 5.8 points of load served. Paper drafted for an AAAI-27 workshop.",
    details: [
      "Direct collaboration with Prof. Yongfeng Zhang at Rutgers Computer Science on the LLM Microgrid Agents project: a deterministic 30-household simulator, a zero-LLM control, a linear-programming oracle, and an LLM-agent layer whose beliefs come only from peer messages and whose commitments bind.",
      "On all three clean seeds, live agents raised total served load by 5.8 ± 1.0 percentage points over the control, closing 29.0% ± 2.9 of the gap to a perfect-information oracle while fairness improved. Stress tests under defection, noise, and a tight messaging budget show where the approach holds and where it breaks. See the project write-up for the full method and results.",
    ],
    highlights: [
      "Designed and built the 30-household simulator, control, and oracle",
      "Reworked information flow so beliefs come from peers only and commitments bind",
      "424 automated tests, strict typing, CI; every number reproducible from committed caches",
      "Paper drafted for an AAAI-27 workshop",
    ],
    tags: ["LLM agents", "Multi-agent systems", "Python", "Anthropic API", "Research"],
    logo: "/images/rutgers.svg",
    photo: { src: "/images/orgs/rutgers-core-building.jpg", alt: "The CoRE building, home of Rutgers Computer Science", credit: "Tomwsulcer, Wikimedia Commons, CC0" },
  },
  {
    org: "Chipotle Mexican Grill",
    role: "Team Member",
    period: "Sep 2025 – May 2026",
    location: "Yardley & Warrington, PA",
    status: "completed",
    desc: "Built 200+ orders daily at the counter and for online pickup during peak lunch and dinner rushes, maintained food-safety and hygiene protocols across all stations, and coordinated shift transitions across prep, rush, transition, and close.",
    details: [
      "Worked at Chipotle locations in Yardley and Warrington, PA, delivering fast, friendly service in a high-volume environment that demanded precision, speed, and teamwork every shift.",
      "On a given day I built 200+ orders during peak rushes while keeping strict food-safety and hygiene protocols across stations, coordinated closely with teammates on shift transitions, and managed time-sensitive tasks where every second counted. The job sharpened staying calm under pressure and communicating clearly with a diverse team.",
    ],
    highlights: [
      "200+ orders daily during peak lunch and dinner rushes",
      "Strict food safety and hygiene protocols across all stations",
      "Coordinated prep, rush, transition, and close with the team",
    ],
    tags: ["Customer service", "Teamwork", "Food safety", "Time management"],
    logo: "/images/chipotle.png",
    photo: { src: "/images/orgs/chipotle-restaurant.jpg", alt: "A Chipotle Mexican Grill restaurant", credit: "Rick Obst, Wikimedia Commons, CC BY 4.0" },
  },
  {
    org: "Mundial Financial Group",
    role: "Intern, Investment Banking",
    period: "Jul – Sep 2025",
    location: "Remote",
    status: "completed",
    focus: "Website redesign",
    desc: "Led a complete website redesign for a financial-services firm, working directly with the CEO: competitor analysis across 10+ industry sites, all major site copy, and the firm's social media and content calendar.",
    details: [
      "As an intern at Mundial Financial Group, I led a complete website redesign for the firm, translating business requirements into a professional, modern web presence. I analyzed 10+ industry competitor websites to benchmark design patterns, messaging, and user-experience practices, and that research shaped the content and design decisions behind the new site.",
      "Beyond the website, I authored and optimized all major web content pages, managed the company's social media presence and content calendar, and researched and integrated timely financial news and strategies into the firm's marketing materials.",
    ],
    highlights: [
      "Led a complete website redesign for a financial services firm",
      "Competitive analysis of 10+ industry websites",
      "Authored and optimized all major web content pages",
      "Managed social media presence and the content calendar",
    ],
    tags: ["Web design", "Content writing", "SEO", "Social media", "Financial analysis", "Figma"],
    logo: "/images/mundiallogo3.png",
    photo: { src: "/images/mundiallogo3.png", alt: "Mundial Financial Group", credit: "Mundial Financial Group" },
  },
  {
    org: "Achievable, Inc.",
    role: "Content Marketing Intern",
    period: "Jul – Oct 2024",
    location: "Remote",
    status: "completed",
    focus: "15+ articles",
    desc: "Authored 15+ researched blog posts on test-prep topics and guest posts for partner sites at an EdTech startup specializing in test preparation, working fully independently.",
    details: [
      "At Achievable, an EdTech startup specializing in test preparation, I created educational content that drove organic traffic and reinforced the brand's authority. Working independently and remotely, I wrote 15+ blog posts covering exam breakdowns, study strategies, and in-depth guides to specific test sections, each researched and optimized for search.",
      "I also contributed guest posts published on external partner sites, extending the company's reach and building backlinks. The role demanded self-direction, consistent output, and translating complex exam topics into accessible writing.",
    ],
    highlights: [
      "15+ blog posts on test-prep topics",
      "Guest posts published on external partner sites",
      "Independent research on exam trends and study strategies",
    ],
    tags: ["Content marketing", "Research", "SEO", "Content strategy"],
    logo: "/images/achievable-logo.png",
    photo: { src: "/images/achievable-logo.png", alt: "Achievable", credit: "Achievable" },
  },
  {
    org: "Capital Health Regional Medical Center",
    role: "Junior Volunteer",
    period: "Jul – Aug 2024",
    location: "Trenton, NJ",
    status: "completed",
    focus: "66+ hours",
    desc: "66+ hours of hospital volunteer work across nursing-unit support roles: the Comfort, Book, Tea, and Art cart programs, patient support, administrative work, and discharge-packet assembly. Holds a volunteer certificate.",
    details: [
      "During the summer of 2024 I completed 66+ hours of hands-on volunteer work at Capital Health Regional Medical Center, rotating through nursing-unit support roles across departments and patient populations.",
      "My responsibilities ranged from direct patient interaction through the hospital's cart programs (Comfort, Book, Tea, and Art carts) to administrative work like organizing patient files, data entry, and preparing discharge packets. The experience gave me a real appreciation for empathy in patient care and for how much organization and attention to detail matter in a medical setting.",
    ],
    highlights: [
      "66+ hours across nursing-unit support roles",
      "Comfort, Book, Tea, and Art cart programs",
      "Patient files, data entry, and discharge packets",
    ],
    tags: ["Patient care", "Data entry", "Communication", "Healthcare"],
    logo: "/images/capitalhealth2.jpg",
    photo: { src: "/images/orgs/capital-health-entrance.jpg", alt: "Main entrance of Capital Health Regional Medical Center, Trenton", credit: "Famartin, Wikimedia Commons, CC BY-SA 4.0" },
  },
];

/* ──────────────────────────── Leadership ──────────────────────────── */

export type Leadership = {
  org: string;
  role: string;
  period: string;
  location: string;
  status: "active" | "completed";
  desc: string;
  details: string[];
  highlights: string[];
  tags: string[];
  logo: string;
  photo?: { src: string; alt: string; credit?: string };
  links?: { label: string; href: string }[];
};

export const leadership: Leadership[] = [
  {
    org: "Ti-Ratana Welfare Society",
    role: "Director, Orphanage Educational Program",
    period: "Mar 2020 – Present",
    location: "Kuala Lumpur, Malaysia (remote)",
    status: "active",
    desc: "Initiated and direct a remote education program for children at one of Kuala Lumpur's largest independent charitable NGOs: weekly Zoom lessons in English and science for 6+ years, 600+ volunteer hours, and an $8,000+ fundraiser for e-learning tools. Featured in Malaysian press.",
    details: [
      "Ti-Ratana Welfare Society is one of the largest independent charitable NGOs in Kuala Lumpur, Malaysia, housing over 70 children across three homes regardless of race and creed.",
      "I initiated a remote educational program providing weekly Zoom lessons in English and science to children in the homes who would otherwise lack access to quality educational resources, and I personally teach the weekly lessons, developing and delivering the curriculum. I led a community fundraiser raising $8,000+ for e-learning tools (a projector, laptop, and microphone), and I manage rotating student volunteers.",
      "The program was featured in a Malaysian newspaper for its community impact. Over 600 volunteer hours across 6+ years.",
    ],
    highlights: [
      "Initiated the remote education program from scratch in 2020",
      "Weekly Zoom lessons in English and science, taught personally",
      "Led a community fundraiser raising $8,000+ for e-learning tools",
      "Featured in Malaysian press; 600+ volunteer hours over 6+ years",
    ],
    tags: ["Community service", "Curriculum development", "Teaching", "Fundraising", "Program direction"],
    logo: "/images/orphanagelogo.png",
    photo: { src: "/images/Orphanage.jpg", alt: "Malaysian newspaper coverage of the fundraiser and remote English lessons", credit: "Ti-Ratana Welfare Society" },
  },
  {
    org: "The Spokesman",
    role: "Editor in Chief",
    period: "Sep 2023 – Present",
    location: "Princeton Day School",
    status: "active",
    desc: "Rose from Associate Editor to Online Editor to Editor in Chief of the school newspaper. Lead a team of 11 editors and manage 36 writers, artists, and photographers across print and digital; oversee editorial decisions, the publication schedule, and digital strategy.",
    details: [
      "Progressed from Associate Editor (grade 9) to Online Editor (grade 10) to Editor in Chief (grades 11 and 12) of The Spokesman, Princeton Day School's newspaper at thespokesman.net.",
      "As Editor in Chief I lead the editorial team of 11 editors and manage 36 writers, artists, and photographers; run digital content strategy across print and online; edit, review, and publish student articles; keep the publication schedule and editorial calendar; and oversee all editorial decisions, balancing journalistic integrity with student development.",
    ],
    highlights: [
      "Associate Editor → Online Editor → Editor in Chief",
      "Lead 11 editors and 36 writers, artists, and photographers",
      "Digital content strategy across print and online",
    ],
    tags: ["Editorial leadership", "Digital media", "Team management", "Writing"],
    logo: "/images/spokesman-logo-alt.png",
    photo: { src: "/images/orgs/spokesman-masthead.jpg", alt: "Leo Chang, Editor-in-Chief, on the 2026 Spokesman masthead", credit: "The Spokesman, thespokesman.net/masthead" },
    links: [
      { label: "thespokesman.net", href: "https://thespokesman.net" },
      { label: "Instagram", href: "https://instagram.com/spokesmanpds/" },
    ],
  },
  {
    org: "Varsity Fencing",
    role: "Varsity Saber Captain",
    period: "2023 – Present",
    location: "Princeton Day School",
    status: "active",
    desc: "Varsity saber all four years and captain as a senior, running saber practices for new fencers. 2nd place at NJSIAA District 6 as a sophomore, in both the individual and team events (2025). Competitive saber since age 6.",
    details: [
      "I compete on the Princeton Day School varsity fencing team in saber, one of the three fencing disciplines, and have fenced competitively since age 6, more than a decade of training and competition.",
      "I made the varsity roster as a freshman and earned 2nd place at NJSIAA District 6 as a sophomore in both the individual and team events (2025). As a senior I captain the saber squad and run practices for new fencers.",
    ],
    highlights: [
      "2nd place, NJSIAA District 6, individual saber (2025)",
      "2nd place, NJSIAA District 6, team saber (2025)",
      "Varsity since freshman year; saber captain as a senior",
      "Competitive saber since age 6",
    ],
    tags: ["Varsity athletics", "Captaincy", "Discipline"],
    logo: "/images/njsiaa.jpg",
    photo: { src: "/images/Fencing.jpg", alt: "Saber bout at a Princeton Day School fencing meet", credit: "Princeton Day School Flickr" },
  },
  {
    org: "Science Olympiad",
    role: "Team Member & Co-head",
    period: "Sep 2023 – Present",
    location: "Princeton Day School",
    status: "active",
    desc: "Varsity engineering events, Helicopter and Electric Vehicle: 3rd at Regionals (2025, 2026); 5th (2025) and 4th (2026) in Helicopter and 6th in Electric Vehicle (2025) at NJ States. Co-head of the club for senior year; previously co-headed the middle school team.",
    details: [
      "I compete on the varsity Science Olympiad team, primarily in engineering events: Helicopter (rubber-band powered, maximum flight time) and Electric Vehicle (battery-powered, distance and stop). Results: 3rd in Helicopter at Regionals in 2025 and 2026; at the NJ State Finals, 5th (2025) and 4th (2026) in Helicopter and 6th in Electric Vehicle (2025).",
      "Selected as Co-head of the PDS Science Olympiad club for senior year, leading direction, recruitment, and event preparation. In junior year I co-headed the Middle School team, creating and grading practice tests and mentoring younger students.",
    ],
    highlights: [
      "3rd place, Helicopter, Regionals 2025 and 2026",
      "5th (2025) and 4th (2026), Helicopter, NJ State Finals",
      "6th place, Electric Vehicle, NJ State Finals 2025",
      "Co-head of the club (senior year) and of the middle school team (junior year)",
    ],
    tags: ["Engineering design", "STEM competition", "Mentorship"],
    logo: "/images/scioly.jpeg",
    photo: { src: "/images/scienceolympiad.png", alt: "Science Olympiad team", credit: "Princeton Day School Instagram" },
  },
  {
    org: "SiMS Center (Success in Math and Science)",
    role: "Peer Mentor",
    period: "May 2026 – Present",
    location: "Princeton Day School",
    status: "active",
    desc: "Peer mentor at the Upper School's Success in Math and Science (SiMS) Center: drop-in math and science help for students, five periods a day on the library mezzanine, in a peer-tutoring model built on the PDS Writing Center. Mentors are selected by application.",
    details: [
      "The SiMS Center is Princeton Day School's peer-tutoring center for math and science. It opened on March 30, 2015, created over three years by four faculty members (math teachers Lisa Webber and Jeffrey Rubens, science teachers Brian Mayer and Carrie Norin), and runs like the school's Writing Center: individual attention from a trained student mentor, with the goal that students build confidence and take responsibility for their own learning.",
      "Unlike the Writing Center there are no appointments. The center is open five periods every day on the mezzanine of the Upper School library, and students drop in whenever they are stuck or want practice. As a mentor I work through problems alongside students across the math and science curriculum, from Precalculus and Physics to AP Chemistry and AP Calculus, teaching the concept rather than giving the answer.",
    ],
    highlights: [
      "Selected by application as a SiMS Center peer mentor",
      "Drop-in math and science tutoring for Upper School students, five periods a day",
      "Peer-tutoring model modeled on the PDS Writing Center",
    ],
    tags: ["Peer tutoring", "Math", "Science", "Mentorship"],
    logo: "/images/princetondayschool.png",
    links: [{ label: "The Spokesman: SiMS Center opens", href: "https://thespokesman.net/610/news/success-in-math-and-science-center-opens/" }],
  },
  {
    org: "ObCHESSed Chess Club",
    role: "Co-Founder",
    period: "Sep 2025 – Jun 2026",
    location: "Princeton Day School",
    status: "completed",
    desc: "Co-founded the school chess club and grew it to 40+ active members in its first year: drafted the proposal, secured faculty sponsorship, and ran weekly sessions on openings, tactics, and endgames, plus internal tournaments and mentor pairings.",
    details: [
      "Founded ObCHESSed from scratch at Princeton Day School and built a community of 40+ active members, from beginners learning the basics to competitive players sharpening tactics. I drafted the club proposal and secured faculty sponsorship.",
      "I organized weekly sessions on opening theory, tactics, and endgames with friendly matches and post-game analysis, coordinated internal tournaments with structured brackets, paired mentors with newcomers, and handled scheduling, logistics, and recruitment.",
    ],
    highlights: [
      "Founded the club and grew it to 40+ active members in year one",
      "Weekly sessions on openings, tactics, and endgames",
      "Internal tournaments and mentor pairings for newcomers",
    ],
    tags: ["Club leadership", "Event management", "Mentorship"],
    logo: "/images/chess-icon.svg",
    photo: { src: "/images/chess.png", alt: "A timed game at an ObCHESSed session", credit: "Princeton Day School Student Council" },
    links: [{ label: "Instagram", href: "https://instagram.com/obchessedd/" }],
  },
];

/* ──────────────────────────── Everything else ──────────────────────────── */

export const awards: { title: string; detail: string; year: string }[] = [
  { title: "USA Dance National Champion", detail: "Youth Pre-Champ Standard", year: "2025" },
  { title: "Embassy Ball World Pro/Am Finalist", detail: "Southern California", year: "2026" },
  { title: "USDC Pro-Am Finalist", detail: "United States Dance Championships", year: "2024, 2025, 2026" },
  { title: "NJSIAA District 6, 2nd place", detail: "Saber, individual and team", year: "2025" },
  { title: "PClassic, 1st place", detail: "UPenn programming contest, Fall 2023", year: "2023" },
  { title: "Science Olympiad States, 4th", detail: "Helicopter", year: "2026" },
  { title: "Science Olympiad States, 5th & 6th", detail: "Helicopter, Electric Vehicle", year: "2025" },
  { title: "Science Olympiad Regionals, 3rd", detail: "Helicopter", year: "2025, 2026" },
  { title: "National Economics Challenge, 4th", detail: "California States", year: "2024" },
  { title: "HackBAC Hackathon, 3rd", detail: "Social justice theme", year: "2024" },
  { title: "PYAA Gold Medal", detail: "Short story \"Dear Lao-Lao\"", year: "2026" },
  { title: "Scholastic Silver Key", detail: "\"Legacy\"", year: "2024" },
  { title: "Scholastic Silver Key", detail: "\"My Grandfather's Voice\"", year: "2023" },
  { title: "White Enso Journal", detail: "\"Six Winter Haiku\"", year: "2024" },
  { title: "Creative Communication anthology", detail: "Poetry", year: "2023" },
  { title: "Journal of Emerging Investigators", detail: "Peer-reviewed paper accepted", year: "2025" },
];

export const skills = {
  languages: ["Python", "TypeScript/JS", "Java", "GDScript", "Flask", "Next.js/React", "TensorFlow/Keras", "scikit-learn", "SQLAlchemy", "Anthropic API"],
  infra: ["PostgreSQL", "AWS S3", "Google Cloud", "Vercel", "Godot", "pytest & mypy"],
  focus: ["Machine Learning", "LLM Agents", "Multi-Agent Systems", "Full-Stack Web", "Data Science", "Game Dev"],
};

export const facets = [
  { label: "Researcher", line: "Researching whether LLM agents can fairly share solar power during a grid outage, with Prof. Yongfeng Zhang at Rutgers." },
  { label: "Intern", line: "Interned at a quantum chip company in Beijing and a civil engineering lab in Seoul." },
  { label: "Fencer", line: "Varsity saber captain, 2nd at NJSIAA District 6, competing since age six." },
  { label: "Editor", line: "Editor in chief of The Spokesman, leading 11 editors and 36 contributors." },
  { label: "Dancer", line: "Ballroom for 12 years; USA Dance national champion, Youth Pre-Champ Standard, 2025." },
  { label: "Volunteer", line: "Six years of weekly lessons for children at a Malaysian orphanage, 600+ hours." },
];

export const languages = [
  { name: "English", level: "Native" },
  { name: "Chinese", level: "Conversational" },
  { name: "Latin", level: "Academic" },
];

/** The crane's own voice (editorial-mode cursor companion). Human, offhand, never about Leo or about being paper. */
export const companionLines = [
  "Ow. Hey, quit it.",
  "I was napping, thanks.",
  "Do you mind?",
  "Okay, that one actually hurt.",
  "Oh, it's you again. Hi.",
  "Hello. Yes. I see you.",
  "Alright, alright. Hi.",
  "What do you want from me?",
  "I had a good thing going up here.",
  "Can I help you?",
  "Easy. I'm trying to work.",
  "You have my attention. Now what?",
  "Still here. Still floating.",
  "That's enough for today, I think.",
];


export const education = {
  school: "Princeton Day School",
  classOf: 2027,
  sat: { total: 1550, reading: 750, math: 800 },
  psat: { total: 1490, reading: 730, math: 760 },
  courseworkCurrent: [
    "AP Calculus BC",
    "AP Physics C: Mechanics",
    "AP U.S. Government and Politics",
    "Independent Study: Machine Learning and Finance Major",
    "AP Statistics (self-study for exam)",
  ],
  courseworkCompleted: [
    "AP Computer Science A",
    "AP Microeconomics",
    "AP Macroeconomics",
    "AP Chemistry",
    "AP Comparative Government",
    "Honors Precalculus",
    "Honors Physics",
    "Advanced Computing: Coding with a Purpose (post-AP)",
    "Latin 4 (St. John's University dual enrollment, college credit)",
  ],
  independentStudy:
    "A year-long self-directed course taken after completing the school's computer science sequence: calculus-based probability from Harvard's Stat 110 curriculum applied to machine learning and markets, with weekly problem sets and Python programs, ending in a from-scratch market simulator and a logistic-regression model that tests whether detecting informed traders makes a market maker more profitable.",
};

export type Achievement = {
  medal: string;
  tier: "gold" | "silver" | "bronze" | "plain";
  domain: "STEM" | "ATHLETICS" | "ARTS" | "ACADEMIC";
  /** scope of the competition or publication */
  level: "International" | "National" | "State" | "Regional";
  year: string;
  /** the one award to visually emphasise (gold box, glow) */
  featured?: boolean;
  title: string;
  detail: string;
  logo?: string;
  /** "View photo" opens this in a lightbox */
  photo?: { src: string; alt: string };
  /** "View photos" opens a horizontal gallery */
  gallery?: { src: string; caption: string }[];
  /** second button, "See other photos" */
  moreGallery?: { src: string; caption: string }[];
};

/** USA Dance Nationals 2025, the national title itself. */
export const nationalsPhotos: { src: string; caption: string }[] = [
  { src: "/images/achievements/ballroom/09-january-2025.jpg", caption: "USA Dance Nationals 2025, with my partner" },
  { src: "/images/achievements/ballroom/10-on-the-floor.jpg", caption: "On the floor at Nationals" },
];

/** Ballroom through the years, youngest first (the "see other photos" set). */
export const ballroomGallery: { src: string; caption: string }[] = [
  { src: "/images/achievements/ballroom/01-first-competitions.jpg", caption: "First competitions" },
  { src: "/images/achievements/ballroom/02-medals-with-friends.jpg", caption: "Early medals" },
  { src: "/images/achievements/ballroom/03-usa-dance-collegiate.jpg", caption: "USA Dance qualifier" },
  { src: "/images/achievements/ballroom/04-with-coach.jpg", caption: "With my coach" },
  { src: "/images/achievements/ballroom/05-usdc-2022.jpg", caption: "USDC, November 2022" },
  { src: "/images/achievements/ballroom/07-usdc-2024.jpg", caption: "USDC, September 2024" },
  { src: "/images/achievements/ballroom/08-kings-ball-2024.jpg", caption: "King's Ball, December 2024" },
  { src: "/images/achievements/ballroom/09b-dancing-december-2024.jpg", caption: "December 2024" },
  { src: "/images/achievements/ballroom/09a-january-2025-partner.jpg", caption: "January 2025" },
  { src: "/images/achievements/ballroom/11-usa-dance-nationals-2025.jpg", caption: "USA Dance, March 2025" },
  { src: "/images/achievements/ballroom/11b-usa-dance-nationals-2025-b.jpg", caption: "USA Dance, March 2025" },
  { src: "/images/achievements/ballroom/11c-nationals-floor.jpg", caption: "On the floor, March 2025" },
  { src: "/images/achievements/ballroom/12-gold-medal.jpg", caption: "The gold medal" },
  { src: "/images/achievements/ballroom/13-usdc-2025.jpg", caption: "USDC, September 2025" },
  { src: "/images/achievements/ballroom/14a-embassy-ball-stage.jpg", caption: "Embassy Ball, September 2026" },
  { src: "/images/achievements/ballroom/14-embassy-ball-2026.jpg", caption: "Embassy Ball, September 2026" },
  { src: "/images/achievements/ballroom/14b-usdc-gala-2026.jpg", caption: "USDC gala night, 2026" },
  { src: "/images/achievements/ballroom/14c-usdc-floor-2026.jpg", caption: "USDC, 2026" },
  { src: "/images/achievements/ballroom/15-embassy-ball-world-proam.jpg", caption: "Embassy Ball World Pro/Am finalist, 2026" },
  { src: "/images/achievements/ballroom/16-usdc-grand-finalist-2026.jpg", caption: "USDC Grand Finalist certificate, 2026" },
];

/** Full achievements shelf, ported from the previous site. */
export const achievements: Achievement[] = [
  { medal: "1ST", tier: "gold", level: "Regional", domain: "STEM", year: "2023", title: "PClassic Programming Competition", detail: "1st place · University of Pennsylvania · Fall 2023", logo: "/images/pclassic.png", photo: { src: "/images/achievements/pclassic-team.jpg", alt: "The winning PClassic team wearing their crowns at Penn Engineering" } },
  { medal: "1ST", tier: "gold", level: "National", domain: "ATHLETICS", year: "2025", title: "USA Dance National DanceSport Champion", detail: "Youth Pre-Champ Standard · won as a sophomore", logo: "/images/usadance.png", gallery: nationalsPhotos, moreGallery: ballroomGallery, featured: true },
  { medal: "PUB", tier: "gold", level: "International", domain: "STEM", year: "2025", title: "Journal of Emerging Investigators", detail: "Stock ML paper accepted for publication · lead researcher", logo: "/images/JEI.png" },
  { medal: "GOLD", tier: "gold", level: "National", domain: "ARTS", year: "2026", title: "PYAA Gold Medal", detail: "“Dear Lao-Lao” · short story", logo: "/images/pyaa.png", photo: { src: "/images/achievements/pyaa-certificate.jpg", alt: "Progressive Young Artist Awards gold award certificate, short story" } },
  { medal: "PSAT", tier: "silver", level: "National", domain: "ACADEMIC", year: "2026", title: "National Merit Commended Student", detail: "PSAT/NMSQT 1490 (730 reading, 760 math) · 2027 National Merit Scholarship Program · Letter of Commendation", logo: "/images/nmsc.svg" },
  { medal: "AP", tier: "silver", level: "National", domain: "ACADEMIC", year: "2026", title: "AP Scholar with Distinction", detail: "College Board · awarded on the May 2026 exams", logo: "/images/ap.svg" },
  { medal: "2ND", tier: "silver", level: "Regional", domain: "ATHLETICS", year: "2025", title: "NJSIAA District 6 Fencing", detail: "2nd, individual & team (saber)", logo: "/images/njsiaa.jpg", photo: { src: "/images/achievements/njsiaa-district-6.jpg", alt: "The PDS fencing team after the NJSIAA District 6 championships" } },
  { medal: "KEY", tier: "silver", domain: "ARTS", level: "Regional", year: "2024", title: "Scholastic Silver Key", detail: "Poetry · \u201cLegacy\u201d", logo: "/images/scholastic.jpg", photo: { src: "/images/achievements/scholastic-legacy-letter.jpg", alt: "Scholastic Art & Writing Awards letter: Silver Key (Poetry) for \u201cLegacy\u201d, 2024" } },
  { medal: "KEY", tier: "silver", domain: "ARTS", level: "Regional", year: "2023", title: "Scholastic Silver Key", detail: "Poetry · \u201cMy Grandfather's Voice\u201d", logo: "/images/scholastic.jpg", photo: { src: "/images/achievements/scholastic-silver-key.jpg", alt: "Scholastic Art & Writing Awards Silver Key certificate" } },
  { medal: "3RD", tier: "bronze", level: "Regional", domain: "STEM", year: "2024", title: "HackBac Hackathon", detail: "3rd place · social-justice theme", logo: "/images/hackbac.webp", photo: { src: "/images/achievements/hackbac-2024.jpg", alt: "Building at the HackBAC hackathon, 2024" } },
  { medal: "3RD", tier: "bronze", domain: "STEM", level: "Regional", year: "2026", title: "Science Olympiad Regionals", detail: "3rd place · Helicopter · Camden County College Regional", logo: "/images/scioly.jpeg", photo: { src: "/images/achievements/scioly/scioly-2026-regional-helicopter.jpg", alt: "Duosmium results, 2026 NJ Camden County College Regional: Princeton Day School 3rd in Helicopter" } },
  { medal: "3RD", tier: "bronze", domain: "STEM", level: "Regional", year: "2025", title: "Science Olympiad Regionals", detail: "3rd place · Helicopter · Camden County College Regional", logo: "/images/scioly.jpeg", photo: { src: "/images/achievements/scioly/scioly-2025-regional-helicopter.jpg", alt: "Duosmium results, 2025 NJ Camden County College Regional: Princeton Day School 3rd in Helicopter" } },
  { medal: "3RD", tier: "bronze", level: "National", domain: "ATHLETICS", year: "2024", title: "USDC Pro-Am National Finalist", detail: "3rd · Junior 2 and Youth Open Championships, International Ballroom", logo: "/images/usdc.png", photo: { src: "/images/achievements/ballroom/07-usdc-2024.jpg", alt: "Leo with his medals at USDC, September 2024" } },
  { medal: "4TH", tier: "plain", domain: "STEM", level: "State", year: "2026", title: "Science Olympiad NJ States", detail: "4th place · Helicopter", logo: "/images/scioly.jpeg", photo: { src: "/images/achievements/scioly/scioly-2026-states-helicopter.jpg", alt: "Duosmium results, 2026 NJ State Tournament: Princeton Day School 4th in Helicopter" } },
  { medal: "5TH", tier: "plain", domain: "STEM", level: "State", year: "2025", title: "Science Olympiad NJ States", detail: "5th place · Helicopter", logo: "/images/scioly.jpeg", photo: { src: "/images/achievements/scioly/scioly-2025-states-helicopter.jpg", alt: "Duosmium results, 2025 NJ State Tournament: Princeton Day School 5th in Helicopter" } },
  { medal: "6TH", tier: "plain", domain: "STEM", level: "State", year: "2025", title: "Science Olympiad NJ States", detail: "6th place · Electric Vehicle", logo: "/images/scioly.jpeg", photo: { src: "/images/achievements/scioly/scioly-2025-states-electric-vehicle.jpg", alt: "Duosmium results, 2025 NJ State Tournament: Princeton Day School 6th in Electric Vehicle" } },
  { medal: "4TH", tier: "plain", level: "State", domain: "STEM", year: "2024", title: "National Economics Challenge", detail: "4th · California States · as a freshman", logo: "/images/nec.png", photo: { src: "/images/achievements/nec-2024-team.jpg", alt: "The team at the National Economics Challenge, 2024" } },
  { medal: "FIN", tier: "plain", level: "National", domain: "ATHLETICS", year: "2026", title: "USDC Pro-Am National Finalist", detail: "Youth Open Championship, International Ballroom · Grand Finalist", logo: "/images/usdc.png", photo: { src: "/images/achievements/ballroom/16-usdc-grand-finalist-2026.jpg", alt: "USDC Grand Finalist certificate, 2026" } },
  { medal: "FIN", tier: "plain", level: "National", domain: "ATHLETICS", year: "2025", title: "USDC Pro-Am National Finalist", detail: "Youth Open Championship, International Ballroom", logo: "/images/usdc.png", photo: { src: "/images/achievements/ballroom/13-usdc-2025.jpg", alt: "Leo with his partner at USDC, September 2025" } },
  { medal: "FIN", tier: "plain", level: "International", domain: "ATHLETICS", year: "2026", title: "Embassy Ballroom Championships", detail: "World Pro/Am Championships finalist · DanceSport", logo: "/images/embassy.png", photo: { src: "/images/achievements/ballroom/15-embassy-ball-world-proam.jpg", alt: "Embassy Ball World Pro/Am finalist, 2026" } },
  { medal: "PUB", tier: "plain", level: "National", domain: "ARTS", year: "2024", title: "White Enso Journal", detail: "Published poetry · “Six Winter Haiku”", logo: "/images/whiteenso.png", photo: { src: "/images/achievements/white-enso-six-winter-haiku.jpg", alt: "“Six Winter Haiku” by Leo Chang on the White Enso website" } },
  { medal: "PUB", tier: "plain", level: "National", domain: "ARTS", year: "2023", title: "Creative Communication", detail: "Published in national poetry anthologies", logo: "/images/creative-communication.png", photo: { src: "/images/achievements/creative-communication-certificate.jpg", alt: "Creative Communication publication certificate" } },
];


/** Personal photos for the About page. */
export const aboutPhotos = [
  { src: "/images/lake.jpg", alt: "Leo standing on a rock at the edge of a lake", caption: "By the lake" },
];

/** Background music. Every track is by Kevin MacLeod (incompetech.com), licensed CC BY 4.0. */
export type Track = { id: string; src: string; title: string; artist: string; license: string; url: string };
const KM = { artist: "Kevin MacLeod", license: "CC BY 4.0", url: "https://incompetech.com" };
export const editorialTracks: Track[] = [
  { id: "wallpaper", src: "/audio/editorial-wallpaper.mp3", title: "Wallpaper", ...KM },
  { id: "carefree", src: "/audio/editorial-carefree.mp3", title: "Carefree", ...KM },
  { id: "life-of-riley", src: "/audio/editorial-life-of-riley.mp3", title: "Life of Riley", ...KM },
  { id: "dreamer", src: "/audio/editorial-dreamer.mp3", title: "Dreamer", ...KM },
  { id: "wholesome", src: "/audio/editorial-wholesome.mp3", title: "Wholesome", ...KM },
  { id: "meditation-impromptu", src: "/audio/editorial-meditation-impromptu-01.mp3", title: "Meditation Impromptu 01", ...KM },
];
export const arcadeTracks: Track[] = [
  { id: "8bit-dungeon-boss", src: "/audio/arcade-8bit-dungeon-boss.mp3", title: "8bit Dungeon Boss", ...KM },
  { id: "pixel-peeker-polka", src: "/audio/arcade-pixel-peeker-polka.mp3", title: "Pixel Peeker Polka", ...KM },
  { id: "pixelland", src: "/audio/arcade-pixelland.mp3", title: "Pixelland", ...KM },
  { id: "bit-shift", src: "/audio/arcade-bit-shift.mp3", title: "Bit Shift", ...KM },
  { id: "overworld", src: "/audio/arcade-overworld.mp3", title: "Overworld", ...KM },
  { id: "arcadia", src: "/audio/arcade-arcadia.mp3", title: "Arcadia", ...KM },
];
/** Defaults (first track of each list); components may let the visitor pick another. */
export const music = { editorial: editorialTracks[0]!, arcade: arcadeTracks[0]! };

/* ───────────── Derived counts (never hand-edit: they follow the lists above) ───────────── */

const pad2 = (n: number) => String(n).padStart(2, "0");
/** Internships = research and company intern roles; a job and a hospital volunteer position are not internships. */
export const internships = experiences.filter((e) => /\bintern\b/i.test(e.role));

export const stats = [
  { value: projects.length, suffix: "", label: "Projects" },
  { value: leadership.length, suffix: "", label: "Leadership roles" },
  { value: internships.length, suffix: "", label: "Internships" },
  { value: achievements.length, suffix: "", label: "Awards" },
  { value: education.sat.total, suffix: "", label: "SAT" },
];

/** Home-page pathways, as on the previous site; counts follow the data. */
export const pathways = [
  { word: "Projects", count: pad2(projects.length), desc: "research, a web app, a playable game", route: "projects" },
  { word: "Experience", count: pad2(experiences.length), desc: "research, internships & work", route: "experience" },
  { word: "Achievements", count: String(achievements.length), desc: "placements, writing awards & a publication", route: "achievements" },
  { word: "About", count: "Me", desc: "bio, skills & coursework", route: "about" },
];

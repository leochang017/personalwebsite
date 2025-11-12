# leo chang's personal portfolio website

hey! this is my personal portfolio website. built it from scratch with html/css/js to show off my projects, experience, and achievements.

🌐 **live site:** [leochang.net](https://leochang.net)

## features

### dual themes
- **stock market theme** - webull-inspired clean dashboard design with live ticker
- **minecraft theme** - full minecraft main menu experience with c418 music
- toggle between them with the button in the header
- theme preference saved in localStorage

### what's inside
- **interactive dashboard** - stock market-style portfolio view with live ticker
- **ai chatbot (sparky)** - powered by anthropic claude api, knows everything about my work
- **project showcase** - detailed pages for napkinnote and stock ml projects
- **work experience timeline** - internships at achievable and mundial financial group
- **leadership roles** - founded organizations and leadership positions
- **achievements & awards** - 1st place pclassic, publications, competitions
- **about me page** - personal background and interests
- **mobile responsive** - fully optimized for mobile devices with hamburger menu

### tech stack
- **vanilla javascript** - no frameworks, just pure js
- **~11,300+ lines of code** - hand-written from scratch
- **responsive design** - works perfectly on desktop, tablet, and mobile
- **dark mode support** - available in stock theme
- **ai chatbot** - powered by anthropic claude api with vercel serverless backend
- **scroll animations** - intersection observer for smooth reveal effects
- **particle effects** - animated stars (stock theme) and blocks (minecraft theme)
- **global search** - find projects, experiences, and achievements instantly
- **performance optimized** - mobile-specific optimizations for smooth experience

## file structure

```
personalwebsite/
├── index.html              # redirects to dashboard
├── dashboard.html          # main landing page with stats
├── cs-projects.html        # technical projects showcase
├── experiences.html        # work experience timeline
├── leadership.html         # leadership roles and organizations
├── achievements.html       # awards, competitions, publications
├── about.html              # about me and background
├── projects/               # detailed project pages
│   ├── napkinnote.html     # napkinnote ai platform
│   └── stockml.html        # stock ml research project
└── assets/
    ├── css/
    │   ├── styles.css           # main styles (4,505 lines)
    │   ├── minecraft-theme.css  # minecraft theme (1,522 lines)
    │   ├── enhancements.css     # animations & effects (694 lines)
    │   ├── project.css          # project pages (675 lines)
    │   ├── chatbot.css          # ai chatbot styles (465 lines)
    │   └── arcade-theme.css     # additional theme styles
    ├── js/
    │   ├── main.js              # core functionality (2,266 lines)
    │   ├── chatbot.js           # ai chatbot logic (714 lines)
    │   ├── enhancements.js      # animations, search, particles (473 lines)
    │   └── project.js           # project page utilities (14 lines)
    └── images/                  # all images and assets
```

**total:** ~11,300+ lines of code

## technical implementation

### stock market dashboard
- **live ticker** - displays AAPL, GOOGL, MSFT, TSLA, NVDA, META, AMZN
- simulated realistic price movements with +/- variations
- infinite scroll animation with seamless looping
- updates every 60 seconds
- responsive header with collapsible mobile menu

### interactive charts & stats
- **canvas-based sparklines** - mini performance charts on stat cards
- **real-time timestamp** - updates every second (5s on mobile for battery)
- **animated stat cards** - hover effects and transitions
- **activity timeline** - vertical timeline with markers and badges
- **endorsements section** - professional recommendations with company branding

### minecraft theme
- **panorama background** - animated scrolling minecraft landscape
- **main menu navigation** - singleplayer (dashboard) and multiplayer (server list)
- **server list** - navigate to different pages via minecraft servers
- **background music** - c418's "sweden" from minecraft ost
- **sound effects** - menu click sounds with web audio api
- **music & sound toggles** - separate controls for music and sfx
- **pixelated font** - press start 2p for authentic minecraft feel
- **loading screens** - smooth transitions between pages

### ai chatbot (sparky)
- **powered by claude haiku 4.5** - anthropic's latest fast model
- **comprehensive knowledge base** - knows all about my projects, experience, achievements
- **vercel serverless backend** - secure api key management
- **real-time responses** - streaming with typing indicators
- **conversation history** - maintains context from last 3 exchanges
- **suggestion prompts** - quick-start questions for common queries
- **expandable interface** - minimizes when not in use

### animations & effects
- **scroll-triggered animations** - intersection observer api for performance
- **particle effects** - 25 animated particles on desktop (disabled on mobile)
- **parallax hover effects** - 3d card tilting on desktop (disabled on mobile)
- **smooth transitions** - page loads and theme switching
- **debounced search** - 150ms debounce for smooth typing
- **mobile optimizations** - simplified animations, passive event listeners

### accessibility
- **skip-to-content links** - on every page for keyboard navigation
- **aria labels** - all interactive elements properly labeled
- **keyboard shortcuts** - ctrl+t for theme toggle, ctrl+k for search
- **proper heading hierarchy** - semantic html structure
- **focus indicators** - clear focus states for keyboard navigation
- **screen reader optimized** - descriptive labels and alt text

### performance optimizations
- **mobile-specific optimizations:**
  - particles disabled on mobile (was causing lag)
  - parallax effects disabled on mobile (not useful on touch)
  - simplified animations (opacity only, no transforms)
  - debounced search input (150ms)
  - reduced timestamp update frequency (5s vs 1s)
  - passive event listeners for better scroll performance
- **desktop optimizations:**
  - hardware acceleration for smooth animations
  - intersection observer for lazy scroll animations
  - minimal dependencies (just font awesome icons)
  - optimized css (no horizontal scroll issues)

## how to use

1. visit [leochang.net](https://leochang.net) to see the live site!
2. click the "minecraft" button to toggle between themes
3. use the search bar (or press ctrl+k) to find specific content
4. click on sparky (bottom right) to chat with the ai assistant
5. explore different pages via the sidebar navigation

## implemented features

✅ dual theme system (stock market + minecraft)
✅ dark mode (stock theme only)
✅ live stock ticker with realistic price movements
✅ interactive dashboard with sparkline charts
✅ global search across all content
✅ scroll-triggered animations
✅ particle effects (desktop only)
✅ minecraft music & sound effects with toggles
✅ skip-to-content accessibility features
✅ keyboard shortcuts (ctrl+t, ctrl+k)
✅ theme persistence (localStorage)
✅ project filtering by technology and status
✅ ai chatbot powered by claude api (sparky)
✅ mobile responsive design with hamburger menu
✅ professional endorsements section
✅ activity timeline with visual markers
✅ mobile performance optimizations
✅ canvas-based mini charts

## browser support

- chrome/edge (recommended)
- firefox
- safari
- mobile browsers (optimized for performance)

## credits

- **built by leo chang**
- **minecraft theme** - inspired by mojang's minecraft
- **stock theme** - inspired by webull's dashboard design
- **music** - c418 (minecraft official soundtrack)
- **fonts** - press start 2p, inter (google fonts)
- **ai chatbot** - powered by anthropic claude api

---

**note:** this is a static portfolio site. no backend required except for the ai chatbot feature which uses vercel serverless functions.

last updated: november 2025

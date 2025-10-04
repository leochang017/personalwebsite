# Leo Chang's personal portfolio website

hey! this is my personal portfolio website. built it from scratch with vanilla html/css/js to show off my projects, experience, and achievements.

## features

**dual themes**
- stock market theme (webull-inspired clean look)
- minecraft theme (pixelated retro vibes with c418 music)
- toggle between them with the button in the header
- theme preference saved in localStorage

**what's inside**
- interactive dashboard with live-ish stock ticker
- project showcase with detailed pages
- work experience timeline
- leadership roles
- achievements & awards
- about me page

**tech**
- vanilla javascript (no frameworks)
- ~11,000 lines of code total
- responsive design
- dark mode support (stock theme only)
- scroll animations with intersection observer
- lazy loading images
- global search functionality
- particle effects
- wcag 2.1 aa accessibility compliant

## file structure

```
personalwebsite/
├── index.html              # redirects to dashboard
├── dashboard.html          # main landing page
├── cs-projects.html        # tech projects
├── experiences.html        # work history
├── leadership.html         # leadership roles
├── achievements.html       # awards & stuff
├── about.html             # about me
├── projects/              # detailed project pages
│   ├── napkinnote.html
│   └── stockml.html
└── assets/
    ├── css/
    │   ├── styles.css           # main styles (4,382 lines)
    │   ├── minecraft-theme.css  # minecraft theme (1,522 lines)
    │   ├── enhancements.css     # extra features (1,324 lines)
    │   └── project.css          # project pages (675 lines)
    ├── js/
    │   ├── main.js              # core functionality (2,187 lines)
    │   ├── enhancements.js      # animations, search, etc (844 lines)
    │   └── project.js           # project page utils (14 lines)
    └── images/                  # all the images & assets
```

## technical implementation

**stock ticker**
- fetches data with simulated realistic prices
- updates every 60 seconds
- seamless infinite scroll animation
- shows AAPL, GOOGL, MSFT, TSLA, NVDA, META, AMZN

**interactive charts**
- canvas-based performance charts
- skills pie chart with animations
- sparkline mini-charts for metrics
- real-time timestamp updates

**minecraft theme**
- panorama background with animated scrolling
- main menu navigation system
- background music (c418 - sweden)
- sound effects toggle
- pixelated press start 2p font
- loading screens between pages

**animations & effects**
- scroll-triggered animations (intersection observer)
- particle effects (stars for stock, blocks for minecraft)
- smooth page transitions
- parallax hover effects on cards
- lazy loading images

**accessibility**
- skip-to-content links on all pages
- aria labels for interactive elements
- keyboard navigation support (ctrl+t for theme toggle)
- proper heading hierarchy
- screen reader optimized

**performance**
- lazy loading for images
- hardware acceleration for smooth animations
- minimal dependencies (just font awesome icons)
- loads in <500ms

## how to use

1. go on https://leochang017.github.io/personalwebsite/dashboard.html to see my website!

## implemented features

✅ dual theme system (stock market + minecraft)
✅ dark mode (stock theme)
✅ live stock ticker
✅ interactive dashboard charts
✅ global search across all content
✅ scroll animations
✅ particle effects
✅ lazy loading images
✅ minecraft music & sound effects
✅ skip-to-content accessibility
✅ keyboard shortcuts
✅ theme persistence (localStorage)
✅ project filtering by technology and status

## known issues & fixes

**fixed:**
- minecraft theme button glitching → removed click animation, added gpu acceleration
- custom cursor issues → disabled block cursor
- click particle effects → removed (too distracting)
- project filters not working → implemented filtering logic for tech and status
- resume download button text color → removed green background, matched to view online button

## potential improvements

some ideas for future updates:
- stockml results dashboard and research paper pdf
- independent dark mode for minecraft theme
- print-friendly resume view
- breadcrumb navigation
- keyboard shortcut help modal
- image optimization (webp conversion)
- service worker for offline support

## credits

- built by leo chang
- minecraft theme inspired by mojang
- stock theme inspired by webull
- music: c418 (minecraft ost)
- fonts: press start 2p (google fonts), inter (google fonts)

---


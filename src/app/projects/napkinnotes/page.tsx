import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Link from "next/link";

const coreFeatures = [
  {
    title: "OCR Extraction",
    desc: "Google Cloud Vision API and PyMuPDF extract text from handwritten scans, printed documents, and complex PDF layouts. python-docx handles Word files; extracted text is persisted for search and summarization.",
  },
  {
    title: "AI Summarization",
    desc: "Claude API (Anthropic SDK) generates concise, structured summaries of extracted note content, distilling key concepts and definitions for efficient studying.",
  },
  {
    title: "Multi-Format Upload",
    desc: "Supports images, PDFs, DOCX, and TXT files with batch uploads per note. Files are stored on AWS S3 and served via short-lived presigned URLs.",
  },
  {
    title: "Social Layer",
    desc: "Follow classmates, like and comment on notes, bookmark study materials, and browse a personal activity feed.",
  },
  {
    title: "Course & Test Scheduling",
    desc: "Notes are organized by course. Admins register test dates; the platform automatically locks course notes and unlocks them two days before each test to prevent academic-integrity issues.",
  },
  {
    title: "Site-Wide Lockdown",
    desc: "SiteLock lets admins freeze platform access during sensitive windows (e.g. school exams) with a custom message and scheduled unlock date.",
  },
  {
    title: "Marketplace",
    desc: "Peer-to-peer student marketplace with categories, photo galleries, listing favorites, and seller-buyer messaging. Listings can be marked sold and moderated from the admin panel.",
  },
  {
    title: "In-Person Meetup Scheduling",
    desc: "Buyers propose a time and pick from curated on-campus meetup locations. Sellers accept, counter, or complete transactions, with email notifications at each step.",
  },
  {
    title: "Authentication",
    desc: "Dual auth via Authlib Google OAuth and email/password registration with bcrypt hashing, token-based email verification, and Flask-Login session management.",
  },
  {
    title: "Admin Panel",
    desc: "Full admin suite: user management, note/comment moderation, marketplace oversight, course and test scheduling, DB backup/restore, user-alias impersonation mode, and OWASP-aligned audit logging of every sensitive action.",
  },
];

const techStack = [
  {
    category: "Backend",
    items: ["Flask 3.1.3", "SQLAlchemy 2.0.43", "Flask-Migrate 4.1", "PostgreSQL", "Redis"],
  },
  {
    category: "AI & Processing",
    items: ["Claude (Anthropic 0.40)", "Google Cloud Vision 3.7", "PyMuPDF 1.24", "python-docx 1.1"],
  },
  {
    category: "Cloud & Delivery",
    items: ["AWS S3 (boto3)", "Flask-Mail", "Pydantic 2.11", "presigned URLs"],
  },
  {
    category: "Security & Auth",
    items: ["Authlib (Google OAuth)", "Flask-Login", "Flask-WTF (CSRF)", "Flask-JWT-Extended", "Flask-Limiter", "bcrypt 4"],
  },
  {
    category: "Frontend",
    items: ["Jinja templates", "Bootstrap 5.3", "Font Awesome 6.4", "AOS 2.3"],
  },
];

const dbCategories = [
  {
    name: "Users & Social Graph",
    models: ["User", "UserFollow"],
    detail: "Accounts with OAuth + email-verification state and the follower graph.",
  },
  {
    name: "Notes & Content",
    models: ["Note", "NoteDocument", "Photo", "Tag", "Bookmark", "SearchHistory"],
    detail: "Core note entity with multi-file attachments, tags, bookmarks, and search-history tracking.",
  },
  {
    name: "Engagement",
    models: ["Comment", "Like", "Activity"],
    detail: "Peer feedback surface: comments, likes, and a unified activity feed.",
  },
  {
    name: "Courses & Access Control",
    models: ["Course", "CourseTest", "SiteLock", "AuditLog"],
    detail: "Course catalog, test-schedule-driven auto-locking of notes, full site lockdown support, and OWASP-aligned audit trail.",
  },
  {
    name: "Marketplace",
    models: ["Category", "Listing", "ListingPhoto", "MarketplaceMessage", "Favorite", "MeetupLocation", "MeetupRequest"],
    detail: "Student-to-student marketplace with photo galleries, messaging, favorites, curated meetup points, and structured meetup-request workflow.",
  },
];

const timeline = [
  {
    date: "Aug 2025",
    title: "Ideation & Design",
    desc: "Identified the need for a centralized note-sharing platform at PDS. Designed the database schema and wireframed the core user experience.",
  },
  {
    date: "Aug \u2013 Sep 2025",
    title: "Development Sprint",
    desc: "Built the full-stack Flask application from scratch: OCR ingestion, Claude-powered summarization, auth, social graph, and admin tooling.",
  },
  {
    date: "Sep 2025 \u2013 Present",
    title: "Launch & Growth",
    desc: "Deployed to production at napkinnotes.net with 80+ regular users and 170+ uploaded notes. Continuous iteration based on user feedback, performance optimization, and feature expansion including the student marketplace and in-person meetup scheduling.",
  },
];

export default function NapkinNotesPage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <FadeUp>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors font-body mb-10 no-underline"
          >
            <span>&larr;</span> Back to Projects
          </Link>
        </FadeUp>

        {/* Hero Section */}
        <FadeUp delay={0.05}>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight">
                NapkinNotes
              </h1>
              <span className="sticker-chip sticker-chip--mint wobble-slow">
                Active
              </span>
            </div>
            <p className="text-muted text-lg md:text-xl font-body">
              AI-Powered EdTech Platform
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="https://napkinnotes.net" target="_blank" rel="noopener noreferrer" className="text-sm text-olive font-semibold no-underline hover:underline inline-block">
                napkinnotes.net ↗
              </a>
              <a
                href="https://www.instagram.com/napkinnotes27/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="NapkinNotes Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </FadeUp>

        {/* Overview */}
        <SlideIn direction="left" delay={0.1}>
          <div className="sticker-card-surface rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">Overview</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                NapkinNotes is a full-stack AI-powered platform that turns raw class notes
                into organized, searchable study resources. Built for Princeton Day School students,
                it combines optical character recognition, Claude-driven summarization, and a
                peer-to-peer social layer into a single collaborative learning ecosystem.
              </p>
              <p>
                Students upload notes in any format &mdash; handwritten scans, PDFs, Word
                documents, or plain text &mdash; and the platform extracts, processes, and
                summarizes the content automatically. Course-level organization with
                test-date-driven auto-locking keeps study materials structured, and a student
                marketplace with in-person meetup scheduling extends the platform beyond notes.
              </p>
              <p>
                Under the hood: 100+ Flask routes, 22 SQLAlchemy models, AWS S3 storage with
                presigned URLs, PostgreSQL, Redis-backed rate limiting, OWASP-aligned audit
                logging, and a full admin panel with user impersonation, DB backup/restore,
                and site-wide lockdown controls.
              </p>
            </div>
          </div>
        </SlideIn>

        {/* Core Features */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Core Features</h2>
        </FadeUp>
        <StaggerList className="grid md:grid-cols-2 gap-4 mb-14">
          {coreFeatures.map((f) => (
            <StaggerItem key={f.title}>
              <div className="sticker-card-surface rounded-xl p-6 h-full hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Tech Stack */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Tech Stack</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {techStack.map((s, i) => (
            <SlideIn key={s.category} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
              <div className="sticker-card-surface rounded-xl p-6 h-full">
                <h3 className="font-sans font-bold text-xs text-accent uppercase tracking-wider mb-3">
                  {s.category}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface-light text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SlideIn>
          ))}
        </div>

        {/* Architecture */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Architecture</h2>
          <p className="text-muted text-sm font-body mb-6">
            22 SQLAlchemy models organized across 5 domains power the entire platform.
          </p>
        </FadeUp>
        <div className="space-y-4 mb-14">
          {dbCategories.map((cat, i) => (
            <ScaleIn key={cat.name} delay={i * 0.08}>
              <div className="sticker-card-surface rounded-xl p-6 hover:border-olive/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="sm:w-40 shrink-0">
                    <h3 className="font-sans font-bold text-sm">{cat.name}</h3>
                    <p className="text-[10px] text-muted font-mono mt-0.5">
                      {cat.models.length} models
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2 flex-wrap mb-2">
                      {cat.models.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] font-semibold font-mono px-2.5 py-1 rounded-full bg-accent/8 text-accent"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted font-body">{cat.detail}</p>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Development Timeline */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Development Timeline</h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {timeline.map((t) => (
            <StaggerItem key={t.date}>
              <div className="sticker-card-surface rounded-xl p-6 flex flex-col sm:flex-row gap-4">
                <div className="sm:w-36 shrink-0">
                  <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {t.date}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm mb-1">{t.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-body">{t.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Back to Projects */}
        <FadeUp>
          <div className="text-center">
            <Link
              href="/projects"
              className="sticker-btn text-sm no-underline"
            >
              &larr; All Projects
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

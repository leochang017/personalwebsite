import type { Metadata } from "next";
import Link from "next/link";
import { PopIn } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "NapkinNotes — Leo Chang",
  description: "AI-powered EdTech platform. 80+ users, 170+ notes at Princeton Day School. Flask, Postgres, Claude API, OCR, AWS S3.",
};

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
    date: "Aug – Sep 2025",
    title: "Development Sprint",
    desc: "Built the full-stack Flask application from scratch: OCR ingestion, Claude-powered summarization, auth, social graph, and admin tooling.",
  },
  {
    date: "Sep 2025 – Present",
    title: "Launch & Growth",
    desc: "Deployed to production at napkinnotes.net with 80+ regular users and 170+ uploaded notes. Continuous iteration based on user feedback, performance optimization, and feature expansion including the student marketplace and in-person meetup scheduling.",
  },
];

const metrics = [
  { number: "80+", label: "REGULAR USERS AT PDS" },
  { number: "170+", label: "NOTES UPLOADED" },
  { number: "100+", label: "FLASK ROUTES · 22 MODELS" },
];

export default function NapkinNotesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-20">
      {/* Back link */}
      <PopIn>
        <Link
          href="/projects"
          className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7"
        >
          &larr; ALL PROJECTS
        </Link>
      </PopIn>

      {/* Hero */}
      <PopIn delay={0.06}>
        <div className="flex gap-2 flex-wrap mb-5">
          <span className="font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground bg-pop-green px-[11px] py-1 rounded-full">
            WEB APP
          </span>
          <span className="font-mono text-[10.5px] font-semibold border-2 border-foreground px-[11px] py-1 rounded-full">
            CO-FOUNDER
          </span>
        </div>
        <h1 className="font-sans font-extrabold text-5xl md:text-[76px] leading-[0.95] tracking-[-0.04em] m-0 mb-5">
          NapkinNotes
        </h1>
        <p className="font-sans font-medium text-[21px] leading-[1.45] max-w-[760px] m-0 mb-4">
          A full-stack web app that turns raw class notes (handwritten scans,
          PDFs, Word docs) into organized, searchable study resources for
          Princeton Day School students.
        </p>
        <div className="font-mono text-xs font-medium tracking-[0.06em] text-muted uppercase mb-6">
          EdTech Web App &middot; Aug 2025 &ndash; Present
        </div>
        <div className="flex gap-3 flex-wrap mb-8">
          <a
            href="https://napkinnotes.net"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn ink-btn--dark no-underline"
          >
            napkinnotes.net ↗
          </a>
          <a
            href="https://www.instagram.com/napkinnotes27/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn no-underline inline-flex items-center gap-2"
            aria-label="NapkinNotes Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            INSTAGRAM ↗
          </a>
        </div>
      </PopIn>

      {/* Metrics */}
      <PopIn delay={0.12}>
        <div className="grid sm:grid-cols-3 gap-[18px] mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-[18px]"
            >
              <div className="font-sans font-extrabold text-[38px] tracking-[-0.03em]">{m.number}</div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Overview */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Overview
        </h2>
        <div className="font-sans text-[16px] leading-[1.65] text-secondary max-w-[760px] space-y-4 mb-14">
          <p className="m-0">
            NapkinNotes is a full-stack web app that turns raw class notes
            into organized, searchable study resources. Built for Princeton Day School students,
            it combines optical character recognition, Claude-driven summarization, and a
            peer-to-peer social layer in one platform.
          </p>
          <p className="m-0">
            Students upload notes in any format (handwritten scans, PDFs, Word
            documents, or plain text) and the platform extracts, processes, and
            summarizes the content automatically. Course-level organization with
            test-date-driven auto-locking keeps study materials structured, and a student
            marketplace with in-person meetup scheduling extends the platform beyond notes.
          </p>
          <p className="m-0">
            Under the hood: 100+ Flask routes, 22 SQLAlchemy models, AWS S3 storage with
            presigned URLs, PostgreSQL, Redis-backed rate limiting, OWASP-aligned audit
            logging, and a full admin panel with user impersonation, DB backup/restore,
            and site-wide lockdown controls.
          </p>
        </div>
      </PopIn>

      {/* Core features */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Core Features
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {coreFeatures.map((f) => (
            <div key={f.title} className="ink-card p-6 h-full">
              <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0 mb-2">{f.title}</h3>
              <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{f.desc}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Tech stack */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Tech Stack
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {techStack.map((s) => (
            <div key={s.category} className="ink-card p-6 h-full">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted uppercase m-0 mb-3.5">
                {s.category}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-tint-green px-3.5 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Architecture */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-3">
          Architecture
        </h2>
        <p className="font-sans text-[15px] leading-[1.55] text-secondary max-w-[760px] m-0 mb-6">
          22 SQLAlchemy models organized across 5 domains power the entire platform.
        </p>
        <div className="space-y-5 mb-14">
          {dbCategories.map((cat) => (
            <div key={cat.name} className="ink-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-44 shrink-0">
                  <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0">{cat.name}</h3>
                  <p className="font-mono text-[10.5px] font-semibold tracking-[0.08em] text-muted uppercase mt-1 m-0">
                    {cat.models.length} models
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 flex-wrap mb-2.5">
                    {cat.models.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[10.5px] font-semibold border-2 border-foreground bg-white px-2.5 py-1 rounded-full"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{cat.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Development timeline */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Development Timeline
        </h2>
        <div className="space-y-5 mb-14">
          {timeline.map((t) => (
            <div key={t.date} className="ink-card p-6 flex flex-col sm:flex-row gap-4">
              <div className="sm:w-40 shrink-0">
                <span className="font-mono text-[11px] font-semibold border-2 border-foreground bg-pop-green px-3 py-1 rounded-full inline-block">
                  {t.date}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0 mb-1.5">{t.title}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Back to projects */}
      <PopIn>
        <Link href="/projects" className="ink-btn ink-btn--dark no-underline">
          &larr; ALL PROJECTS
        </Link>
      </PopIn>
    </main>
  );
}

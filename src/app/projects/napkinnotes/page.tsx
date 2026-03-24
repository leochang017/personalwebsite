import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Link from "next/link";

const coreFeatures = [
  {
    title: "OCR Extraction",
    desc: "Powered by Google Cloud Vision API and PyMuPDF to extract text from handwritten notes, scanned documents, and complex PDF layouts with high accuracy.",
  },
  {
    title: "AI Summarization",
    desc: "Claude API generates concise, structured summaries of uploaded notes, distilling key concepts and definitions for efficient studying.",
  },
  {
    title: "Multi-Format Upload",
    desc: "Supports images, PDFs, DOCX, and TXT files with up to 32 files per note. Drag-and-drop interface for seamless batch uploads.",
  },
  {
    title: "Social Features",
    desc: "Follow classmates, like and comment on shared notes, rate content quality, and bookmark study materials for later review.",
  },
  {
    title: "User Reputation System",
    desc: "Five-tier progression from Beginner to Master based on contribution quality and community engagement. Encourages high-quality note sharing.",
  },
  {
    title: "Course Organization",
    desc: "Organize notes by course with integrated test scheduling. Auto note-locking prevents edits after submission deadlines.",
  },
  {
    title: "Authentication",
    desc: "Dual authentication with Google OAuth for quick sign-in and traditional email/password registration with secure session management.",
  },
  {
    title: "Admin Panel",
    desc: "Comprehensive admin dashboard for user management, content moderation, and detailed audit logging of all platform activities.",
  },
];

const techStack = [
  {
    category: "Backend",
    items: ["Flask 3.1.2", "SQLAlchemy 2.0", "PostgreSQL", "Redis"],
  },
  {
    category: "AI & Processing",
    items: ["Claude API", "Google Cloud Vision", "PyMuPDF", "python-docx"],
  },
  {
    category: "Cloud & Storage",
    items: ["AWS S3", "Flask-Migrate", "Flask-Mail", "Pydantic"],
  },
  {
    category: "Security & Auth",
    items: ["Google OAuth", "Flask-Talisman", "Flask-Limiter", "JWT", "Bcrypt", "CSRF"],
  },
];

const dbCategories = [
  {
    name: "User & Auth",
    models: ["User", "Session", "PasswordReset", "LoginAttempt"],
    detail: "Complete user lifecycle management with OAuth integration and brute-force protection",
  },
  {
    name: "Content & Notes",
    models: ["Note", "NoteFile", "Summary", "Course", "TestSchedule"],
    detail: "Hierarchical content organization with file attachments and AI-generated summaries",
  },
  {
    name: "Social & Engagement",
    models: ["Follow", "Like", "Comment", "Rating", "Bookmark"],
    detail: "Full social graph with bidirectional relationships and engagement tracking",
  },
  {
    name: "Admin & Moderation",
    models: ["AuditLog", "Report", "Notification", "Reputation"],
    detail: "Administrative oversight with comprehensive audit trail and reputation scoring",
  },
];

const timeline = [
  {
    date: "Aug 2025",
    title: "Ideation & Design",
    desc: "Identified the need for a centralized note-sharing platform at PDS. Designed database schema and wireframed the core user experience.",
  },
  {
    date: "Aug \u2013 Sep 2025",
    title: "Development Sprint",
    desc: "Built the full-stack application from scratch. Integrated OCR, AI summarization, authentication, social features, and admin tooling.",
  },
  {
    date: "Sep 2025 \u2013 Present",
    title: "Launch & Growth",
    desc: "Deployed to production serving 500+ PDS students. Continuous iteration based on user feedback, performance optimization, and feature expansion.",
  },
];

const roadmap = [
  {
    title: "Collaborative Editing",
    desc: "Real-time collaborative note editing with conflict resolution and revision history.",
  },
  {
    title: "Mobile Apps",
    desc: "Native iOS and Android applications for on-the-go note access and camera-based uploads.",
  },
  {
    title: "AI Quiz Generation",
    desc: "Automatically generate practice quizzes and flashcards from uploaded notes using AI.",
  },
  {
    title: "Multi-School Expansion",
    desc: "Expand the platform beyond PDS to serve students at other schools with tenant isolation.",
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
              <span className="font-mono text-[11px] font-bold uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
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
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">Overview</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                NapkinNotes is a full-stack AI-powered platform that transforms raw class notes
                into organized, searchable study resources. Built to serve the 500+ students at
                Princeton Day School, it combines optical character recognition, AI-driven
                summarization, and a peer-to-peer social layer to create a collaborative
                learning ecosystem.
              </p>
              <p>
                Students upload notes in any format &mdash; handwritten scans, PDFs, Word
                documents, or plain text &mdash; and the platform extracts, processes, and
                summarizes the content automatically. A social reputation system incentivizes
                high-quality contributions, while course-level organization and test scheduling
                keep study materials structured and accessible.
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
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-accent/30 hover:shadow-md transition-all duration-300">
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
              <div className="bg-surface border border-border rounded-xl p-6 h-full">
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
            18 database models organized across 4 domain categories power the entire platform.
          </p>
        </FadeUp>
        <div className="space-y-4 mb-14">
          {dbCategories.map((cat, i) => (
            <ScaleIn key={cat.name} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 hover:border-olive/30 transition-all duration-300">
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
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row gap-4">
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

        {/* Future Roadmap */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Future Roadmap</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {roadmap.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-accent/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-2">{r.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-body">{r.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Back to Projects */}
        <FadeUp>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex px-8 py-3 rounded-full bg-surface border border-border text-secondary font-semibold text-sm no-underline hover:border-accent/40 hover:text-accent transition-all"
            >
              &larr; All Projects
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

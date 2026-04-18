import Link from "next/link";
import { StickerPill } from "@/components/Doodles";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Achievements" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="sticker-card-surface px-8 py-10 md:px-12 md:py-14 relative overflow-hidden">
          {/* decorative sticker */}
          <div className="absolute top-4 right-4 hidden sm:block wobble-slow">
            <StickerPill color="var(--color-sticker-yellow)" rotate={-8} className="text-xs font-bold uppercase tracking-wider">
              Let&apos;s Chat ✦
            </StickerPill>
          </div>

          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-12">
            {/* Left column — big CTA */}
            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-muted mb-3">
                Get in touch
              </p>
              <h3 className="font-sans text-3xl md:text-4xl font-black leading-[1.05] mb-5">
                Got an idea or just want to say hi?
              </h3>
              <a
                href="mailto:leochang017@gmail.com"
                className="sticker-btn sticker-btn--primary text-sm no-underline"
              >
                leochang017@gmail.com →
              </a>
            </div>

            {/* Middle column — nav */}
            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-muted mb-4">
                Explore
              </p>
              <ul className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-block text-sm font-bold text-foreground no-underline hover:text-accent transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — social */}
            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-muted mb-4">
                Find me
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:leochang017@gmail.com"
                  className="sticker-btn text-sm no-underline"
                  aria-label="Email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/leo.c000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticker-btn text-sm no-underline"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>

              <p className="mt-6 text-xs text-muted font-body">
                Based in Princeton, NJ.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-dashed border-border flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted font-body">
              &copy; {new Date().getFullYear()} Leo Chang. Built with Next.js + coffee.
            </p>
            <a
              href="/images/LeoChangResume_April5_2026.pdf"
              download
              className="text-xs font-bold text-foreground no-underline hover:text-accent transition-colors"
            >
              Download Resume →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

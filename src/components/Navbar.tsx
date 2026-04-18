"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Achievements" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.6, 0, 0.25, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-lg" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-20">
          {/* Wordmark */}
          <Link href="/" className="no-underline flex items-center group">
            <span className="font-sans font-extrabold text-lg text-foreground tracking-tight group-hover:text-accent transition-colors">
              Leo Chang
            </span>
          </Link>

          {/* Center pill nav */}
          <div className="hidden md:flex items-center bg-background/80 backdrop-blur-lg border border-border rounded-full p-1 shadow-sm">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2 text-sm font-semibold no-underline transition-colors rounded-full ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-surface rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Right-side CTAs */}
          <div className="flex items-center gap-2">
            <a
              href="/images/LeoChangResume_April5_2026.pdf"
              download
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-background border border-border text-secondary text-xs font-bold no-underline hover:border-foreground hover:text-foreground transition-all"
            >
              Resume
            </a>
            <a
              href="mailto:leochang017@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent text-background text-xs font-bold no-underline hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              Get in Touch
              <span className="text-sm leading-none">→</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-background border border-border rounded-full cursor-pointer"
              aria-label="Menu"
            >
              <span className={`block w-4 h-[1.5px] bg-foreground rounded transition-all ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-4 h-[1.5px] bg-foreground rounded transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-[1.5px] bg-foreground rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-72 h-full bg-background border-l border-border z-50 p-8 pt-20"
            >
              <div className="flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-full text-base font-semibold no-underline transition-all ${
                        pathname === l.href
                          ? "text-foreground bg-surface"
                          : "text-secondary hover:text-foreground hover:bg-surface/60"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05 + 0.1 }}
                  href="mailto:leochang017@gmail.com"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-accent text-background text-sm font-bold no-underline hover:bg-accent-dark transition-all"
                >
                  Get in Touch <span>→</span>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

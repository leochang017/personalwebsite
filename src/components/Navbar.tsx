"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/achievements", label: "ACHIEVEMENTS" },
  { href: "/about", label: "ABOUT" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b-[3px] border-foreground">
        <div className="flex items-center justify-between px-5 md:px-12 py-3.5">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-sans font-extrabold text-xl tracking-[-0.02em] no-underline text-foreground"
          >
            LC<span className="text-[#c3272e]">.</span>
          </Link>

          {/* Desktop nav — mono chips */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`font-mono text-[11px] font-semibold tracking-[0.08em] px-3.5 py-[7px] border-2 border-foreground no-underline transition-transform duration-150 hover:-translate-y-0.5 ${
                    active
                      ? "bg-foreground text-background hover:text-background"
                      : "bg-background text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href="/images/LeoChangResume_July2026.pdf"
              download
              className="ink-btn ink-btn--yellow ml-2 !text-[11px] !font-bold !tracking-[0.06em] !px-[15px] !py-2 !border-2"
            >
              RESUME.PDF
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-background border-2 border-foreground cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-4 h-[2px] bg-foreground transition-all ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-4 h-[2px] bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-[2px] bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-72 h-full bg-background border-l-[3px] border-foreground z-50 p-6 pt-20"
            >
              <div className="flex flex-col gap-2.5">
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
                      className={`block font-mono text-xs font-semibold tracking-[0.08em] px-4 py-3 border-2 border-foreground no-underline ${
                        isActive(pathname, l.href)
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
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
                  href="/images/LeoChangResume_July2026.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className="ink-btn ink-btn--yellow mt-3 justify-center !text-xs !border-2"
                >
                  RESUME.PDF ↓
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

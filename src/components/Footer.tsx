export function Footer() {
  return (
    <footer id="footer" className="mt-20 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="font-sans font-extrabold text-4xl md:text-[56px] tracking-[-0.03em] mb-6">
          GET IN TOUCH —
        </div>
        <div className="flex gap-3.5 flex-wrap mb-10">
          <a
            href="mailto:leochang017@gmail.com"
            className="ink-btn ink-btn--yellow ink-btn--on-dark"
          >
            leochang017@gmail.com
          </a>
          <a
            href="https://github.com/leochang017"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn ink-btn--dark ink-btn--on-dark"
          >
            github.com/leochang017
          </a>
          <a
            href="https://www.instagram.com/leo.c000/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn ink-btn--dark ink-btn--on-dark"
          >
            instagram ↗
          </a>
          <a
            href="/images/LeoChangResume_July2026.pdf"
            download
            className="ink-btn ink-btn--dark ink-btn--on-dark"
          >
            RESUME.PDF ↓
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2 border-t border-ink-line pt-5 font-mono text-xs font-medium text-paper-dim">
          <span>© {new Date().getFullYear()} Leo Chang · Princeton, NJ</span>
          <span>designed &amp; built by Leo Chang</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * Start a reveal once an element enters the viewport (IntersectionObserver,
 * not ScrollTrigger, so stale trigger positions can never leave content
 * hidden), and force the final state shortly after as a safety net.
 */
export function revealOnce(
  el: Element,
  play: () => void,
  finish: () => void,
  opts: { rootMargin?: string; safetyMs?: number } = {},
): () => void {
  let timer = 0;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      play();
      timer = window.setTimeout(finish, opts.safetyMs ?? 2000);
    },
    { rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    window.clearTimeout(timer);
  };
}

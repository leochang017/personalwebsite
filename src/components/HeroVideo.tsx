"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Ambient hero background video (the sky-ladder climb).
 *
 * The source is a 9:16 phone clip. A wide hero crops it to a centre band
 * anyway, so desktop gets a pre-cropped 16:9 encode that only needs ~1.25x
 * upscaling instead of ~2.7x — that, not the overlay, is what kept it looking
 * soft. Mobile keeps the portrait cut. The source is picked on the client so a
 * phone never downloads the desktop file.
 */
const WIDE = "/video/hero-wide.mp4";
const TALL = "/video/hero.mp4";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const pick = () => setSrc(wide.matches ? WIDE : TALL);
    pick();
    wide.addEventListener("change", pick);
    return () => wide.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduced.matches) video.pause();
      // Autoplay can reject until the user interacts; the poster stays up.
      else void video.play().catch(() => {});
    };

    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* brightness lift keeps ink-black type legible without hiding the footage */}
      <video
        ref={ref}
        key={src ?? "pending"}
        className="w-full h-full object-cover"
        style={{ filter: "brightness(1.09) saturate(1.05)" }}
        src={src ?? undefined}
        poster="/video/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      {/* Light paper wash, heaviest behind the text on the left and clearing to
          the right so the footage stays vivid where nothing sits on top. */}
      {/* Narrow screens get a heavier wash: text spans the full width there, so
          the left-weighted gradient below cannot protect it. */}
      <div className="absolute inset-0 bg-background/45 md:bg-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

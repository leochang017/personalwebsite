import Image from "next/image";

/**
 * Full-width logo banner for experience detail pages.
 *
 * Logos vary from 1:1 (Chipotle) to 5.7:1 (The Spokesman), so the panel fixes
 * the height and lets width follow the intrinsic ratio. Every logo renders
 * complete at a legible size instead of being boxed into a square.
 */
export function LogoBanner({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={`border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] h-28 md:h-36 px-6 md:px-9 flex items-center justify-center mb-8 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        style={{ width: "auto", height: "auto" }}
        className="max-h-[80px] md:max-h-[112px] w-auto max-w-full object-contain"
      />
    </div>
  );
}

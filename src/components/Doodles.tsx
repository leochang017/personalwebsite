"use client";
import { motion } from "framer-motion";

type DoodleProps = { className?: string; color?: string };

// All doodles share a hand-drawn black-outline aesthetic (Al Murphy / La Puce).
// Stroke-width 2.5, round caps, slight imperfections.

export function Pencil({ className, color = "#ffdf4f" }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <g stroke="#1f1a14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 60 L55 20" stroke="#1f1a14" fill={color} strokeWidth="2.5" />
        <path d="M15 60 L12 70 L22 67 L55 34 L48 27 Z" fill={color} />
        <path d="M48 27 L55 34" />
        <path d="M55 20 L62 13 L69 20 L62 27 Z" fill="#f4b97f" />
        <path d="M12 70 L22 67" />
        <path d="M14 66 L18 62" />
      </g>
    </svg>
  );
}

export function Book({ className, color = "#7eb6ff" }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <g stroke="#1f1a14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 20 L14 60 L40 56 L40 18 Z" fill={color} />
        <path d="M40 18 L40 56 L66 60 L66 20 Z" fill="#ffffff" />
        <path d="M14 20 L40 18 L66 20" />
        <path d="M45 28 L60 27" />
        <path d="M45 34 L58 33" />
        <path d="M45 40 L60 39" />
        <path d="M20 28 L35 28" />
        <path d="M20 34 L33 34" />
        <path d="M20 40 L35 40" />
      </g>
    </svg>
  );
}

export function Saber({ className, color = "#c9bda7" }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 40" className={className} fill="none">
      <g stroke="#1f1a14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20 L78 20" stroke="#1f1a14" fill={color} strokeWidth="2.5" />
        <path d="M12 17 L78 17 L78 23 L12 23 Z" fill={color} />
        <circle cx="86" cy="20" r="8" fill="#ed9c55" />
        <path d="M78 13 L78 27" stroke="#1f1a14" strokeWidth="2.5" />
        <path d="M86 13 L86 27" />
      </g>
    </svg>
  );
}

export function Dumpling({ className, color = "#9be8c5" }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <g stroke="#1f1a14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 50 Q12 25 40 20 Q68 25 68 50 Q68 58 60 60 L20 60 Q12 58 12 50 Z" fill={color} />
        <path d="M22 50 Q22 42 30 40 M32 50 Q32 38 40 36 M42 50 Q42 38 50 40 M52 50 Q52 42 58 46" />
        <circle cx="30" cy="36" r="1.8" fill="#1f1a14" />
        <circle cx="50" cy="36" r="1.8" fill="#1f1a14" />
        <path d="M36 44 Q40 46 44 44" />
      </g>
    </svg>
  );
}

export function Star({ className, color = "#ff7eb6" }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <g stroke="#1f1a14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M40 8 L47 26 L65 27 L51 40 L56 58 L40 48 L24 58 L29 40 L15 27 L33 26 Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function Squiggle({ className, color = "#ed9c55" }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none">
      <path
        d="M5 20 Q15 5 25 20 T45 20 T65 20 T85 20 T105 20 T115 20"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

import type { Variants } from "framer-motion";

const floatAnim: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: (i: number) => ({
    y: [0, -8, 0, 6, 0],
    rotate: [0, 3, -2, 2, 0],
    transition: {
      duration: 6 + i,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.3,
    },
  }),
};

export function FloatingDoodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute top-[12%] left-[4%] w-16 h-16 opacity-80" variants={floatAnim} initial="initial" animate="animate" custom={0}>
        <Pencil className="w-full h-full" />
      </motion.div>
      <motion.div className="absolute top-[8%] right-[8%] w-20 h-20 opacity-80" variants={floatAnim} initial="initial" animate="animate" custom={1}>
        <Book className="w-full h-full" />
      </motion.div>
      <motion.div className="absolute bottom-[20%] left-[6%] w-24 h-10 opacity-80" variants={floatAnim} initial="initial" animate="animate" custom={2}>
        <Saber className="w-full h-full" />
      </motion.div>
      <motion.div className="absolute top-[45%] right-[3%] w-16 h-16 opacity-80" variants={floatAnim} initial="initial" animate="animate" custom={3}>
        <Dumpling className="w-full h-full" />
      </motion.div>
      <motion.div className="absolute bottom-[8%] right-[18%] w-14 h-14 opacity-80" variants={floatAnim} initial="initial" animate="animate" custom={4}>
        <Star className="w-full h-full" />
      </motion.div>
      <motion.div className="absolute top-[62%] left-[20%] w-20 h-7 opacity-80" variants={floatAnim} initial="initial" animate="animate" custom={5}>
        <Squiggle className="w-full h-full" />
      </motion.div>
    </div>
  );
}

// Sticker pill — Al Murphy-style rounded capsule with thick black outline.
export function StickerPill({
  children,
  color = "var(--color-sticker-pink)",
  rotate = -3,
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ scale: 0, rotate: rotate - 10 }}
      animate={{ scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.3 }}
      whileHover={{ rotate: rotate + 2, y: -4 }}
      className={`inline-block px-5 py-1 rounded-full border-[3px] border-foreground ${className}`}
      style={{ background: color }}
    >
      {children}
    </motion.span>
  );
}

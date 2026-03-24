"use client";
import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setStyle({ rotateX, rotateY, scale: 1.02 });
  }

  function handleLeave() {
    setStyle({ rotateX: 0, rotateY: 0, scale: 1 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={style}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={className}
    >
      {/* gloss overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${style.rotateY * 6 + 50}% ${-style.rotateX * 6 + 50}%, rgba(255,255,255,0.06), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

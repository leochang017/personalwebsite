"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function ParallaxBg({
  className = "",
  speed = 0.3,
}: {
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 150, speed * -150]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div style={{ y }} className={`absolute inset-0 ${className}`} />
    </div>
  );
}

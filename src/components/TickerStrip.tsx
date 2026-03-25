"use client";

const facts = [
  "3 Projects Built",
  "Accepted for Publishing in JEI",
  "1st Place PClassic",
  "500+ Students Served",
  "660+ Volunteer Hours",
  "5 Leadership Roles",
  "18+ Awards",
  "Python · Java · JavaScript",
  "React · Flask · TensorFlow",
  "Godot · GDScript",
  "Princeton Day School",
  "Class of 2027",
  "Saber Fencing — 2nd Place State",
  "Editor in Chief — The Spokesman",
  "Co-Founder — NapkinNotes",
];

export function TickerStrip() {
  const doubled = [...facts, ...facts];
  return (
    <div className="relative py-2.5 bg-surface/50 border-y border-border overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex gap-10 w-max"
        style={{ animation: "ticker-scroll 40s linear infinite" }}
      >
        {doubled.map((fact, i) => (
          <span
            key={`${fact}-${i}`}
            className="whitespace-nowrap font-mono text-[11px] text-muted"
          >
            {fact}
            <span className="ml-10 text-accent/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

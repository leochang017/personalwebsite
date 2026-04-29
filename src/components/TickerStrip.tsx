"use client";

const facts = [
  "3 Projects Built",
  "Accepted for Publishing in JEI",
  "1st Place PClassic",
  "500+ Students Served",
  "660+ Volunteer Hours",
  "5 Leadership Roles",
  "19+ Awards",
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
    <div
      className="relative py-3 bg-sticker-yellow overflow-hidden -rotate-[0.5deg] mx-[-1rem]"
      style={{ borderTop: "2.5px solid var(--color-foreground)", borderBottom: "2.5px solid var(--color-foreground)" }}
    >
      <div
        className="flex gap-8 w-max"
        style={{ animation: "ticker-scroll 40s linear infinite" }}
      >
        {doubled.map((fact, i) => (
          <span
            key={`${fact}-${i}`}
            className="whitespace-nowrap font-sans text-sm font-black text-foreground uppercase tracking-wide"
          >
            {fact}
            <span className="ml-8 text-accent">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

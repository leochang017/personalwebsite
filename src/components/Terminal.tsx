"use client";
import { useState, useRef } from "react";

const PROJECTS: Record<string, { name: string; description: string; tech: string; route: string }> = {
  napkinnotes: { name: "NapkinNotes", description: "AI-powered note platform with OCR, Claude summarization, social layer, and a student marketplace", tech: "Flask, PostgreSQL, Claude API, AWS S3, Google Cloud Vision", route: "/projects/napkinnotes" },
  stockml: { name: "Stock Price Prediction ML", description: "LSTM models for stock price prediction using Twitter sentiment", tech: "Python, TensorFlow, LSTM, NLP", route: "/projects/stockml" },
  phasespector: { name: "Phase Spector", description: "Top-down wave-based arcade shooter with a time-rewind combat mechanic", tech: "Godot 4, GDScript", route: "/projects/phasespector" },
};

export function Terminal() {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([
    { text: 'Welcome to Leo\'s terminal. Type "help" for commands.', type: "info" },
  ]);
  const [input, setInput] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  function add(text: string, type = "") {
    setLines((p) => [...p, { text, type }]);
    setTimeout(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, 10);
  }

  function run(raw: string) {
    const parts = raw.trim().toLowerCase().split(" ");
    add(`$ ${raw}`, "command");

    switch (parts[0]) {
      case "help":
        [
          "Commands:",
          "  ls           — list all projects",
          "  cat <name>   — view & open project",
          "  clear        — clear terminal",
        ].forEach((l) => add(l, "info"));
        break;
      case "ls": case "list":
        add("Projects:", "info");
        Object.entries(PROJECTS).forEach(([k, p]) => add(`  ${k.padEnd(15)} ${p.name}`, "success"));
        break;
      case "cat": case "view":
        if (parts[1] && PROJECTS[parts[1]]) {
          const p = PROJECTS[parts[1]];
          add(`  ${p.name}`, "info");
          add(`  ${p.tech}`, "info");
          add(`  ${p.description}`, "info");
          add(`Opening ${p.name}...`, "success");
          setTimeout(() => { window.location.href = p.route; }, 500);
        } else add('Not found. Try "ls"', "error");
        break;
      case "clear": setLines([]); break;
      default: add(`Unknown: ${parts[0]}. Type "help"`, "error");
    }
  }

  return (
    <div
      className="rounded-3xl overflow-hidden bg-[#1f1a14] max-w-2xl mx-auto"
      style={{
        border: "2.5px solid var(--color-foreground)",
        boxShadow: "6px 6px 0 0 var(--color-foreground)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 bg-sticker-yellow"
        style={{ borderBottom: "2.5px solid var(--color-foreground)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-sticker-pink" style={{ border: "1.5px solid var(--color-foreground)" }} />
          <div className="w-3 h-3 rounded-full bg-sticker-mint" style={{ border: "1.5px solid var(--color-foreground)" }} />
          <div className="w-3 h-3 rounded-full bg-accent" style={{ border: "1.5px solid var(--color-foreground)" }} />
        </div>
        <span className="font-mono text-xs font-bold text-foreground">leo@portfolio ~</span>
      </div>
      <div className="p-5 font-mono text-sm min-h-[260px]">
        <div ref={ref} className="max-h-[200px] overflow-y-auto mb-3 space-y-0.5">
          {lines.map((l, i) => (
            <div key={i} className={
              l.type === "command" ? "text-[#f5efe4] font-bold" :
              l.type === "success" ? "text-[#9be8c5]" :
              l.type === "error" ? "text-[#ff7eb6]" :
              "text-[#ffdf4f]"
            }>{l.text}</div>
          ))}
        </div>
        <div
          className="flex items-center gap-2 bg-[#2a241c] rounded-full px-4 py-2.5"
          style={{ border: "2px solid #4a3f32" }}
        >
          <span className="text-[#ed9c55] font-black text-base">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { run(input); setInput(""); } }}
            className="flex-1 bg-transparent border-none outline-none text-[#f5efe4] font-mono text-sm placeholder-[#7a6f5d] font-semibold"
            placeholder="Type a command..."
            maxLength={200}
          />
        </div>
      </div>
    </div>
  );
}

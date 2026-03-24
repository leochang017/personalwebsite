"use client";
import { useState, useRef } from "react";

const PROJECTS: Record<string, { name: string; description: string; tech: string }> = {
  napkinnotes: { name: "NapkinNotes", description: "AI-powered platform for transforming class notes into study resources", tech: "AI/ML, React, Node.js, Python" },
  stockml: { name: "Stock Price Prediction ML", description: "LSTM models for stock price prediction using Twitter sentiment", tech: "Python, TensorFlow, LSTM, NLP" },
  phasespector: { name: "Phase Spector", description: "Top-down wave-based arcade shooter with a time-rewind combat mechanic", tech: "Godot 4, GDScript" },
};

const NAV_PAGES: Record<string, string> = {
  projects: "/projects",
  experience: "/experience",
  achievements: "/achievements",
  about: "/about",
  home: "/",
  "~": "/",
};

const PROJECT_ROUTES: Record<string, string> = {
  napkinnotes: "/projects/napkinnotes",
  stockml: "/projects/stockml",
  phasespector: "/projects/phasespector",
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

  function navigate(path: string, label: string) {
    add(`Opening ${label}...`, "success");
    setTimeout(() => { window.location.href = path; }, 500);
  }

  function run(raw: string) {
    const trimmed = raw.trim().toLowerCase();
    const parts = trimmed.split(" ");
    add(`$ ${raw}`, "command");

    // Handle "cd <page>" navigation
    if (parts[0] === "cd" && parts[1]) {
      const target = parts[1];
      if (NAV_PAGES[target]) {
        navigate(NAV_PAGES[target], target === "~" ? "home" : target);
        return;
      }
    }

    // Handle direct page name navigation
    if (NAV_PAGES[parts[0]] && parts[0] !== "~") {
      navigate(NAV_PAGES[parts[0]], parts[0]);
      return;
    }

    switch (parts[0]) {
      case "help":
        [
          "Commands:",
          "  ls          — list projects",
          "  cat <name>  — view project",
          "  cd <page>   — navigate to page (projects, experience, achievements, about)",
          "  skills      — technical skills",
          "  clear       — clear terminal",
        ].forEach((l) => add(l, "info"));
        break;
      case "ls": case "list":
        add("Projects:", "info");
        Object.entries(PROJECTS).forEach(([k, p]) => add(`  ${k.padEnd(15)} ${p.name}`, "success"));
        break;
      case "cat": case "view":
        if (parts[1] && PROJECTS[parts[1]]) {
          const p = PROJECTS[parts[1]];
          add(`  ${p.name}`, "info"); add(`  ${p.tech}`, "info"); add(`  ${p.description}`, "info");
          if (PROJECT_ROUTES[parts[1]]) {
            navigate(PROJECT_ROUTES[parts[1]], p.name);
          }
        } else add('Not found. Try "ls"', "error");
        break;
      case "skills":
        ["Languages: Python, Java, JavaScript, HTML/CSS", "Frameworks: React, Node.js, TensorFlow, PyTorch", "Tools: Git, Docker, AWS, MongoDB, PostgreSQL"].forEach((l) => add(`  ${l}`, "info"));
        break;
      case "clear": setLines([]); break;
      default: add(`Unknown: ${parts[0]}. Type "help"`, "error");
    }
  }

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-[#2c2418] shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#3a3028] border-b border-[#4a3f32]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c2703e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#b8a88a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#6b7c4e]" />
        </div>
        <span className="font-mono text-xs text-[#b8a88a]">leo@portfolio ~</span>
      </div>
      <div className="p-4 font-mono text-sm min-h-[260px]">
        <div ref={ref} className="max-h-[200px] overflow-y-auto mb-3 space-y-0.5">
          {lines.map((l, i) => (
            <div key={i} className={
              l.type === "command" ? "text-[#e8e0d4]" :
              l.type === "success" ? "text-[#8a9a6c]" :
              l.type === "error" ? "text-[#c2703e]" :
              "text-[#b8a88a]"
            }>{l.text}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-[#3a3028]/50 rounded-lg px-3 py-2 border border-[#4a3f32]">
          <span className="text-[#c2703e] font-bold">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { run(input); setInput(""); } }}
            className="flex-1 bg-transparent border-none outline-none text-[#e8e0d4] font-mono text-sm placeholder-[#6b5e50]"
            placeholder="Type a command..."
            maxLength={200}
          />
        </div>
      </div>
    </div>
  );
}

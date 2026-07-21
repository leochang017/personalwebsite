"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* Shown when the assistant cannot answer, so a visitor still leaves with a way
   to reach Leo rather than a dead end. */
const OFFLINE =
  "I'm temporarily unavailable. You can browse the site for Leo's projects, experience, and awards, or email him directly at leochang017@gmail.com.";

const suggestions = [
  "What is his research about?",
  "What is NapkinNotes?",
  "What are his awards?",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi, I'm Boe Beo. I can answer questions about Leo's research, projects, experience, and awards. Ask below, or pick a question to start." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(preset?: string) {
    const userMsg = (preset ?? input).trim();
    if (!userMsg || loading) return;
    setInput("");
    const updatedMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role !== "assistant" || updatedMessages.indexOf(m) > 0)
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      let reply: string;
      if (res.status === 429) {
        reply = "That's a lot of questions at once. Please wait a moment and try again.";
      } else if (!res.ok) {
        // Upstream is down or over quota: hand the visitor a route that works.
        reply = OFFLINE;
      } else {
        reply = data.content?.[0]?.text || data.response || data.message || OFFLINE;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: OFFLINE }]);
    }
    setLoading(false);
  }

  return (
    <div className="fixed right-4 md:right-7 bottom-3 md:bottom-7 z-50 flex flex-col items-end gap-3.5">
      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="w-[min(372px,calc(100vw-2rem))] bg-background border-[3px] border-foreground shadow-[5px_5px_0_var(--color-ink-shadow)] flex flex-col overflow-hidden"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* header */}
            <div className="flex justify-between items-center px-[18px] py-3.5 bg-foreground text-background">
              <span className="font-sans font-bold text-[13px] tracking-[0.04em] flex items-center gap-2.5">
                <Image src="/images/dumpling.svg" alt="" width={20} height={20} className="w-5 h-5" />
                BOE BEO — ASK ANYTHING ABOUT LEO
              </span>
              <button
                onClick={() => setOpen(false)}
                className="font-sans font-bold text-sm bg-transparent border-none text-background cursor-pointer px-1.5 py-0.5"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* messages */}
            <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-2.5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`font-sans font-medium text-[13px] leading-[1.55] border-2 border-foreground px-3.5 py-2.5 max-w-[86%] ${
                    m.role === "user"
                      ? "bg-ink-yellow self-end"
                      : "bg-white self-start"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="bg-white border-2 border-foreground px-3.5 py-2.5 self-start flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* suggestion chips */}
            <div className="flex gap-1.5 flex-wrap px-4 pb-3">
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="font-mono text-[10.5px] font-semibold bg-white border-2 border-foreground rounded-full px-[11px] py-[5px] cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <div className="flex gap-2 px-4 py-3 border-t-[3px] border-foreground bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="type a question…"
                maxLength={500}
                className="flex-1 min-w-0 font-mono text-[13px] font-medium border-2 border-foreground px-3 py-2 bg-background outline-offset-2 text-foreground placeholder:text-muted"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className="font-sans font-bold text-[13px] bg-ink-yellow border-2 border-foreground shadow-[3px_3px_0_var(--color-ink-shadow)] px-4 py-2 cursor-pointer disabled:opacity-50 transition-[transform,box-shadow] duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none shrink-0"
              >
                SEND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* trigger pill */}
      <motion.button
        initial={false}
        whileHover={{ x: -2, y: -2 }}
        whileTap={{ x: 3, y: 3 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 font-sans font-bold text-sm bg-ink-yellow border-[3px] border-foreground shadow-[3px_3px_0_var(--color-ink-shadow)] px-[22px] py-[13px] rounded-full cursor-pointer"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <Image src="/images/dumpling.svg" alt="" width={22} height={22} className="w-[22px] h-[22px]" />
        {open ? "CLOSE" : "ASK ME ANYTHING"}
      </motion.button>
    </div>
  );
}

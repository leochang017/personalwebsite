"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Boe Beo, Leo's AI assistant. Ask me anything about Leo's projects, experience, achievements, or skills!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
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
        reply = "You're sending messages too fast — please wait a minute and try again!";
      } else if (!res.ok) {
        reply = "Sorry, something went wrong. Try again later!";
      } else {
        reply = data.content?.[0]?.text || data.response || data.message || "Sorry, I couldn't process that.";
      }
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Try again later!" }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            whileHover={{ rotate: -6, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-accent flex items-center justify-center text-xl z-50 cursor-pointer"
            style={{
              border: "2.5px solid var(--color-foreground)",
              boxShadow: "4px 4px 0 0 var(--color-foreground)",
            }}
            aria-label="Open chat"
          >
            <Image src="/images/dumpling.svg" alt="Boe Beo" width={32} height={32} className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="fixed bottom-6 right-6 w-[380px] h-[520px] bg-background rounded-3xl flex flex-col z-50 overflow-hidden"
            style={{
              transformOrigin: "bottom right",
              border: "2.5px solid var(--color-foreground)",
              boxShadow: "6px 6px 0 0 var(--color-foreground)",
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 bg-sticker-yellow" style={{ borderBottom: "2.5px solid var(--color-foreground)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center overflow-hidden p-1" style={{ border: "2.5px solid var(--color-foreground)" }}>
                  <Image src="/images/dumpling.svg" alt="Boe Beo" width={28} height={28} className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-sans font-black text-sm leading-tight">Boe Beo</p>
                  <p className="text-[10px] font-bold text-foreground/70 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-olive inline-block" /> Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-foreground text-sm font-bold cursor-pointer hover:-translate-y-0.5 transition-transform"
                style={{ border: "2.5px solid var(--color-foreground)" }}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      m.role === "user"
                        ? "bg-accent text-foreground rounded-br-sm"
                        : "bg-surface text-foreground rounded-bl-sm"
                    }`}
                    style={{ border: "2px solid var(--color-foreground)" }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1" style={{ border: "2px solid var(--color-foreground)" }}>
                    <span className="w-2 h-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* input */}
            <div className="p-3 bg-surface" style={{ borderTop: "2.5px solid var(--color-foreground)" }}>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask about Leo..."
                  className="flex-1 bg-background rounded-full px-4 py-2.5 text-sm font-body outline-none text-foreground placeholder-muted font-semibold"
                  style={{ border: "2px solid var(--color-foreground)" }}
                  maxLength={500}
                />
                <button
                  onClick={send}
                  disabled={loading}
                  className="w-11 h-11 rounded-full bg-accent text-foreground text-base font-black cursor-pointer disabled:opacity-50 hover:-translate-y-0.5 transition-transform flex items-center justify-center shrink-0"
                  style={{ border: "2.5px solid var(--color-foreground)" }}
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

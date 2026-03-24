"use client";
import { useState, useRef, useEffect } from "react";
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

    const systemPrompt = `You are Boe Beo, an AI assistant for Leo Chang's portfolio website. Your role is to answer questions about Leo based on the following information:

Leo Chang is a Junior at Princeton Day School (Class of 2027) in Princeton, NJ. He is interested in computer science, economics, and finance, with a particular passion for machine learning and artificial intelligence.

PROJECTS (3 total):
1. NapkinNotes — Co-Founder & Lead Developer. AI-powered EdTech platform serving 500+ PDS students. Built with Flask 3.1.2, PostgreSQL, Claude API (Anthropic), Google Cloud Vision API, AWS S3, Redis, 89 total dependencies. Features: OCR extraction, AI summarization, multi-format upload, social features, reputation system, course organization, Google OAuth, admin panel.
2. Stock Price Prediction ML — Lead Researcher. Published in Journal of Emerging Investigators (JEI). LSTM models for stock prediction using Twitter sentiment. Tested AAPL, TSLA, MSFT with 80,793 tweets. Key finding: sentiment DEGRADED predictions by ~32% average RMSE (AAPL +39.7%, TSLA +32.5% p=0.003, MSFT +24.3%). Built with Python, TensorFlow/Keras, PyTorch, TextBlob, scikit-learn.
3. Phase Spector — Game Developer. Top-down wave-based arcade shooter with time-rewind mechanic. Built in Godot 4.6/GDScript. Features: 3 enemy types, score multiplier, projectile deflection, dynamic difficulty, high score leaderboard. Available for 500+ PDS students.

EXPERIENCE:
- Chipotle Mexican Grill — Team Member (Sep 2025-Present), Yardley & Warrington PA
- Mundial Financial Group — Web Dev & Content Strategy Intern (Jul-Sep 2025), Remote. CEO Quote: praised his technical skills and professionalism.
- Achievable, Inc. — Content Marketing Intern (Jul-Oct 2024), Remote. 15+ articles. CEO Tyler York praised his work.
- Capital Health — Junior Volunteer (Jul-Aug 2024), 66+ hours

LEADERSHIP (5 roles):
- Ti-Ratana Welfare Society — Director of Educational Program (2020-Present). 600+ hours over 5+ years. Ti-Ratana is one of the largest independent charitable welfare organizations in Kuala Lumpur, Malaysia, operating children's homes, shelters, and healthcare services. Leo provides weekly Zoom lessons in English and science to children in their children's homes. Led community fundraiser raising $8,000 for e-learning tools. Featured in Malaysian newspaper.
- ObCHESSed Chess Club — Founder & President (Sep 2025-Present). 20+ members at PDS.
- The Spokesman — Editor in Chief (3+ years). Rose from Associate Editor to Online Editor to EIC.
- Science Olympiad — Team Member & Middle School Co-head (2024-Present). Competes on varsity in Helicopter and Electric Vehicle events. Co-heads the middle school team.
- Varsity Fencing — Saber (2023-Present). 2nd Place NJSIAA Regionals, state qualifier. Fencing since age 6.

ACHIEVEMENTS (17 total):
Competitions: PClassic 1st (UPenn, 2024), National Ballroom Dance 1st (Sophomore 2024), National Ballroom Dance Finalist (Freshman 2023), National Ballroom Dance Finalist (Junior 2025), NJSIAA Fencing Individual 2nd (2025), NJSIAA Fencing Team 2nd (2025), Science Olympiad Regionals Helicopter 3rd (2025 & 2026), Science Olympiad States Helicopter 5th (2025), Science Olympiad States Electric Vehicle 6th (2025), Science Olympiad States Helicopter 5th (2026), HackBac Hackathon 3rd (2024), NEC 4th (2024).
Writing: Scholastic Silver Key for "Legacy" (2024), White Enso Journal "Snow Haiku" (2024), Creative Communications published poetry (2024).
Research: Published paper in JEI (2025).
Academic: Dual Enrollment — Latin 4 college credit (completed 2025).

EDUCATION: Princeton Day School, Junior, Class of 2027.
Completed: AP Computer Science A (Score: 4), Latin 4 (Dual enrollment, college credit).
Current: AP Micro & Macro Economics, AP Chemistry, AP Comparative Government, Honors Precalculus, Honors Physics.
Languages spoken: English, Chinese, Latin.

Contact: leochang017@gmail.com. Website: leochang.net.

CHRONOLOGICAL TIMELINE:
2020: Started Ti-Ratana educational program
2023: Freshman — National Ballroom Dance Finalist, joined varsity fencing, started at PDS
2024: Sophomore — PClassic 1st, Ballroom Dance National Champion 1st, NJSIAA Fencing 2nd, HackBac 3rd, NEC 4th, Scholastic Silver Key, published poetry, Capital Health volunteer (66+ hrs), Achievable internship (15+ articles), AP CSA (Score: 4), Latin 4 dual enrollment
2025: Junior (current) — Published JEI research paper, NJSIAA Fencing Individual & Team 2nd, Science Olympiad Regionals Helicopter 3rd, Science Olympiad States Helicopter 5th & Electric Vehicle 6th, Ballroom Dance National Finalist, Mundial Financial internship, founded ObCHESSed, started Chipotle, NapkinNotes active development, Phase Spector released
2026: Science Olympiad Regionals Helicopter 3rd, States Helicopter 5th

Guidelines:
- Be SHORT and conversational, like texting a friend. 1-2 sentences max per response. No long paragraphs.
- NEVER use markdown formatting like **bold** or *italic* or bullet points. Plain text only. No asterisks.
- Sound casual and friendly, not formal or robotic. Use natural language.
- If someone asks multiple things, answer briefly and ask if they want more detail.
- If asked about something not in the knowledge base, just say you're not sure about that.
- Don't make up information.`;

    try {
      const res = await fetch("https://portfolio-chatbot-backend-56ki4rxmw.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          messages: updatedMessages
            .filter((m) => m.role !== "assistant" || updatedMessages.indexOf(m) > 0)
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || data.response || data.message || "Sorry, I couldn't process that.";
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center text-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all z-50 border-none cursor-pointer"
            aria-label="Open chat"
          >
            <img src="/images/chat-icon.svg" alt="Chat" className="w-7 h-7 invert" />
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[380px] h-[520px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center overflow-hidden p-1">
                  <img src="/images/dumpling.svg" alt="Boe Beo" className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-sans font-bold text-sm">Boe Beo</p>
                  <p className="text-[10px] text-muted flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-olive inline-block" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg hover:bg-surface-light flex items-center justify-center text-muted text-sm bg-transparent border-none cursor-pointer">✕</button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-surface border border-border text-foreground rounded-bl-md"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* input */}
            <div className="p-4 border-t border-border bg-surface">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                  placeholder="Ask about Leo..."
                  className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-accent transition-colors text-foreground placeholder-muted"
                  maxLength={500}
                />
                <button
                  onClick={send}
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-bold border-none cursor-pointer hover:bg-accent-dark transition-colors disabled:opacity-50"
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

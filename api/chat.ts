/**
 * Vercel serverless function: thin proxy for the "Boe Beo" chatbot.
 *
 * The browser posts { messages } here; this function adds the knowledge-base
 * system prompt and the proxy secret, then forwards to the chatbot backend.
 * Mirrors the previous site's Next.js route (validation, per-IP rate limit,
 * 20s timeout). Set CHAT_PROXY_SECRET in the Vercel project env.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
// ".js" on purpose: the Vercel function runs as native ESM, which needs an explicit extension (TS maps it to chatbot.ts)
import { CHAT_BACKEND_URL, CHAT_SYSTEM_PROMPT } from "../src/content/chatbot.js";

const BACKEND_TIMEOUT_MS = 20_000;
const RATE_LIMIT = 10; // requests
const RATE_WINDOW_MS = 60_000; // per minute per IP
const MAX_MESSAGES = 20;
const MAX_CONTENT = 5000;

type Msg = { role: "user" | "assistant"; content: string };
const hits = new Map<string, number[]>();

function clientIp(req: IncomingMessage) {
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : fwd?.split(",")[0];
  return first?.trim() || (req.headers["x-real-ip"] as string | undefined) || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 200_000) reject(new Error("too large"));
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function validate(raw: unknown): Msg[] | null {
  if (!raw || typeof raw !== "object") return null;
  const msgs = (raw as { messages?: unknown }).messages;
  if (!Array.isArray(msgs) || msgs.length === 0 || msgs.length > MAX_MESSAGES) return null;
  const out: Msg[] = [];
  for (const m of msgs) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    if (content.length === 0 || content.length > MAX_CONTENT) return null;
    out.push({ role, content });
  }
  return out;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  if (rateLimited(clientIp(req))) return send(res, 429, { error: "Too many requests. Try again in a minute." });

  let messages: Msg[] | null = null;
  try {
    messages = validate(JSON.parse(await readBody(req)));
  } catch {
    messages = null;
  }
  if (!messages) return send(res, 400, { error: "Invalid request" });

  const secret = process.env.CHAT_PROXY_SECRET;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS);
  try {
    const upstream = await fetch(CHAT_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret ? { "x-proxy-key": secret } : {}) },
      body: JSON.stringify({ system: CHAT_SYSTEM_PROMPT, messages }),
      signal: controller.signal,
    });
    const data = await upstream.json();
    return send(res, upstream.status, data);
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return send(res, aborted ? 504 : 502, { error: aborted ? "The assistant timed out." : "The assistant is unavailable." });
  } finally {
    clearTimeout(timeout);
  }
}

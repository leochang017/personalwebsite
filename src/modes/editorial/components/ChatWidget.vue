<script setup lang="ts">
/**
 * "Boe Beo", Leo's site assistant: an ink pill bottom-right that opens a
 * rectangular chat panel. Posts the conversation (last 20 turns) plus the
 * knowledge-base system prompt to the chatbot backend.
 */
import { nextTick, onUnmounted, ref } from "vue";
import { CHAT_PROXY_PATH, CHAT_SUGGESTIONS } from "../../../content/chatbot";
import { reducedMotion } from "../lib/motion";
import { ui } from "../lib/state";
import { sfx } from "../lib/sfx";

type Msg = { role: "user" | "assistant"; content: string };

const open = ref(false);
const closing = ref(false);
const messages = ref<Msg[]>([]);
const draft = ref("");
const busy = ref(false);
const panel = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const pill = ref<HTMLButtonElement | null>(null);

const MAX_TURNS = 20;
const TIMEOUT_MS = 20000;
const FAIL = "I couldn't reach my brain just now. Try again in a moment.";

function pickSuggestions(): string[] {
  const pool = [...CHAT_SUGGESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 4);
}
const suggestions = ref<string[]>(pickSuggestions());

function scrollDown() {
  nextTick(() => {
    if (list.value) list.value.scrollTop = list.value.scrollHeight;
  });
}

function readReply(data: unknown): string {
  if (data && typeof data === "object") {
    const d = data as { content?: unknown; reply?: unknown; text?: unknown };
    if (Array.isArray(d.content) && d.content.length) {
      const first = d.content[0] as { text?: unknown };
      if (typeof first?.text === "string") return first.text;
    }
    if (typeof d.reply === "string") return d.reply;
    if (typeof d.text === "string") return d.text;
  }
  return JSON.stringify(data);
}

async function send(text?: string) {
  const content = (text ?? draft.value).trim();
  if (!content || busy.value) return;
  sfx("send");
  draft.value = "";
  messages.value.push({ role: "user", content });
  scrollDown();
  busy.value = true;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(CHAT_PROXY_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.value.slice(-MAX_TURNS) }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    messages.value.push({ role: "assistant", content: readReply(data) });
  } catch {
    messages.value.push({ role: "assistant", content: FAIL });
  } finally {
    window.clearTimeout(timer);
    busy.value = false;
    // keep the stored history bounded too
    if (messages.value.length > MAX_TURNS) messages.value = messages.value.slice(-MAX_TURNS);
    scrollDown();
    nextTick(() => input.value?.focus());
  }
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return;
  if (e.key === "Escape") {
    e.stopPropagation();
    close();
    return;
  }
  if (e.key === "Tab" && panel.value) {
    const f = Array.from(panel.value.querySelectorAll<HTMLElement>("button:not([disabled]), input, a[href]"));
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

function toggle() {
  if (open.value) close();
  else {
    open.value = true;
    sfx("open");
    closing.value = false;
    if (!messages.value.length) suggestions.value = pickSuggestions();
    window.addEventListener("keydown", onKey);
    nextTick(() => input.value?.focus());
  }
}

let closeTimer = 0;
function close() {
  if (!open.value) return;
  sfx("close");
  window.removeEventListener("keydown", onKey);
  closing.value = true;
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(
    () => {
      open.value = false;
      closing.value = false;
    },
    reducedMotion ? 0 : 160,
  );
  pill.value?.focus();
}

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  window.clearTimeout(closeTimer);
});
</script>

<template>
  <div v-show="ui.introDone && !ui.creditsOpen && !ui.menuOpen && !ui.lightboxOpen" class="chat" data-no-feed data-cursor="">
    <div
      v-if="open"
      ref="panel"
      class="panel"
      :class="{ closing }"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
      data-lenis-prevent
    >
      <header class="head">
        <img class="ico" src="/images/dumpling.svg" alt="" />
        <p id="chat-title" class="title">Boe Beo <span class="dim">· Leo's assistant</span></p>
        <button class="x" type="button" aria-label="Close chat" @click="close">×</button>
      </header>
      <div ref="list" class="list" aria-live="polite">
        <div v-if="!messages.length" class="empty">
          <p class="hello">Hi, I'm Boe Beo. Ask me anything about Leo: projects, research, awards, or how to reach him.</p>
          <div class="sugs">
            <button v-for="s in suggestions" :key="s" class="sug" type="button" @click="send(s)">{{ s }}</button>
          </div>
        </div>
        <p v-for="(m, i) in messages" :key="i" class="msg" :class="m.role">{{ m.content }}</p>
        <p v-if="busy" class="msg assistant typing" aria-label="Boe Beo is typing"><i /><i /><i /></p>
      </div>
      <form class="form" @submit.prevent="send()">
        <label class="sr-only" for="chat-input">Message</label>
        <input id="chat-input" ref="input" v-model="draft" type="text" autocomplete="off" placeholder="Ask about Leo…" maxlength="500" />
        <button class="send" type="submit" :disabled="busy || !draft.trim()">Send</button>
      </form>
    </div>
    <button
      ref="pill"
      class="pill"
      type="button"
      :aria-expanded="open"
      aria-haspopup="dialog"
      data-sfx="pop"
      data-sfx-hover
      @click="toggle"
    >
      <img src="/images/dumpling.svg" alt="" />
      <span>{{ open ? "Close chat" : "Ask me anything" }}</span>
    </button>
  </div>
</template>

<style scoped>
.pill {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 8999;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px 9px 10px;
  border-radius: 999px;
  background: var(--ed-ink);
  color: var(--ed-bg);
  font: 500 12px/1 var(--font-body);
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(2, 32, 22, 0.18);
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}
.pill img {
  width: 20px;
  height: 20px;
  background: var(--ed-bg);
  border-radius: 50%;
  padding: 2px;
}
@media (hover: hover) and (pointer: fine) {
  .pill:hover {
    transform: translateY(-2px);
  }
}
.pill:active {
  transform: scale(0.97);
}
.pill:focus-visible {
  outline: 2px solid var(--ed-ink);
  outline-offset: 3px;
}
.panel {
  position: fixed;
  right: 20px;
  bottom: 72px;
  z-index: 8998;
  width: min(380px, calc(100vw - 40px));
  height: min(560px, calc(100dvh - 110px));
  display: flex;
  flex-direction: column;
  background: #fff;
  color: var(--ed-ink);
  border: 1px solid var(--ed-ink);
  border-radius: 0;
  box-shadow: 0 18px 50px rgba(2, 32, 22, 0.16);
  transform-origin: calc(100% - 70px) 100%;
  animation: chat-in 0.22s cubic-bezier(0.23, 1, 0.32, 1);
}
.panel.closing {
  animation: chat-out 0.16s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
@keyframes chat-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
}
@keyframes chat-out {
  to {
    opacity: 0;
    transform: translateY(6px) scale(0.98);
  }
}
.head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 14px 12px 16px;
  border-bottom: 1px solid var(--ed-ink);
}
.ico {
  width: 22px;
  height: 22px;
}
.title {
  flex: 1;
  margin: 0;
  font: 500 14px/1 var(--font-body);
}
.dim {
  color: rgba(2, 32, 22, 0.5);
  font-weight: 400;
}
.x {
  width: 32px;
  height: 32px;
  font: 300 24px/1 var(--font-body);
  cursor: pointer;
}
.x:focus-visible,
.sug:focus-visible,
.send:focus-visible,
input:focus-visible {
  outline: 1px solid var(--ed-ink);
  outline-offset: 2px;
}
.list {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.empty {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.hello {
  margin: 0;
  font: 400 14px/1.45 var(--font-body);
  color: rgba(2, 32, 22, 0.7);
}
.sugs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.sug {
  padding: 7px 12px 6px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 400 12px/1.2 var(--font-body);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
@media (hover: hover) and (pointer: fine) {
  .sug:hover {
    background: var(--ed-ink);
    color: var(--ed-bg);
  }
}
.msg {
  max-width: 85%;
  margin: 0;
  padding: 9px 12px;
  font: 400 14px/1.45 var(--font-body);
  white-space: pre-wrap;
  word-wrap: break-word;
}
.msg.user {
  align-self: flex-end;
  background: var(--ed-ink);
  color: var(--ed-bg);
}
.msg.assistant {
  align-self: flex-start;
  background: var(--ed-grey);
}
.typing {
  display: inline-flex;
  gap: 4px;
  padding: 13px 14px;
}
.typing i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.35;
  animation: blink 1s ease-in-out infinite;
}
.typing i:nth-child(2) {
  animation-delay: 0.15s;
}
.typing i:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes blink {
  50% {
    opacity: 0.9;
  }
}
.form {
  display: flex;
  border-top: 1px solid var(--ed-ink);
}
input {
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  font: 400 14px/1.2 var(--font-body);
  color: inherit;
}
.send {
  padding: 0 18px;
  border-left: 1px solid var(--ed-ink);
  font: 500 13px/1 var(--font-body);
  cursor: pointer;
}
.send:disabled {
  opacity: 0.4;
  cursor: default;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .panel,
  .panel.closing {
    animation: none;
  }
}
</style>

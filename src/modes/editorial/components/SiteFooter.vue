<script setup lang="ts">
/**
 * Footer: "Get in touch" heading, the email as a large link, contact pills,
 * and the bottom row (Credits / © year · name · place). Also a crane zone.
 */
import { onMounted, onUnmounted, ref, watch } from "vue";
import { person } from "../../../content/leo";
import { companionBus, ui } from "../lib/state";
import { EASE_REVEAL, gsap, reducedMotion } from "../lib/motion";
import { currentTrack as musicCredit, musicHost } from "../lib/audio";

const root = ref<HTMLElement | null>(null);
const creditsBtn = ref<HTMLButtonElement | null>(null);
const year = Math.max(2026, new Date().getFullYear());

let off: (() => void) | null = null;
let ctx: gsap.Context | null = null;

function openCredits() {
  ui.creditsOpen = true;
}
watch(
  () => ui.creditsOpen,
  (open, was) => {
    if (!open && was) creditsBtn.value?.focus();
  },
);

onMounted(() => {
  if (!root.value) return;
  off = companionBus.register(root.value);
  if (reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.from(".f-in", {
      yPercent: 110,
      duration: 1.1,
      ease: EASE_REVEAL,
      stagger: 0.06,
      scrollTrigger: { trigger: root.value, start: "top 80%", once: true },
    });
    gsap.from(".pill", {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.2,
      scrollTrigger: { trigger: root.value, start: "top 80%", once: true },
    });
  }, root.value);
});

onUnmounted(() => {
  off?.();
  ctx?.revert();
});
</script>

<template>
  <footer ref="root" class="footer" data-nav="dark">
    <div class="contact">
      <h2 class="heading f-mask"><span class="f-in">Get in touch</span></h2>
      <p class="f-mask email-wrap">
        <a class="email f-in" :href="`mailto:${person.email}`" data-sfx="thud">{{ person.email }}</a>
      </p>
      <ul class="pills" aria-label="Elsewhere">
        <li><a class="pill" :href="person.instagram" target="_blank" rel="noopener" data-sfx="pop" data-sfx-hover>Instagram ↗</a></li>
        <li><a class="pill" :href="person.github" target="_blank" rel="noopener" data-sfx="pop" data-sfx-hover>GitHub ↗</a></li>
        <li><a class="pill" :href="person.resume" download data-sfx="pop" data-sfx-hover>Resume ↓</a></li>
      </ul>
    </div>
    <div class="bottom">
      <button ref="creditsBtn" class="credits" type="button" aria-haspopup="dialog" @click="openCredits">Credits</button>
      <p class="meta">© {{ year }} {{ person.name }} · {{ person.location }}</p>
      <p class="music">
        Music: "<a :href="musicCredit.url" target="_blank" rel="noopener">{{ musicCredit.title }}</a>" by {{ musicCredit.artist }}
        ({{ musicHost }}), {{ musicCredit.license }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 10vw var(--pad-x) 72px 9.6vw;
  background: var(--ed-bg);
  color: var(--ed-ink);
  border-top: 1px solid #e4e4e4;
}
.contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
  padding-bottom: 8vw;
}
.f-mask {
  overflow: hidden;
  padding-bottom: 0.15em;
  margin: 0;
  line-height: 1.15;
}
.f-in {
  display: block;
}
.heading {
  font: 400 clamp(26px, 2.36vw, 68px) / 1.1 var(--font-body);
  letter-spacing: -0.01em;
}
.email {
  display: inline-block;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-size: clamp(30px, 5.6vw, 160px);
  line-height: 1;
  letter-spacing: -0.01em;
  text-decoration: underline;
  text-decoration-thickness: max(2px, 0.06em);
  text-underline-offset: 0.14em;
  transition: text-decoration-color 0.3s ease;
  word-break: break-all;
}
@media (hover: hover) and (pointer: fine) {
  .email:hover {
    text-decoration-color: rgba(2, 32, 22, 0.35);
  }
}
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0.6vw 0 0;
  padding: 0;
  list-style: none;
}
.pill {
  display: inline-block;
  padding: 10px 18px 9px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 500 14px/1 var(--font-body);
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.16s ease-out;
}
@media (hover: hover) and (pointer: fine) {
  .pill:hover {
    background: var(--ed-ink);
    color: var(--ed-bg);
  }
}
.pill:active {
  transform: scale(0.97);
}
.bottom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-left: calc(var(--pad-x) - 9.6vw);
  font: 400 clamp(14px, 1.11vw, 30px) / 1.2 var(--font-body);
}
.meta {
  margin: 0;
}
.music {
  justify-self: end;
  margin: 0;
  max-width: 30ch;
  text-align: right;
  font: 400 12px/1.4 var(--font-body);
  color: rgba(2, 32, 22, 0.5);
}
.music a {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.credits {
  position: relative;
  justify-self: start;
  cursor: pointer;
}
.credits::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform 0.5s cubic-bezier(0.6, 0, 0.25, 1);
}
@media (hover: hover) and (pointer: fine) {
  .credits:hover::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
}
a:focus-visible,
button:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 4px;
}
@media (max-width: 799px) {
  .footer {
    padding: 72px 20px 72px;
  }
  .contact {
    gap: 18px;
    padding-bottom: 56px;
  }
  .bottom {
    margin-left: 0;
    grid-template-columns: 1fr;
    gap: 12px;
    font-size: 14px;
  }
  .music {
    justify-self: start;
    text-align: left;
  }
}
</style>

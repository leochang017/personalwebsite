<script setup lang="ts">
/**
 * Home hero background: a full-bleed looping video (no text over it) with a
 * faint ink gradient along the bottom. Plays only while in view.
 */
import { onMounted, onUnmounted, ref, watch } from "vue";
import { reducedMotion } from "../lib/motion";
import { ui } from "../lib/state";

import { person } from "../../../content/leo";
const SRC = person.heroVideo;
const POSTER = person.heroPoster;

const video = ref<HTMLVideoElement | null>(null);
let io: IntersectionObserver | null = null;

/** safety net: restart if a browser stops at the end despite `loop` */
function onEnded() {
  const v = video.value;
  if (!v) return;
  v.currentTime = 0;
  v.play().catch(() => undefined);
}

/** The poster is the video's first frame; keep it there until the preloader has dissolved. */
let inView = false;
function maybePlay() {
  const v = video.value;
  if (!v || reducedMotion || !ui.introDone || !inView) return;
  if (v.paused) v.play().catch(() => undefined);
}

onMounted(() => {
  const v = video.value;
  if (!v) return;
  io = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) maybePlay();
    else if (!v.paused) v.pause();
  });
  io.observe(v);
});
watch(() => ui.introDone, maybePlay);

onUnmounted(() => io?.disconnect());
</script>

<template>
  <div class="hero-video">
    <video
      ref="video"
      class="vid"
      :src="SRC"
      :poster="POSTER"
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
      @ended="onEnded"
    />
    <div class="fade" aria-hidden="true" />
  </div>
</template>

<style scoped>
.hero-video {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--ed-ink);
}
.vid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(2, 32, 22, 0) 0%, rgba(2, 32, 22, 0.35) 100%);
  pointer-events: none;
}
</style>

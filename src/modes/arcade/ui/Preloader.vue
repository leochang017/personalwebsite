<script setup lang="ts">
defineProps<{ opening: boolean }>();
</script>

<template>
  <div class="preloader" :class="{ opening }" role="progressbar" aria-label="Loading arcade" aria-valuemin="0" aria-valuemax="100">
    <div class="face" aria-hidden="true">
      <div class="eyes">
        <span class="eye" />
        <span class="eye" />
      </div>
      <svg class="mouth" viewBox="0 0 40 16" width="30" height="12">
        <path d="M3 3 Q4 13 11 12 Q17 11 20 5 Q23 11 29 12 Q36 13 37 3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="bar"><span /></div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #000;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 34px;
  transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1);
}
.face {
  display: grid;
  justify-items: center;
  gap: 12px;
  transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
}
.eyes {
  display: flex;
  gap: 26px;
}
.eye {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px #ff0033, 0 0 18px 6px rgba(255, 0, 51, 0.85), 0 0 46px 12px rgba(255, 0, 51, 0.45);
  animation: blink 2.4s infinite;
}
.mouth {
  filter: drop-shadow(0 0 4px rgba(255, 0, 51, 0.9));
}
@keyframes blink {
  0%, 44%, 52%, 100% { transform: scaleY(1); }
  48% { transform: scaleY(0.1); }
}
.bar {
  width: 160px;
  height: 2px;
  background: rgba(255, 0, 51, 0.18);
  overflow: hidden;
}
.bar span {
  display: block;
  height: 100%;
  background: #ff0033;
  box-shadow: 0 0 8px #ff0033;
  transform-origin: left;
  transform: scaleX(0);
  animation: load 1.2s linear forwards;
}
@keyframes load {
  to { transform: scaleX(1); }
}
/* eyes open wide, then the whole veil fades to reveal the scene */
.opening .eye {
  animation: none;
  transform: scale(1.35);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
.opening .face {
  transform: scale(1.15);
}
.opening {
  opacity: 0;
  pointer-events: none;
  transition-delay: 0.3s;
}
@media (prefers-reduced-motion: reduce) {
  .eye {
    animation: none;
  }
  .opening .face,
  .opening .eye {
    transform: none;
  }
}
</style>

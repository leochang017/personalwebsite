<script setup lang="ts">
/** Five headline numbers in a 5-column grid, counting up into view. */
import { stats } from "../../../content/leo";
import CountUp from "./CountUp.vue";
</script>

<template>
  <section class="stats" data-nav="dark" aria-label="At a glance">
    <dl class="grid">
      <div v-for="s in stats" :key="s.label" class="cell">
        <dt class="label">{{ s.label }}</dt>
        <dd class="num"><CountUp :to="s.value" :suffix="s.suffix" /></dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.stats {
  padding: 0 var(--pad-x) 8vw 9.6vw;
  background: var(--ed-bg);
  color: var(--ed-ink);
}
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 0;
  border-top: 1px solid #e4e4e4;
}
.cell {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.6vw;
  padding-top: 2vw;
}
.num {
  margin: 0;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-size: clamp(44px, 6vw, 172px);
  line-height: 0.9;
  letter-spacing: -0.02em;
}
.label {
  font: 500 12px/1.2 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(2, 32, 22, 0.45);
}
@media (max-width: 799px) {
  .stats {
    padding: 0 20px 64px;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 28px;
  }
  .cell {
    padding-top: 18px;
  }
}
</style>

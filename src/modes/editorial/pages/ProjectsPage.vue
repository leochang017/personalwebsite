<script setup lang="ts">
/** Projects: short title block, then one full section per project. */
import { projects } from "../../../content/leo";
import TitleBlock from "../components/TitleBlock.vue";
import ProjectSection from "../components/ProjectSection.vue";
</script>

<template>
  <div class="projects-page">
    <TitleBlock short bg="/images/leo-fukui.jpg" :sets="[['Projects']]" subtitle="Research, a web app, and a playable game." />
    <section class="list" data-nav="dark" aria-label="All projects">
      <ProjectSection v-for="(p, i) in projects" :key="p.slug" :project="p" :index="i" />
    </section>
  </div>
</template>

<style scoped>
.projects-page,
.list {
  background: var(--ed-bg);
}
</style>

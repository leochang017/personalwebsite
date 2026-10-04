<script setup lang="ts">
/**
 * Home: video hero -> cycling statement -> facets -> stats ->
 * pathways into the rest of the site.
 */
import HeroVideo from "../components/HeroVideo.vue";
import TitleBlock from "../components/TitleBlock.vue";
import FacetsRow from "../components/FacetsRow.vue";
import StatsRow from "../components/StatsRow.vue";
import PathwaysList from "../components/PathwaysList.vue";

const statementSets = [
  ["Student", "Researcher", "& Builder"],
  ["Fencer", "Dancer", "Editor"],
  ["Class of", "2027", "Princeton"],
];

</script>

<template>
  <div class="home">
    <section class="hero" data-nav="light" aria-label="Leo Chang">
      <HeroVideo />
    </section>

    <TitleBlock :sets="statementSets" />

    <FacetsRow />
    <StatsRow />


    <PathwaysList />
  </div>
</template>

<style scoped>
.home {
  background: var(--ed-bg);
}
.hero {
  position: relative;
  height: 100vh;
  height: 100dvh;
  min-height: 520px;
  overflow: hidden;
}
.star {
  font-size: 1.6em;
  line-height: 1;
}
@media (max-width: 799px) {
}
</style>

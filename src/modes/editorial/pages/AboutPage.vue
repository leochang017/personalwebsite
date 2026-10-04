<script setup lang="ts">
/**
 * About: giant words -> one centred
 * flow: about + photos, skills, education (with languages).
 */
import { onMounted, onUnmounted, ref } from "vue";
import { aboutPhotos, education, languages, person, skills } from "../../../content/leo";
import RevealText from "../components/RevealText.vue";
import AboutWords from "../components/AboutWords.vue";
import CountUp from "../components/CountUp.vue";
import { EASE_REVEAL, gsap, ScrollTrigger, reducedMotion } from "../lib/motion";

const root = ref<HTMLElement | null>(null);

const languageLine = languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ");
const skillGroups = [
  { label: "Languages & frameworks", items: skills.languages },
  { label: "Infrastructure & tools", items: skills.infra },
  { label: "Focus areas", items: skills.focus },
];

let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!root.value || reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(".h-mask").forEach((h) => {
      gsap.from(h.querySelector(".h-in"), {
        yPercent: 110,
        duration: 1.1,
        ease: EASE_REVEAL,
        scrollTrigger: { trigger: h, start: "top 90%", once: true },
      });
    });
    gsap.set(".rise", { opacity: 0 });
    ScrollTrigger.batch(".rise", {
      start: "top 94%",
      once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.05, overwrite: true }),
    });
  }, root.value);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="root" class="about">

    <AboutWords />


    <section class="flow" data-nav="dark" aria-labelledby="about-h">
      <h2 id="about-h" class="flow-title h-mask"><span class="h-in">About</span></h2>

      <div class="block about-block">
        <RevealText class="bio" :text="person.bio" />
        <p class="chips rise">
          <span class="chip">{{ person.location }}</span>
          <span class="chip">Class of {{ person.classOf }}</span>
        </p>
        <ul class="strip" :class="{ single: aboutPhotos.length === 1 }" :style="{ gridTemplateColumns: `repeat(${aboutPhotos.length}, 1fr)` }">
          <li v-for="ph in aboutPhotos" :key="ph.src" class="shot rise">
            <img :src="ph.src" :alt="ph.alt" loading="lazy" decoding="async" />
          </li>
        </ul>
      </div>

      <div class="block">
        <h3 class="label rise">Skills</h3>
        <div class="groups">
          <div v-for="g in skillGroups" :key="g.label" class="group rise">
            <p class="mono">{{ g.label }}</p>
            <ul class="pills">
              <li v-for="item in g.items" :key="item" class="pill">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="block">
        <h3 class="label rise">Education</h3>
        <div class="edu rise">
          <dl class="edu-stats">
            <div class="es">
              <dt class="mono">School</dt>
              <dd class="es-val small">{{ education.school }}</dd>
            </div>
            <div class="es">
              <dt class="mono">Class of</dt>
              <dd class="es-val">{{ education.classOf }}</dd>
            </div>
            <div class="es">
              <dt class="mono">SAT</dt>
              <dd class="es-val"><CountUp :to="education.sat.total" /></dd>
              <dd class="es-sub">{{ education.sat.reading }} reading · {{ education.sat.math }} math</dd>
            </div>
            <div class="es">
              <dt class="mono">PSAT</dt>
              <dd class="es-val"><CountUp :to="education.psat" /></dd>
            </div>
          </dl>
          <div class="courses">
            <div>
              <p class="mono">Current coursework</p>
              <ul class="course-list">
                <li v-for="c in education.courseworkCurrent" :key="c">{{ c }}</li>
              </ul>
            </div>
            <div>
              <p class="mono">Completed coursework</p>
              <ul class="course-list">
                <li v-for="c in education.courseworkCompleted" :key="c">{{ c }}</li>
              </ul>
            </div>
            <div class="indep">
              <p class="mono">Independent study</p>
              <p class="indep-text">{{ education.independentStudy }}</p>
            </div>
          </div>
          <p class="langs"><span class="mono">Languages</span> {{ languageLine }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about {
  background: var(--ed-bg);
}


/* lower flow: one centred column, 96px rhythm, no hairlines */
.flow {
  max-width: 1120px;
  margin: 0 auto;
  padding: 120px 24px 120px;
}
.flow-title {
  margin: 0 0 48px;
  font: 400 clamp(26px, 2.36vw, 68px) / 1.1 var(--font-body);
  letter-spacing: -0.01em;
}
.h-mask {
  overflow: hidden;
  padding-bottom: 0.15em;
  line-height: 1.15;
}
.h-in {
  display: block;
}
.block + .block {
  margin-top: 96px;
}
.label {
  margin: 0 0 20px;
  font: 500 11px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(2, 32, 22, 0.6);
}
.mono {
  margin: 0;
  font: 500 11px/1.3 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(2, 32, 22, 0.55);
}
.bio {
  max-width: 64ch;
  margin: 0;
  font: 400 20px/1.5 var(--font-body);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 0;
}
.chip,
.pill {
  padding: 5px 12px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 400 13px/1.2 var(--font-body);
}
.strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
}
.strip.single .shot img {
  aspect-ratio: 16 / 9;
}
.shot img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
}
.groups {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}
.edu {
  border: 1px solid var(--ed-ink);
  padding: 36px 40px 32px;
}
.edu-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 0;
}
.es dd {
  margin: 0;
}
.es-val {
  margin-top: 10px !important;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-size: clamp(32px, 3vw, 64px);
  line-height: 0.95;
}
.es-val.small {
  font-size: clamp(20px, 1.7vw, 34px);
  line-height: 1.1;
}
.es-sub {
  margin-top: 8px !important;
  font: 400 13px/1.3 var(--font-body);
  color: rgba(2, 32, 22, 0.6);
}
.courses {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 40px;
  margin-top: 40px;
}
.course-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  font: 400 15px/1.4 var(--font-body);
}
.indep {
  grid-column: 1 / -1;
}
.indep-text {
  max-width: 80ch;
  margin: 10px 0 0;
  font: 400 14px/1.6 var(--font-body);
  color: rgba(2, 32, 22, 0.65);
}
.langs {
  margin: 28px 0 0;
  font: 400 15px/1.5 var(--font-body);
}
.langs .mono {
  margin-right: 10px;
}

@media (max-width: 799px) {
  .flow {
    padding: 72px 20px 88px;
  }
  .block + .block {
    margin-top: 64px;
  }
  .bio {
    font-size: 18px;
  }
  .edu {
    padding: 24px 20px;
  }
  .edu-stats,
  .courses {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}
</style>

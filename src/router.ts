import { createRouter, createWebHistory } from "vue-router";

/**
 * Routes are shared by both modes. Each mode's root component reads
 * `route.name` and renders its own page for it.
 *
 *   home          editorial: home            | arcade: spawn point
 *   projects      editorial: projects page   | arcade: the works wall
 *   experience    editorial: experience page | arcade: the ABOUT district
 *   achievements  editorial: achievements    | arcade: the AWARDS district
 *   about         editorial: about page      | arcade: the ABOUT district
 */
const Shell = () => import("./App.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Shell },
    { path: "/projects", name: "projects", component: Shell },
    { path: "/experience", name: "experience", component: Shell },
    { path: "/achievements", name: "achievements", component: Shell },
    { path: "/about", name: "about", component: Shell },
    // old editorial route names and the previous site's paths
    { path: "/work", redirect: "/projects" },
    { path: "/works", redirect: "/projects" },
    { path: "/playground", redirect: "/projects" },
    { path: "/projects/:slug", redirect: "/projects" },
    { path: "/experience/:slug", redirect: "/experience" },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

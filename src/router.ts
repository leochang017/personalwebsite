import { createRouter, createWebHistory } from "vue-router";
import { pageByName, SITE_URL } from "./content/seo";

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

/** Keep the document head in step with the route (the build prerenders the same values; see src/content/seo.ts). */
function setMeta(selector: string, attr: string, value: string, create: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

router.afterEach((to) => {
  const page = pageByName[String(to.name)];
  if (!page) return;
  document.title = page.title;
  setMeta('meta[name="description"]', "content", page.description, () => Object.assign(document.createElement("meta"), { name: "description" }));
  setMeta('link[rel="canonical"]', "href", SITE_URL + (page.path === "/" ? "/" : page.path), () => Object.assign(document.createElement("link"), { rel: "canonical" }));
  setMeta('meta[property="og:title"]', "content", page.title, () => { const m = document.createElement("meta"); m.setAttribute("property", "og:title"); return m; });
  setMeta('meta[property="og:description"]', "content", page.description, () => { const m = document.createElement("meta"); m.setAttribute("property", "og:description"); return m; });
});

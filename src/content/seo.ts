/**
 * Per-page search metadata and the static HTML that the build prerenders
 * into each route's index.html. Everything here is derived from leo.ts so
 * the crawlable copy can never drift from the page content.
 *
 * Used in two places:
 *   - src/router.ts (runtime): document.title / meta description / canonical
 *   - vite.config.ts (build): writes dist/<route>/index.html per page
 */
import { person, projects, experiences, leadership, achievements, awards, skills, education } from "./leo.ts";

export const SITE_URL = "https://leochang.net";

export type PageSeo = {
  /** route path, e.g. "/projects" */
  path: string;
  /** vue-router route name */
  name: string;
  title: string;
  description: string;
  /** static body HTML placed inside #app at build time; Vue replaces it on mount */
  html: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Trim to a search-snippet length at a word boundary. */
const snippet = (s: string, max = 158) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
};

const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const nav = (current: string) => {
  const links = [
    ["/", "Home"],
    ["/projects", "Projects"],
    ["/experience", "Experience"],
    ["/achievements", "Achievements"],
    ["/about", "About"],
  ] as const;
  return `<nav aria-label="Site"><ul>${links
    .map(([href, label]) => (href === current ? `<li>${label}</li>` : `<li><a href="${href}">${label}</a></li>`))
    .join("")}</ul></nav>`;
};

const shell = (current: string, inner: string) =>
  `<div class="prerender"><style>.prerender{max-width:46rem;margin:0 auto;padding:2rem 1rem;font:16px/1.5 system-ui,sans-serif;color:#111}.prerender nav ul{display:flex;gap:1rem;list-style:none;padding:0}.prerender a{color:inherit}</style><header><a href="/">${esc(person.name)}</a>${nav(current)}</header><main>${inner}</main></div>`;

const projectsHtml = projects
  .map(
    (p) =>
      `<article><h2>${esc(p.title)}</h2><p><em>${esc(p.role)} · ${esc(p.year)}</em></p><p>${esc(p.tagline)}</p><p>${esc(p.desc)}</p></article>`,
  )
  .join("");

const experienceHtml = [...experiences, ...leadership]
  .map((e) => `<article><h2>${esc(e.org)}</h2><p><em>${esc(e.role)} · ${esc(e.period)}</em></p><p>${esc(e.desc)}</p></article>`)
  .join("");

const achievementsHtml = achievements
  .map((a) => `<article><h2>${esc(a.title)}</h2><p>${esc(a.detail)} · ${esc(a.year)}</p></article>`)
  .join("");

export const pages: PageSeo[] = [
  {
    path: "/",
    name: "home",
    title: "Leo Chang · Student researcher and builder",
    description: snippet(
      `Personal site of ${person.name}, ${person.tagline.replace(/^Senior/, "senior")}, in ${person.location}. Machine learning and LLM-agent research, projects, internships and awards.`,
    ),
    html: shell(
      "/",
      `<h1>${esc(person.name)}</h1><p>${esc(person.tagline)}</p><p>${esc(person.intro)}</p>` +
        `<h2>Projects</h2>${list(projects.map((p) => `${p.title}: ${p.tagline}`))}` +
        `<h2>Experience</h2>${list(experiences.map((e) => `${e.role}, ${e.org} (${e.period})`))}` +
        `<h2>Achievements</h2>${list(awards.map((a) => `${a.title}, ${a.detail} (${a.year})`))}`,
    ),
  },
  {
    path: "/projects",
    name: "projects",
    title: "Projects · Leo Chang",
    description: snippet(`Projects by Leo Chang: ${projects.map((p) => p.title).join(", ")}. Machine learning research, LLM agents, a full-stack study app, and a playable game.`),
    html: shell("/projects", `<h1>Projects</h1>${projectsHtml}`),
  },
  {
    path: "/experience",
    name: "experience",
    title: "Experience · Leo Chang",
    description: snippet(`Research internships, work and leadership: ${experiences.map((e) => e.org).join(", ")}.`),
    html: shell("/experience", `<h1>Experience</h1>${experienceHtml}`),
  },
  {
    path: "/achievements",
    name: "achievements",
    title: "Achievements · Leo Chang",
    description: snippet(`Awards and honors: ${awards.map((a) => a.title).join(", ")}.`),
    html: shell("/achievements", `<h1>Achievements</h1>${achievementsHtml}`),
  },
  {
    path: "/about",
    name: "about",
    title: "About · Leo Chang",
    description: snippet(`About ${person.name}: ${person.bio}`),
    html: shell(
      "/about",
      `<h1>About</h1><p>${esc(person.bio)}</p>` +
        `<h2>Focus</h2>${list(skills.focus)}<h2>Languages and tools</h2>${list([...skills.languages, ...skills.infra])}` +
        `<h2>Education</h2><p>${esc(education.school)}, Class of ${education.classOf}</p>${list(education.courseworkCurrent)}`,
    ),
  },
];

export const pageByName = Object.fromEntries(pages.map((p) => [p.name, p])) as Record<string, PageSeo>;

/** JSON-LD for the homepage. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: SITE_URL,
  image: SITE_URL + person.photo,
  description: person.bio,
  sameAs: [person.github, person.instagram],
  affiliation: { "@type": "EducationalOrganization", name: person.school },
  address: { "@type": "PostalAddress", addressLocality: "Princeton", addressRegion: "NJ", addressCountry: "US" },
};

/** The <head> fragment for a page: title, description, canonical, Open Graph. */
export function headHtml(page: PageSeo): string {
  const url = SITE_URL + (page.path === "/" ? "/" : page.path);
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${page.path === "/" ? "profile" : "website"}" />`,
    `<meta property="og:site_name" content="${esc(person.name)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}${person.photo}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];
  if (page.path === "/") tags.push(`<script type="application/ld+json">${JSON.stringify(personJsonLd)}</script>`);
  return tags.join("\n    ");
}

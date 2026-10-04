import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pages, headHtml } from "./src/content/seo.ts";

/**
 * Serve api/chat.ts locally exactly as Vercel does in production, so the
 * chatbot works in `npm run dev` (needs CHAT_PROXY_SECRET in the shell env).
 */
function localApi(): Plugin {
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        try {
          const mod = (await server.ssrLoadModule("/api/chat.ts")) as { default: (q: unknown, s: unknown) => Promise<void> };
          await mod.default(req, res);
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

/**
 * Prerender: after the client build, write one index.html per route with that
 * page's title, description, canonical, Open Graph tags and a plain-HTML copy
 * of its content. Crawlers get real content on the first pass; the browser
 * loads the same bundle and Vue replaces the static copy on mount.
 */
function prerender(): Plugin {
  let outDir = "dist";
  return {
    name: "prerender-routes",
    apply: "build",
    configResolved(c) {
      outDir = c.build.outDir;
    },
    closeBundle() {
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const headRe = /<title>[\s\S]*?<\/title>\s*<meta name="description"[^>]*>/;
      if (!headRe.test(template) || !template.includes('<div id="app"></div>')) {
        throw new Error("prerender: dist/index.html does not match the expected template");
      }
      for (const page of pages) {
        const html = template
          .replace(headRe, headHtml(page))
          .replace('<div id="app"></div>', `<div id="app">${page.html}</div>`);
        const file = page.path === "/" ? join(outDir, "index.html") : join(outDir, page.path, "index.html");
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
      }
      console.log(`prerendered ${pages.length} routes`);
    },
  };
}

export default defineConfig({
  plugins: [vue(), localApi(), prerender()],
  server: { port: 5180, host: true },
  build: { target: "es2022", chunkSizeWarningLimit: 2000 },
});

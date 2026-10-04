import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";

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

export default defineConfig({
  plugins: [vue(), localApi()],
  server: { port: 5180, host: true },
  build: { target: "es2022", chunkSizeWarningLimit: 2000 },
});

import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    sites(),
    cloudflare({
      viteEnvironment: { name: "server" },
      config: {
        main: "./worker/index.ts",
        compatibility_date: "2026-07-29",
        assets: {
          binding: "ASSETS",
          not_found_handling: "single-page-application",
        },
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
  },
});

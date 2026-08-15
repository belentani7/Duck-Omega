import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  outDir: "./dist/public",
  output: "static",
  build: { format: "directory", assets: "_astro" },
  vite: { plugins: [tailwindcss()] },
});

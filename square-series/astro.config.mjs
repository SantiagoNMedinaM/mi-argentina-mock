import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://TU_USUARIO.github.io",
  base: "/mi-argentina-mock/",
  output: "static",
});

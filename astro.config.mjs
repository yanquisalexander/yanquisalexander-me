import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.yanquisalexander.me",
  integrations: [tailwind(), sitemap(), auth()],
  output: "server",
  adapter: vercel()
});
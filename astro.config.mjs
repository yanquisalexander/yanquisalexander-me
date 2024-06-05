import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://www.yanquisalexander.me",
  integrations: [tailwind(), sitemap(), auth(), db(), react()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});
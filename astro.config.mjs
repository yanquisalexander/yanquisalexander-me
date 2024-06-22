import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import deno from "@astrojs/deno";
import db from "@astrojs/db";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.yanquisalexander.me",
  integrations: [tailwind(), sitemap(), auth(), db(), react(), mdx()],
  output: "server",
  //adapter: deno()
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  markdown: {
    shikiConfig: {
      theme: 'synthwave-84',
      wrap: true,
      transformers: [
        {
          pre(node) {
            this.addClassToHast(node, "px-4 py-4 rounded-lg");
          }
        }
      ]
    }
  }
});
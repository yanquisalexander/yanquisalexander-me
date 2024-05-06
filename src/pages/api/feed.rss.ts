import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from '@astrojs/rss';


export const GET: APIRoute = async ({ url }) => {
    const blogEntries = await getCollection("blog");
    const posts = blogEntries.map((entry) => {
        return {
            title: entry.data.title,
            description: `${entry.body.slice(0, 100)}...`,
            link: `https://yanquisalexander.me/blog/${entry.slug}`,
            pubDate: entry.data.pubDate,
            content: entry.body,
        }
    });

    return rss({
        title: "Blog | Alexander Barrios",
        description: "My personal blog",
        site: "https://yanquisalexander.me",
        items: posts,
    })

}
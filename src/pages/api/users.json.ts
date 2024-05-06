import type { APIRoute } from "astro";
import { Users, db } from "astro:db";

export const GET : APIRoute = async ({ url }) => {
    const users = await db.select().from(Users);

    return new Response(JSON.stringify(users), {
        headers: {
            "content-type": "application/json",
        },
    });
}
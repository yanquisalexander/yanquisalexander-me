import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        // @ts-ignore
        session: ({ session, token }) => ({
            ...session,
            user: {
                id: token.sub,
                name: token.name,
                email: token.email,
                image: token.picture,
            },
        })
    },
});
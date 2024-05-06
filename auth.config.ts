import GitHub from "@auth/core/providers/github";
import { Users, db } from "astro:db";
import { defineConfig } from "auth-astro";

export default defineConfig({

    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;

                try {
                    await db
                        .insert(Users)
                        .values({
                            id: token.sub,
                            username: user.name,
                            avatar: user.image,
                        })
                        .onConflictDoUpdate({
                            target: Users.id,
                            set: {
                                username: user.name,
                                avatar: user.image,
                            },
                        })
                } catch (error) {
                    console.error(error);
                }
            }
            return token;
        },
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
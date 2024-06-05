import type { APIRoute } from "astro";
import { GuestBook, Users, db, eq } from "astro:db";
import { getSession } from "auth-astro/server";

export const GET: APIRoute = async ({ url }) => {
    const comments = await db.select().from(GuestBook).innerJoin(Users, eq(GuestBook.userId, Users.id));

    return new Response(JSON.stringify({
        comments: comments.map(({ GuestBook, Users }) => ({
            id: GuestBook.id,
            message: GuestBook.message,
            calification: GuestBook.calification,
            createdAt: GuestBook.createdAt,
            updatedAt: GuestBook.updatedAt,
            user: {
                id: Users.id,
                username: Users.username,
                avatar: Users.avatar,
            }
        }
        ))
    }), {
        headers: {
            "content-type": "application/json",
        },
    });
}

export const POST: APIRoute = async ({ request }) => {

    const session = await getSession(request)

    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                "content-type": "application/json",
            },
        });
    }

    try {
        const { message, calification } = await request.json();

        if (!message) {
            return new Response(JSON.stringify({ error: "Message is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            });
        }

        if (calification < 1 || calification > 5) {
            return new Response(JSON.stringify({ error: "Calification must be between 1 and 5" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            });
        }

        try {
            await db.insert(GuestBook).values({
                userId: session.user.id,
                message,
                calification,
            }).onConflictDoUpdate({
                target: [GuestBook.userId],
                set: {
                    message,
                    calification: calification ?? null,
                    updatedAt: new Date(),
                }
            });

            return new Response(JSON.stringify({ message: "Message registered successfully" }), {
                status: 201,
                headers: {
                    "content-type": "application/json",
                },
            });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ error: "Error registering your message on the guest book" }), {
                status: 500,
                headers: {
                    "content-type": "application/json",
                },
            });
        }

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "There was an error processing your request" }), {
            status: 400,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}

export const DELETE: APIRoute = async ({ request }) => {
    const session = await getSession(request)

    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                "content-type": "application/json",
            },
        });
    }

    try {
        // Self delete, we need to find the comment by the user id

        const comment = await db.select().from(GuestBook).where(eq(GuestBook.userId, session.user.id))

        if (!comment) {
            return new Response(JSON.stringify({ error: "Comment not found" }), {
                status: 404,
                headers: {
                    "content-type": "application/json",
                },
            });
        }

        try {
            await db.delete(GuestBook).where(eq(GuestBook.userId, session.user.id));
            return new Response(JSON.stringify({ message: "Comment deleted successfully" }), {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            });

        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ error: "Error deleting your comment" }), {
                status: 500,
                headers: {
                    "content-type": "application/json",
                },
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "There was an error processing your request" }), {
            status: 400,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}




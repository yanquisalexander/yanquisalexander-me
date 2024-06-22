import { CLIENT_ID } from "@/lib/Twitch";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, request }) => {
    const BASE_URL = new URL(request.url).origin

    const SCOPES = [
        'channel:read:subscriptions',
        'user:read:email',
        'bits:read',
        'channel:read:redemptions',
        'chat:read',
        'user:read:follows',
        'channel:read:hype_train',
    ]

    if (import.meta.env['TWITCH_TOKEN']) {
        return new Response('Twitch token already set', { status: 400 })
    }

    return redirect(`https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${BASE_URL}/twitch/token&response_type=token&scope=${SCOPES.join(' ')}`, 302)
}
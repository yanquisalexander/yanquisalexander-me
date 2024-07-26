import { SLABS_API_TOKEN } from "@/lib/Twitch";
import type { SLabsWidgetConfig as StreamlabsWidgetConfig } from "@/types/streamlabs";
import type { APIRoute } from "astro";

const jsonResponse = ({ data, status = 200 } : { data: Record<string, any>, status?: number }) => {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
        status,
    });
}

export const GET: APIRoute = async ({ redirect, request }) => {
    if(!SLABS_API_TOKEN) {
        return jsonResponse({ data: { error: 'No StreamLabs API token found' }, status: 400 });
    }

    const alertBoxConfig = await fetch(`https://streamlabs.com/api/v5/widget/config?token=${SLABS_API_TOKEN}`)
        .then(res => res.json()) as StreamlabsWidgetConfig

        const eventsPanelConfig = await fetch(`https://streamlabs.com/api/v5/widget/config?token=${SLABS_API_TOKEN}&widget=events_panel`)
        .then(res => res.json())

    const { eventsPanelMuted: muted } = alertBoxConfig;
    const { settings: { pause_queue: pausedQueue } } = eventsPanelConfig;

    return jsonResponse({ 
        data: { 
            muted,
            pausedQueue
         },
     });
}
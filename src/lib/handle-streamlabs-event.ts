import type { getStreamLabsConfig } from "./Streamlabs";

// handleStreamLabsEvent.ts
interface EventMessage {
    name?: string;
    from?: string;
    amount?: number;
    message?: string;
    streak_months?: number;
    months?: number;
    sub_type?: string;
    raiders?: number;
    viewers?: number;
    user_message?: string;
}

const SUPPORTED_EVENTS = ["follow", "bits", "skipAlert", "reload.instant", "donation", "subscription", "raid", "host", 'pauseQueue', 'unpauseQueue', 'custom'] as const;


interface StreamLabsEvent {
    type: typeof SUPPORTED_EVENTS[number];
    message: EventMessage[];
}


// getStreamLabsConfig returns a promise, but we can't use async/await in the function signature

export function handleStreamLabsEvent({ event, addAlert, skipAlert, config, processAlertQueue }: { event: StreamLabsEvent, addAlert: Function, skipAlert: Function, config: Awaited<ReturnType<typeof getStreamLabsConfig>>, processAlertQueue: Function }) {
    console.log("Event received", event);

    if (!SUPPORTED_EVENTS.includes(event.type)) {
        console.warn(`[StreamLabs] Event type ${event.type} not supported`);
        return;
    }

    const { type, message } = event;
    const msg = message[0] ?? {};
    const username = msg.name ?? msg.from ?? "Anónimo";

    switch (type) {
        case "follow":
            addAlert("follow", { username });
            break;
        case "bits":
            addAlert("cheer", {
                username,
                bits: msg.amount,
                message: msg.message,
            });
            break;
        case "skipAlert":
            skipAlert();
            break;
        case "reload.instant":
            location.reload();
            break;
        case "donation":
            addAlert("donation", {
                username: msg.from,
                amount: Number(msg.amount).toFixed(2),
                message: msg.message,
            });
            break;
        case "subscription":
            const months = msg.streak_months ?? msg.months ?? 1;
            const subMessage = (msg.message && msg.message.length > 0) ? msg.message : "¡Gracias por seguir apoyando el canal! 💜";

            if (months > 1 || msg.sub_type === "resub") {
                addAlert("resub", { username, months, message: subMessage });
            } else {
                addAlert("sub", { username });
            }
            break;
        case "raid":
        case "host":
            addAlert(type, { username, raiders: msg.raiders ?? msg.viewers ?? 0 });
        case "pauseQueue":
            config.pausedQueue = true;
            break;
        case "unpauseQueue":
            config.pausedQueue = false;
            processAlertQueue();
            break;
        case "custom":
            // message = *Alexitoo_UY* canjeó *Mensaje*

            // Extract the username from message

            addAlert("speakCommand", {
                username: msg.message?.split("*")[1],
                message: msg.user_message
            });
            break
        default:
            console.warn(`[StreamLabs] Event type ${type} not handled`);
    }
}

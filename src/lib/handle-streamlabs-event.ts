// handleStreamLabsEvent.ts
interface EventMessage {
    name?: string;
    from?: string;
    amount?: number;
    message?: string;
    streak_months?: number;
    months?: number;
    sub_type?: string;
}

interface StreamLabsEvent {
    type: string;
    message: EventMessage[];
}

const SUPPORTED_EVENTS = ["follow", "bits", "skipAlert", "reload.instant", "donation", "subscription"];

export function handleStreamLabsEvent({ event, addAlert, skipAlert }: { event: StreamLabsEvent, addAlert: Function, skipAlert: Function }) {
    console.log("Event received", event);

    if (!SUPPORTED_EVENTS.includes(event.type)) {
        console.warn(`[StreamLabs] Event type ${event.type} not supported`);
        return;
    }

    const { type, message } = event;
    const msg = message[0];
    const username = msg.name ?? msg.from;

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
        default:
            console.warn(`[StreamLabs] Event type ${type} not handled`);
    }
}

export function handleStreamLabsEvent({ event, addAlert, skipAlert } : { event: any, addAlert: Function, skipAlert: Function }) {
    console.log("Event received", event);
    switch (event.type) {
        case "follow":
            addAlert("follow", { username: event.message[0].name });
            break;
        case "bits":
            addAlert("cheer", {
                username: event.message[0].name ?? event.message[0].from,
                bits: event.message[0].amount,
                message: event.message[0].message,
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
                username: event.message[0].from,
                amount: Number(event.message[0].amount).toFixed(2),
                message: event.message[0].message,
            });
            break;
        case "subscription":
            if (
                event.message[0].streak_months > 1 ||
                event.message[0].months > 1 ||
                event.message[0].sub_type === "resub"
            ) {
                addAlert("resub", {
                    username:
                        event.message[0].name ?? event.message[0].from,
                    months:
                        event.message[0].streak_months ??
                        event.message[0].months ??
                        1,
                    message: (() => {
                        const message = event.message[0].message;
                        if (message && message.length > 0) {
                            return message as string;
                        }
                        return "¡Gracias por seguir apoyando el canal! 💜";
                    })(),
                });
                return;
            } else {
                addAlert("sub", {
                    username:
                        event.message[0].name ?? event.message[0].from,
                });
            }
            break;
        default:
            console.warn(
                `[StreamLabs] Event type ${event.type} not handled`,
            );
    }
}
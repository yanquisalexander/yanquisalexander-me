import { StaticAuthProvider } from '@twurple/auth';
import { PubSubClient } from '@twurple/pubsub';
import { ApiClient } from '@twurple/api';

export const CLIENT_ID = 'kjw6mxxa22q1wppo5qglufq2yidhcn'
export const BROADCASTER_ID = '589751969'
export const TWITCH_TOKEN = import.meta.env['TWITCH_TOKEN']

export interface Command {
    command: string,
    response?: string,
    execute?: (message: string, user: string) => void,
    cooldown?: number,
    enabled?: boolean
}

export const createAuthProvider = ({ token }: { token: string }) => {
    return new StaticAuthProvider(CLIENT_ID, token);
}

export const createPubSubClient = ({ authProvider }: { authProvider: StaticAuthProvider }) => {
    return new PubSubClient({ authProvider });
}

export const createApiClient = ({ authProvider }: { authProvider: StaticAuthProvider }) => {
    return new ApiClient({ authProvider });
}

export const loadBadges = async ({ apiClient, broadcasterId }: { apiClient: ApiClient, broadcasterId: string }) => {
    const globalBadges = await apiClient.chat.getGlobalBadges();
    const channelBadges =
        await apiClient.chat.getChannelBadges(broadcasterId);

    console.log(`Loaded ${globalBadges.length} global badges`);
    console.log(`Loaded ${channelBadges.length} channel badges`);

    return { globalBadges, channelBadges };
};

/* 
    createCommand returns an object with the following properties:
    - command: string
    - response?: string
    - execute?: (message: string) => void
    - cooldown?: number
    - enabled?: boolean
    
*/

export const createCommand = ({ command, response, execute, cooldown, enabled }: { command: string, response?: string, execute?: (message: string) => void, cooldown?: number, enabled?: boolean }) => {
    return { command, response, execute, cooldown, enabled };
}

export const parseEmotes = (
    message: string,
    emotes: Map<string, string[]>,
) => {
    const emoteSet = Object.fromEntries(emotes);
    const parts = [];
    let lastIndex = 0;

    for (const [key, value] of Object.entries(emoteSet)) {
        const [start, end] = value[0].split("-").map(Number);
        const emoteText = message.slice(start, end + 1);

        const $emote = document.createElement("img");
        $emote.classList.add("message-emote");
        $emote.src = `https://static-cdn.jtvnw.net/emoticons/v2/${key}/default/dark/1.0`;

        // Replace emote text with image HTML (All occurrences)
        message = message.replaceAll(emoteText, $emote.outerHTML);
    }

    return message;
};

export const extractTokenFromHead = () => {
    const token = document
        .querySelector("[data-token]")
        ?.getAttribute("data-token");

    if (!token) {
        throw new Error("Twitch token not found");
    }

    return token;
}

import { StaticAuthProvider } from '@twurple/auth';
import { PubSubClient } from '@twurple/pubsub';
import { ApiClient } from '@twurple/api';

export const CLIENT_ID = 'kjw6mxxa22q1wppo5qglufq2yidhcn'
export const BROADCASTER_ID = '589751969'
export const TWITCH_TOKEN = import.meta.env['TWITCH_TOKEN']

export const createAuthProvider = ({ token }: { token: string }) => {
    return new StaticAuthProvider(CLIENT_ID, token);
}

export const createPubSubClient = ({ authProvider }: { authProvider: StaticAuthProvider }) => {
    return new PubSubClient({ authProvider });
}

export const createApiClient = ({ authProvider }: { authProvider: StaticAuthProvider }) => {
    return new ApiClient({ authProvider });
}
import { AppTokenAuthProvider } from '@twurple/auth'
import { ApiClient } from '@twurple/api'

const clientId = String(Bun.env.TWITCH_CLIENT_ID);
const clientSecret = String(Bun.env.TWITCH_SECRET_KEY);

const authProvider = new AppTokenAuthProvider(clientId, clientSecret);

const apiClient = new ApiClient({ authProvider });

export { apiClient };

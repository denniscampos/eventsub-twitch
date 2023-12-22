import express from 'express';
import { EventSubMiddleware, EventSubMiddlewareConfig } from '@twurple/eventsub';
import { apiClient } from './twurpleClient';

const app = express();

const PORT = Bun.env.PORT || 5000;
const secret = String(Bun.env.TWITCH_SECRET_KEY);
const userId = 'TheCoppinger';
const hostName = 'myhostname';

const config: EventSubMiddlewareConfig = {
    apiClient,
    hostName,
    pathPrefix: '/twitch',
    secret
}

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

const middleware = new EventSubMiddleware(config)

async function run() {
    await middleware.apply(app);

    app.listen(PORT, async () => {
        console.log(`Twitch eventsub listener listening on ${PORT}`);
        await middleware.markAsReady();
        await middleware.subscribeToChannelFollowEvents(userId, (e) => {
            console.log(`${e.broadcasterDisplayName} just went live!`);

        })
    })
}

run();
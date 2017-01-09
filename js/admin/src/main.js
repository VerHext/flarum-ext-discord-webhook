import app from 'flarum/app';

import DiscordWebhookSettingsModal from 'cl1608ho/DiscordWebhook/components/DiscordWebhookSettingsModal';

app.initializers.add('cl1608ho-discord-webhook', () => {
    app.extensionSettings['cl1608ho-discord-webhook'] = () => app.modal.show(new DiscordWebhookSettingsModal());
});

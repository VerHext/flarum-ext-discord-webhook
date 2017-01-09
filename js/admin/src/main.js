import app from 'flarum/app';

import DiscordWebhookSettingsModal from 'Cl1608Ho/DiscordWebhook/components/DiscordWebhookSettingsModal';

app.initializers.add('Cl1608Ho-discord-webhook', () => {
    app.extensionSettings['Cl1608Ho-discord-webhook'] = () => app.modal.show(new DiscordWebhookSettingsModal());
});

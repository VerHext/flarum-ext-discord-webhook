import SettingsModal from 'flarum/components/SettingsModal';

export default class DiscordWebhookSettingsModal extends SettingsModal {
  className() {
    return 'DiscordWebhookSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('Cl1608Ho-discord-webhook.admin.title');
  }

  form() {
    return [
      <div className="Form-group">
        <label>{app.translator.trans('Cl1608Ho-discord-webhook.admin.webhook_url_label')}</label>
        <input className="FormControl" bidi={this.setting('Cl1608Ho-discord-webhook.webhook_url')}/>
      </div>,
    ];
  }
}

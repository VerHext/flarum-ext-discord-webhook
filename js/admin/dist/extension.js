'use strict';

System.register('Cl1608Ho/discord/webhook/components/GithubSettingsModal', ['flarum/components/SettingsModal'], function (_export, _context) {
  "use strict";

  var SettingsModal, DiscordWebhookSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal.default;
    }],
    execute: function () {
      DiscordWebhookSettingsModal = function (_SettingsModal) {
        babelHelpers.inherits(DiscordWebhookSettingsModal, _SettingsModal);

        function DiscordWebhookSettingsModal() {
          babelHelpers.classCallCheck(this, DiscordWebhookSettingsModal);
          return babelHelpers.possibleConstructorReturn(this, (DiscordWebhookSettingsModal.__proto__ || Object.getPrototypeOf(DiscordWebhookSettingsModal)).apply(this, arguments));
        }

        babelHelpers.createClass(DiscordWebhookSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'DiscordWebhookSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('Cl1608Ho-discord-webhook.admin.title');
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('Cl1608Ho-discord-webhook.admin.webhook_url_label')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('Cl1608Ho-discord-webhook.webhook_url') })
            )];
          }
        }]);
        return DiscordWebhookSettingsModal;
      }(SettingsModal);

      _export('default', DiscordWebhookSettingsModal);
    }
  };
});;
'use strict';

System.register('Cl1608Ho/discord/webhook/main', ['flarum/app', 'Cl1680Ho/discord/webhook/components/DiscordWebhookSettingsModal'], function (_export, _context) {
  "use strict";

  var app, DiscordWebhookSettingsModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_Cl1680HoDiscordWebhookComponentsDiscordWebhookSettingsModal) {
      DiscordWebhookSettingsModal = _Cl1680HoDiscordWebhookComponentsDiscordWebhookSettingsModal.default;
    }],
    execute: function () {

      app.initializers.add('Cl1608Ho-discord-webhook', function () {
        app.extensionSettings['Cl1608Ho-discord-webhook'] = function () {
          return app.modal.show(new DiscordSettingsModal());
        };
      });
    }
  };
});
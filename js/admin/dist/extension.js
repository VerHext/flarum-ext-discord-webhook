'use strict';

System.register('cl1608ho/DiscordWebhook/components/DiscordWebhookSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Button', 'flarum/components/Alert', 'flarum/tags/helpers/tagIcon', 'flarum/tags/utils/sortTags'], function (_export, _context) {
  "use strict";

  var SettingsModal, Button, Alert, tagIcon, sortTags, DiscordWebhookSettingsModal;


  function tagItem(tag) {
    return m(
      'li',
      { 'data-id': tag.id(), style: { color: tag.color() } },
      m(
        'div',
        { className: 'TagListItem-info' },
        tagIcon(tag),
        m(
          'span',
          { className: 'TagListItem-name' },
          tag.name()
        )
      ),
      !tag.isChild() && tag.position() !== null ? m(
        'ol',
        { className: 'TagListItem-children' },
        sortTags(app.store.all('tags')).filter(function (child) {
          return child.parent() === tag;
        }).map(tagItem)
      ) : ''
    );
  }

  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumTagsHelpersTagIcon) {
      tagIcon = _flarumTagsHelpersTagIcon.default;
    }, function (_flarumTagsUtilsSortTags) {
      sortTags = _flarumTagsUtilsSortTags.default;
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
            return 'DiscordWebhookSettingsModal Modal--large';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('cl1608ho-discord-webhook.admin.settings.title');
          }
        }, {
          key: 'content',
          value: function content() {
            var tags = app.store.all('tags');
            if (tags.length == 0) {
              // Tags disabled or no Tags set up
              return m(
                'div',
                { className: 'Modal-body' },
                m(
                  Alert,
                  { type: 'error', dismissible: false },
                  app.translator.trans('cl1608ho-discord-webhook.admin.settings.error_tags_disabled_or_no_tags')
                )
              );
            } else {
              return m(
                'div',
                { className: 'Modal-body' },
                m(
                  'div',
                  { className: 'Form' },
                  this.form(tags),
                  m(
                    'div',
                    { className: 'Form-group' },
                    this.submitButton()
                  )
                )
              );
            }
          }
        }, {
          key: 'form',
          value: function form(tags) {
            var that = this;
            var forms = [];
            tags.forEach(function (tag) {
              forms.push(m(
                'div',
                { className: 'Form-group' },
                m(
                  'label',
                  null,
                  tag.data.attributes.name
                ),
                m('input', { className: 'FormControl', placeholder: app.translator.trans('cl1608ho-discord-webhook.admin.settings.webhook_url_placeholder'), bidi: that.setting('cl1608ho-discord-webhook.webhook_urls.' + tag.data.id) })
              ));
            });
            return m(
              'div',
              { className: 'Form-group' },
              m(
                'legend',
                null,
                app.translator.trans('cl1608ho-discord-webhook.admin.settings.webhook_url_legend')
              ),
              m(
                'div',
                { className: 'helpText' },
                app.translator.trans('cl1608ho-discord-webhook.admin.settings.webhook_url_helptext', { a: m('a', { href: 'https://support.discordapp.com/hc/articles/228383668', target: '_blank' }) })
              ),
              forms
            );
          }
        }]);
        return DiscordWebhookSettingsModal;
      }(SettingsModal);

      _export('default', DiscordWebhookSettingsModal);
    }
  };
});;
'use strict';

System.register('cl1608ho/DiscordWebhook/main', ['flarum/app', 'cl1608ho/DiscordWebhook/components/DiscordWebhookSettingsModal'], function (_export, _context) {
    "use strict";

    var app, DiscordWebhookSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_cl1608hoDiscordWebhookComponentsDiscordWebhookSettingsModal) {
            DiscordWebhookSettingsModal = _cl1608hoDiscordWebhookComponentsDiscordWebhookSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('cl1608ho-discord-webhook', function () {
                app.extensionSettings['cl1608ho-discord-webhook'] = function () {
                    return app.modal.show(new DiscordWebhookSettingsModal());
                };
            });
        }
    };
});
import SettingsModal from 'flarum/components/SettingsModal';
import Button from 'flarum/components/Button';
import Alert from 'flarum/components/Alert';
import tagIcon from 'flarum/tags/helpers/tagIcon';
import sortTags from 'flarum/tags/utils/sortTags';

function tagItem(tag) {
  return (
    <li data-id={tag.id()} style={{color: tag.color()}}>
      <div className="TagListItem-info">
        {tagIcon(tag)}
        <span className="TagListItem-name">{tag.name()}</span>
      </div>
      {!tag.isChild() && tag.position() !== null ? (
        <ol className="TagListItem-children">
          {sortTags(app.store.all('tags'))
            .filter(child => child.parent() === tag)
            .map(tagItem)}
        </ol>
      ) : ''}
    </li>
  );
}

export default class DiscordWebhookSettingsModal extends SettingsModal {
  className() {
    return 'DiscordWebhookSettingsModal Modal--large';
  }

  title() {
    return app.translator.trans('cl1608ho-discord-webhook.admin.settings.title');
  }

  content() {
    const tags = app.store.all('tags');
    if(tags.length == 0) { // Tags disabled or no Tags set up
      return (<div className="Modal-body">
	<Alert type="error" dismissible={false}>{app.translator.trans('cl1608ho-discord-webhook.admin.settings.error_tags_disabled_or_no_tags')}</Alert>
      </div>);
    } else {
      return (
        <div className="Modal-body">
	  <div className="Form">
            {this.form(tags)}

            <div className="Form-group">
              {this.submitButton()}
            </div>
          </div>
        </div>
      );
    }
  }

  form(tags) {
    const that = this;
    var forms = [];
    tags.forEach(function(tag) {
      forms.push(<div className="Form-group">
        <label>{tag.data.attributes.name}</label>
        <input className="FormControl" placeholder={app.translator.trans('cl1608ho-discord-webhook.admin.settings.webhook_url_placeholder')} bidi={that.setting('cl1608ho-discord-webhook.webhook_urls.' + tag.data.id)}/>
      </div>)
    });
    return <div className="Form-group">
	<legend>{app.translator.trans('cl1608ho-discord-webhook.admin.settings.webhook_url_legend')}</legend>
	<div className="helpText">{app.translator.trans('cl1608ho-discord-webhook.admin.settings.webhook_url_helptext', {a: <a href="https://support.discordapp.com/hc/articles/228383668" target="_blank" />})}</div>
	{forms}
    </div>;
  }
}

<?php

namespace Cl1608Ho\DiscordWebhook;

use Flarum\Event\PostWasPosted;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;

class Controller {

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings) {
	$this->settings = $settings;
    }

    public function subscribe(Dispatcher $events) {
	events->listen(PostWasPosted::class, [$this, 'onPostWasPosted']);
    }

    public function onPostWasPosted(PostWasPosted $event) {
	$webhook_url = $this->settings->get('Cl1608Ho-discord-webhook.webhook_url');

	// Let's just assume we got that url :)

	$postData = array(
	    'embeds' => array(
		array(
		    'title' => $event->post->discussion->title,
		    'type' => 'rich',
		    'description' => $event->post->content,
		    'url' => app('flarum.config')['url'] . "/d/" . $event->post->discussion_id,
		    'timestamp' => $event->post->time->timestamp,
		    'color' => '#ABC123',
		    'author' => array(
			'name' => $event->user->username,
			'url' => app('flarum.config')['url'] . "/u/" . $event->user->id,
			'icon_url' => $event->user->avatar_url
		    )
		)
	    )
	);

	$context = stream_context_create(array(
	    'http' => array(
		'method' => 'POST',
		'header' => "Content-Type: application/json\r\n",
		'content' => json_encode($postData)
	    )
	));

	$response = file_get_contents($webhook_url, FALSE, $context);

	// For now we ignore the response as it will not have any visible effect on the forums. Maybe send a notification to the admin that it didn't work, but for now nothing.
    }

}

<?php

namespace cl1608ho\DiscordWebhook;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Event\DiscussionWasStarted;

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
	$events->listen(DiscussionWasStarted::class, [$this, 'onDiscussionWasStarted']);
    }

    public function onDiscussionWasStarted(DiscussionWasStarted $event) {
	$tags = $event->discussion->getAttribute("tags");

	foreach($tags as $tag) {
	    $webhook_url = "https://requestb.in/1amtk0a1";
	    if($webhook_url != "") {
		$postData = array(
		    'embeds' => array(
		 	array(
			    'title' => $event->discussion->title,
			    'type' => 'rich',
			    'description' => $event->discussion->startPost->content,
			    'url' => app('flarum.config')['url'] . "/d/" . $event->discussion->id,
			    'timestamp' => date('o-m-d\TH:i:s\Z', $event->discussion->start_time->timestamp),
			    'author' => array(
				'name' => $event->discussion->startUser->username,
				'url' => app('flarum.config')['url'] . "/u/" . $event->discussion->startUser->id,
				'icon_url' => $event->discussion->startUser->avatar_url
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

		$response = file_get_contents($webhook_url, false, $context);

		// For now we ignore the response as it will not have any visible effect on the forums. Maybe send a notification to the admin that it didn't work, but for now nothing.
	    }
	}
    }
}

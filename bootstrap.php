<?php

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(cl1608ho\DiscordWebhook\Controller::class);
    $events->subscribe(cl1608ho\DiscordWebhook\Listener\AddClientAssets::class);
};

<?php

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Cl1608Ho\DiscordWebhook\Controller::class);
    $events->subscribe(Cl1608Ho\DiscordWebhook\Listener\AddClientAssets::class);
};

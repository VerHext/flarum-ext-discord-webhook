<?php

use Cl1608Ho\DiscordWebhook;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(DiscordWebhook\Controller::class);
    $events->subscribe(DiscordWebhook\Listener\AddClentAssets::class);
};

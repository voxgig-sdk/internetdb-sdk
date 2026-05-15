<?php
declare(strict_types=1);

// Internetdb SDK utility: feature_add

class InternetdbFeatureAdd
{
    public static function call(InternetdbContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

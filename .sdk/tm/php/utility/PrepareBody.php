<?php
declare(strict_types=1);

// Internetdb SDK utility: prepare_body

class InternetdbPrepareBody
{
    public static function call(InternetdbContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

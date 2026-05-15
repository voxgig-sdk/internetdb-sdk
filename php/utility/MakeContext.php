<?php
declare(strict_types=1);

// Internetdb SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class InternetdbMakeContext
{
    public static function call(array $ctxmap, ?InternetdbContext $basectx): InternetdbContext
    {
        return new InternetdbContext($ctxmap, $basectx);
    }
}

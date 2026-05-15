<?php
declare(strict_types=1);

// Internetdb SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class InternetdbFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new InternetdbBaseFeature();
            case "test":
                return new InternetdbTestFeature();
            default:
                return new InternetdbBaseFeature();
        }
    }
}

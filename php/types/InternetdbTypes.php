<?php
declare(strict_types=1);

// Typed models for the Internetdb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** InfoIpGet entity data model. */
class InfoIpGet
{
    public array $cpe;
    public array $hostname;
    public string $ip;
    public array $port;
    public array $tag;
    public array $vuln;
}

/** Request payload for InfoIpGet#list. */
class InfoIpGetListMatch
{
    public string $id;
}


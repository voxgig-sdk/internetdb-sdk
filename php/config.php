<?php
declare(strict_types=1);

// Internetdb SDK configuration

class InternetdbConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Internetdb",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://internetdb.shodan.io",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "info_ip_get" => [],
                ],
            ],
            "entity" => [
        'info_ip_get' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'cpe',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'hostname',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'ip',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'port',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'tag',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'vuln',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 5,
            ],
          ],
          'name' => 'info_ip_get',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/{ip}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return InternetdbFeatures::make_feature($name);
    }
}

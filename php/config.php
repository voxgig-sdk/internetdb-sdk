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
              'name' => 'cpe',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'hostname',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'ip',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'port',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'tag',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'vuln',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'info_ip_get',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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

# Internetdb SDK configuration

module InternetdbConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Internetdb",
        "slug" => "internetdb",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://internetdb.shodan.io",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "info_ip_get" => {},
        },
      },
      "entity" => {
        "info_ip_get" => {
          "fields" => [
            {
              "name" => "cpes",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "hostnames",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "ports",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "tags",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "vulns",
              "req" => true,
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "info_ip_get",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}",
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    InternetdbFeatures.make_feature(name)
  end
end

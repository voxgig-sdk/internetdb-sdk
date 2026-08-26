-- Internetdb SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Internetdb",
      slug = "internetdb",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://internetdb.shodan.io",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["info_ip_get"] = {},
      },
    },
    entity = {
      ["info_ip_get"] = {
        ["fields"] = {
          {
            ["name"] = "cpes",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "hostnames",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ip",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ports",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "tags",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "vulns",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "info_ip_get",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "ip",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{ip}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["ip"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config

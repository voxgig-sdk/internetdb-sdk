# Internetdb SDK configuration


def make_config():
    return {
        "main": {
            "name": "Internetdb",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://internetdb.shodan.io",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "info_ip_get": {},
            },
        },
        "entity": {
      "info_ip_get": {
        "fields": [
          {
            "name": "cpe",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "hostname",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "port",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "tag",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "vuln",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "info_ip_get",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{ip}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

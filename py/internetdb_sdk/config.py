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
            "active": True,
            "name": "cpes",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "hostnames",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "ports",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "tags",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "vulns",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 5,
          },
        ],
        "name": "info_ip_get",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }


import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Internetdb',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://internetdb.shodan.io',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      info_ip_get: {
      },

    }
  }


  entity = {
    "info_ip_get": {
      "fields": [
        {
          "active": true,
          "name": "cpes",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "hostnames",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "ip",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "ports",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "tags",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 4
        },
        {
          "active": true,
          "name": "vulns",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 5
        }
      ],
      "name": "info_ip_get",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}


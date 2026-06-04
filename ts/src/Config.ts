
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

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
          "name": "cpe",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "hostname",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "port",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 3
        },
        {
          "name": "tag",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 4
        },
        {
          "name": "vuln",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 5
        }
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
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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



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
    base: "https://internetdb.shodan.io",

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
          "name": "cpes",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "hostnames",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ports",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "tags",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "vulns",
          "req": true,
          "type": "`$ARRAY`"
        }
      ],
      "name": "info_ip_get",
      "op": {
        "list": {
          "input": "data",
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
                    "type": "`$STRING`"
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
              }
            }
          ]
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


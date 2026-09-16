

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { InternetdbSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('InfoIpGetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when INTERNETDB_TEST_LIVE=TRUE.
  afterEach(liveDelay('INTERNETDB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = InternetdbSDK.test()
    const ent = testsdk.InfoIpGet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.INTERNETDB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'info_ip_get.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cpes","req":true,"type":"`$ARRAY`","index$":0},{"active":true,"name":"hostnames","req":true,"type":"`$ARRAY`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"ip","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"ports","req":true,"type":"`$ARRAY`","index$":4},{"active":true,"name":"tags","req":true,"type":"`$ARRAY`","index$":5},{"active":true,"name":"vulns","req":true,"type":"`$ARRAY`","index$":6}],"id":{"field":"id","name":"id"},"name":"info_ip_get","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"ip","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{ip}","json":"{\"operationId\":\"info__ip__get\",\"parameters\":[{\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"title\":\"Ip\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cpes\":{\"items\":{\"type\":\"string\"},\"title\":\"Cpes\",\"type\":\"array\"},\"hostnames\":{\"items\":{\"type\":\"string\"},\"title\":\"Hostnames\",\"type\":\"array\"},\"ip\":{\"title\":\"Ip\",\"type\":\"string\"},\"ports\":{\"items\":{\"type\":\"integer\"},\"title\":\"Ports\",\"type\":\"array\"},\"tags\":{\"items\":{\"type\":\"string\"},\"title\":\"Tags\",\"type\":\"array\"},\"vulns\":{\"items\":{\"type\":\"string\"},\"title\":\"Vulns\",\"type\":\"array\"}},\"required\":[\"cpes\",\"hostnames\",\"ip\",\"ports\",\"tags\",\"vulns\"],\"title\":\"Host\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"type\":\"string\"},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{ip}","rename":{"param":{"ip":"id"}},"segments":[{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"info_ip_get","name__orig":"info_ip_get","Name":"InfoIpGet","name_":"info_ip_get","name-":"info-ip-get","NAME":"INFO_IP_GET","index$":0}, {"active":true,"entity":"info_ip_get","key$":"BasicInfoIpGetFlow","kind":"basic","name":"BasicInfoIpGetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"ip":"ip01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"info_ip_get_ref01"}}],"index$":0}]}, 'InfoIpGet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let info_ip_get_ref01_data = Object.values(setup.data.existing.info_ip_get)[0] as any

    // LIST
    const info_ip_get_ref01_ent = client.InfoIpGet()
    const info_ip_get_ref01_match: any = {}
    info_ip_get_ref01_match['ip'] = setup.idmap['ip01']

    const info_ip_get_ref01_list = (await info_ip_get_ref01_ent.list(info_ip_get_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/info_ip_get/InfoIpGetTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = InternetdbSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['info_ip_get01','info_ip_get02','info_ip_get03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'INTERNETDB_TEST_INFO_IP_GET_ENTID': idmap,
    'INTERNETDB_TEST_LIVE': 'FALSE',
    'INTERNETDB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['INTERNETDB_TEST_INFO_IP_GET_ENTID']

  const live = 'TRUE' === env.INTERNETDB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['INTERNETDB_TEST_INFO_IP_GET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new InternetdbSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.INTERNETDB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

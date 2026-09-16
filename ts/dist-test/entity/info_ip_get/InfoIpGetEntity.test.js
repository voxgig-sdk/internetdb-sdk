"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('InfoIpGetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when INTERNETDB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('INTERNETDB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.InternetdbSDK.test();
        const ent = testsdk.InfoIpGet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.INTERNETDB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'info_ip_get.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cpes", "req": true, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "hostnames", "req": true, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "ip", "req": true, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "ports", "req": true, "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "tags", "req": true, "type": "`$ARRAY`", "index$": 5 }, { "active": true, "name": "vulns", "req": true, "type": "`$ARRAY`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "info_ip_get", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "ip", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{ip}", "json": "{\"operationId\":\"info__ip__get\",\"parameters\":[{\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"title\":\"Ip\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cpes\":{\"items\":{\"type\":\"string\"},\"title\":\"Cpes\",\"type\":\"array\"},\"hostnames\":{\"items\":{\"type\":\"string\"},\"title\":\"Hostnames\",\"type\":\"array\"},\"ip\":{\"title\":\"Ip\",\"type\":\"string\"},\"ports\":{\"items\":{\"type\":\"integer\"},\"title\":\"Ports\",\"type\":\"array\"},\"tags\":{\"items\":{\"type\":\"string\"},\"title\":\"Tags\",\"type\":\"array\"},\"vulns\":{\"items\":{\"type\":\"string\"},\"title\":\"Vulns\",\"type\":\"array\"}},\"required\":[\"cpes\",\"hostnames\",\"ip\",\"ports\",\"tags\",\"vulns\"],\"title\":\"Host\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"type\":\"string\"},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{ip}", "rename": { "param": { "ip": "id" } }, "segments": [{ "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "info_ip_get", "name__orig": "info_ip_get", "Name": "InfoIpGet", "name_": "info_ip_get", "name-": "info-ip-get", "NAME": "INFO_IP_GET", "index$": 0 }, { "active": true, "entity": "info_ip_get", "key$": "BasicInfoIpGetFlow", "kind": "basic", "name": "BasicInfoIpGetFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "ip": "ip01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "info_ip_get_ref01" } }], "index$": 0 }] }, 'InfoIpGet');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let info_ip_get_ref01_data = Object.values(setup.data.existing.info_ip_get)[0];
        // LIST
        const info_ip_get_ref01_ent = client.InfoIpGet();
        const info_ip_get_ref01_match = {};
        info_ip_get_ref01_match['ip'] = setup.idmap['ip01'];
        const info_ip_get_ref01_list = (await info_ip_get_ref01_ent.list(info_ip_get_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/info_ip_get/InfoIpGetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.InternetdbSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['info_ip_get01', 'info_ip_get02', 'info_ip_get03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'INTERNETDB_TEST_INFO_IP_GET_ENTID': idmap,
        'INTERNETDB_TEST_LIVE': 'FALSE',
        'INTERNETDB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['INTERNETDB_TEST_INFO_IP_GET_ENTID'];
    const live = 'TRUE' === env.INTERNETDB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['INTERNETDB_TEST_INFO_IP_GET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.InternetdbSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=InfoIpGetEntity.test.js.map
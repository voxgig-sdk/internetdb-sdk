# Internetdb SDK

Fast IP lookups for open ports, hostnames, CPEs, tags, and known CVEs

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About InternetDB

[InternetDB](https://internetdb.shodan.io) is a free, lightweight lookup service from [Shodan](https://www.shodan.io/) that returns a summary view of what Shodan knows about a public IPv4 address. It is intended for quick reconnaissance rather than the deep banner-level data offered by the full Shodan API.

What you get from the API:

- The queried IP address
- The list of open `ports`
- `cpes` (Common Platform Enumerations) detected on the host
- Associated `hostnames`
- `tags` describing the host (for example `vpn`, `cloud`)
- Known `vulns` as CVE identifiers

The service is unauthenticated and CORS-enabled, making it convenient to call directly from browsers, scripts, or CLI tools. Data is refreshed on a weekly cadence rather than in real time, and no banner content is included. Only public IPv4 addresses that Shodan has observed will return data; unknown addresses produce a 404.

## Try it

**TypeScript**
```bash
npm install internetdb
```

**Python**
```bash
pip install internetdb-sdk
```

**PHP**
```bash
composer require voxgig/internetdb-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/internetdb-sdk/go
```

**Ruby**
```bash
gem install internetdb-sdk
```

**Lua**
```bash
luarocks install internetdb-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { InternetdbSDK } from 'internetdb'

const client = new InternetdbSDK({})

// List all infoipgets
const infoipgets = await client.InfoIpGet().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o internetdb-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "internetdb": {
      "command": "/abs/path/to/internetdb-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **InfoIpGet** | Per-IP reconnaissance record returned by `GET /{ip}` — the open ports, CPEs, hostnames, tags, and known CVE IDs Shodan has observed for that address. | `/{ip}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from internetdb_sdk import InternetdbSDK

client = InternetdbSDK({})

# List all infoipgets
infoipgets, err = client.InfoIpGet(None).list(None, None)
```

### PHP

```php
<?php
require_once 'internetdb_sdk.php';

$client = new InternetdbSDK([]);

// List all infoipgets
[$infoipgets, $err] = $client->InfoIpGet(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/internetdb-sdk/go"

client := sdk.NewInternetdbSDK(map[string]any{})

// List all infoipgets
infoipgets, err := client.InfoIpGet(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Internetdb_sdk"

client = InternetdbSDK.new({})

# List all infoipgets
infoipgets, err = client.InfoIpGet(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("internetdb_sdk")

local client = sdk.new({})

-- List all infoipgets
local infoipgets, err = client:InfoIpGet(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = InternetdbSDK.test()
const result = await client.InfoIpGet().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = InternetdbSDK.test(None, None)
result, err = client.InfoIpGet(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = InternetdbSDK::test(null, null);
[$result, $err] = $client->InfoIpGet(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.InfoIpGet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = InternetdbSDK.test(nil, nil)
result, err = client.InfoIpGet(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:InfoIpGet(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the InternetDB

- Upstream: [https://internetdb.shodan.io](https://internetdb.shodan.io)

- Free to use for non-commercial purposes with no API key or account required
- Commercial use requires enterprise licensing from Shodan
- Data is provided as-is and reflects Shodan's most recent scan cycle
- See the [Shodan terms of service](https://www.shodan.io/) for the full agreement

---

Generated from the InternetDB OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

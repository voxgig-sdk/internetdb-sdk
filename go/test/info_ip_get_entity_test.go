package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/internetdb-sdk/go"
	"github.com/voxgig-sdk/internetdb-sdk/go/core"

	vs "github.com/voxgig-sdk/internetdb-sdk/go/utility/struct"
)

func TestInfoIpGetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.InfoIpGet(nil)
		if ent == nil {
			t.Fatal("expected non-nil InfoIpGetEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := info_ip_getBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "info_ip_get." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set INTERNETDB_TEST_INFO_IP_GET_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		infoIpGetRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.info_ip_get", setup.data)))
		var infoIpGetRef01Data map[string]any
		if len(infoIpGetRef01DataRaw) > 0 {
			infoIpGetRef01Data = core.ToMapAny(infoIpGetRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = infoIpGetRef01Data

		// LIST
		infoIpGetRef01Ent := client.InfoIpGet(nil)
		infoIpGetRef01Match := map[string]any{
			"ip": setup.idmap["ip01"],
		}

		infoIpGetRef01ListResult, err := infoIpGetRef01Ent.List(infoIpGetRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, infoIpGetRef01ListOk := infoIpGetRef01ListResult.([]any)
		if !infoIpGetRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", infoIpGetRef01ListResult)
		}

	})
}

func info_ip_getBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "info_ip_get", "InfoIpGetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read info_ip_get test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse info_ip_get test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"info_ip_get01", "info_ip_get02", "info_ip_get03", "ip01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("INTERNETDB_TEST_INFO_IP_GET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"INTERNETDB_TEST_INFO_IP_GET_ENTID": idmap,
		"INTERNETDB_TEST_LIVE":      "FALSE",
		"INTERNETDB_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["INTERNETDB_TEST_INFO_IP_GET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["INTERNETDB_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewInternetdbSDK(core.ToMapAny(mergedOpts))
	}

	live := env["INTERNETDB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["INTERNETDB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

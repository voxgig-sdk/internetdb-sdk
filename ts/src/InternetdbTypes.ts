// Typed models for the Internetdb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface InfoIpGet {
  cpes: any[]
  hostnames: any[]
  id?: string
  ip: string
  ports: any[]
  tags: any[]
  vulns: any[]
}

export interface InfoIpGetListMatch {
  id: string
}


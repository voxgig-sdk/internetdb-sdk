# frozen_string_literal: true

# Typed models for the Internetdb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# InfoIpGet entity data model.
#
# @!attribute [rw] cpes
#   @return [Array]
#
# @!attribute [rw] hostnames
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] ports
#   @return [Array]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] vulns
#   @return [Array]
InfoIpGet = Struct.new(
  :cpes,
  :hostnames,
  :id,
  :ip,
  :ports,
  :tags,
  :vulns,
  keyword_init: true
)

# Request payload for InfoIpGet#list.
#
# @!attribute [rw] id
#   @return [String]
InfoIpGetListMatch = Struct.new(
  :id,
  keyword_init: true
)


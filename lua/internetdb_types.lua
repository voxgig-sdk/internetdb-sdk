-- Typed models for the Internetdb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class InfoIpGet
---@field cpes table
---@field hostnames table
---@field id? string
---@field ip string
---@field ports table
---@field tags table
---@field vulns table

---@class InfoIpGetListMatch
---@field id string

local M = {}

return M

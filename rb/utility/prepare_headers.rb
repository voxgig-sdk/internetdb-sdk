# Internetdb SDK utility: prepare_headers
require_relative 'struct/voxgig_struct'
module InternetdbUtilities
  PrepareHeaders = ->(ctx) {
    options = ctx.client.options_map
    headers = VoxgigStruct.getprop(options, "headers")
    return {} unless headers
    out = VoxgigStruct.clone(headers)
    out.is_a?(Hash) ? out : {}
  }
end

# Internetdb SDK utility: prepare_method
module InternetdbUtilities
  METHOD_MAP = { "create"=>"POST", "update"=>"PUT", "load"=>"GET", "list"=>"GET", "remove"=>"DELETE", "patch"=>"PATCH" }
  PrepareMethod = ->(ctx) { METHOD_MAP[ctx.op.name] || "GET" }
end

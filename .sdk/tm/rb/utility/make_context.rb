# Internetdb SDK utility: make_context
require_relative '../core/context'
module InternetdbUtilities
  MakeContext = ->(ctxmap, basectx) {
    InternetdbContext.new(ctxmap, basectx)
  }
end

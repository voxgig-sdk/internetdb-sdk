-- Internetdb SDK error

local InternetdbError = {}
InternetdbError.__index = InternetdbError


function InternetdbError.new(code, msg, ctx)
  local self = setmetatable({}, InternetdbError)
  self.is_sdk_error = true
  self.sdk = "Internetdb"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function InternetdbError:error()
  return self.msg
end


function InternetdbError:__tostring()
  return self.msg
end


return InternetdbError

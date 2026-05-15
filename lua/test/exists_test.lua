-- ProjectName SDK exists test

local sdk = require("internetdb_sdk")

describe("InternetdbSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)

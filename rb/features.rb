# Internetdb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module InternetdbFeatures
  def self.make_feature(name)
    case name
    when "base"
      InternetdbBaseFeature.new
    when "ratelimit"
      InternetdbRatelimitFeature.new
    when "retry"
      InternetdbRetryFeature.new
    when "test"
      InternetdbTestFeature.new
    when "timeout"
      InternetdbTimeoutFeature.new
    else
      InternetdbBaseFeature.new
    end
  end
end

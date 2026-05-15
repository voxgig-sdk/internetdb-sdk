# Internetdb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module InternetdbFeatures
  def self.make_feature(name)
    case name
    when "base"
      InternetdbBaseFeature.new
    when "test"
      InternetdbTestFeature.new
    else
      InternetdbBaseFeature.new
    end
  end
end

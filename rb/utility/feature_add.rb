# Internetdb SDK utility: feature_add
module InternetdbUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end

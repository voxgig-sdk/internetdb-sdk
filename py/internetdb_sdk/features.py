# Internetdb SDK feature factory

from internetdb_sdk.feature.base_feature import InternetdbBaseFeature
from internetdb_sdk.feature.test_feature import InternetdbTestFeature


def _make_feature(name):
    features = {
        "base": lambda: InternetdbBaseFeature(),
        "test": lambda: InternetdbTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

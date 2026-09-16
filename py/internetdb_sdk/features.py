# Internetdb SDK feature factory

from internetdb_sdk.feature.base_feature import InternetdbBaseFeature
from internetdb_sdk.feature.ratelimit_feature import InternetdbRatelimitFeature
from internetdb_sdk.feature.retry_feature import InternetdbRetryFeature
from internetdb_sdk.feature.test_feature import InternetdbTestFeature
from internetdb_sdk.feature.timeout_feature import InternetdbTimeoutFeature


_FEATURES = {
    "base": lambda: InternetdbBaseFeature(),
    "ratelimit": lambda: InternetdbRatelimitFeature(),
    "retry": lambda: InternetdbRetryFeature(),
    "test": lambda: InternetdbTestFeature(),
    "timeout": lambda: InternetdbTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

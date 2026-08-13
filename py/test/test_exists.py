# Internetdb SDK exists test

import pytest
from internetdb_sdk import InternetdbSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = InternetdbSDK.test(None, None)
        assert testsdk is not None

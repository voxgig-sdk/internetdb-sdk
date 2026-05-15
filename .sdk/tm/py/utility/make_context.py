# Internetdb SDK utility: make_context

from core.context import InternetdbContext


def make_context_util(ctxmap, basectx):
    return InternetdbContext(ctxmap, basectx)

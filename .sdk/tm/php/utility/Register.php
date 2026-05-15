<?php
declare(strict_types=1);

// Internetdb SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

InternetdbUtility::setRegistrar(function (InternetdbUtility $u): void {
    $u->clean = [InternetdbClean::class, 'call'];
    $u->done = [InternetdbDone::class, 'call'];
    $u->make_error = [InternetdbMakeError::class, 'call'];
    $u->feature_add = [InternetdbFeatureAdd::class, 'call'];
    $u->feature_hook = [InternetdbFeatureHook::class, 'call'];
    $u->feature_init = [InternetdbFeatureInit::class, 'call'];
    $u->fetcher = [InternetdbFetcher::class, 'call'];
    $u->make_fetch_def = [InternetdbMakeFetchDef::class, 'call'];
    $u->make_context = [InternetdbMakeContext::class, 'call'];
    $u->make_options = [InternetdbMakeOptions::class, 'call'];
    $u->make_request = [InternetdbMakeRequest::class, 'call'];
    $u->make_response = [InternetdbMakeResponse::class, 'call'];
    $u->make_result = [InternetdbMakeResult::class, 'call'];
    $u->make_point = [InternetdbMakePoint::class, 'call'];
    $u->make_spec = [InternetdbMakeSpec::class, 'call'];
    $u->make_url = [InternetdbMakeUrl::class, 'call'];
    $u->param = [InternetdbParam::class, 'call'];
    $u->prepare_auth = [InternetdbPrepareAuth::class, 'call'];
    $u->prepare_body = [InternetdbPrepareBody::class, 'call'];
    $u->prepare_headers = [InternetdbPrepareHeaders::class, 'call'];
    $u->prepare_method = [InternetdbPrepareMethod::class, 'call'];
    $u->prepare_params = [InternetdbPrepareParams::class, 'call'];
    $u->prepare_path = [InternetdbPreparePath::class, 'call'];
    $u->prepare_query = [InternetdbPrepareQuery::class, 'call'];
    $u->result_basic = [InternetdbResultBasic::class, 'call'];
    $u->result_body = [InternetdbResultBody::class, 'call'];
    $u->result_headers = [InternetdbResultHeaders::class, 'call'];
    $u->transform_request = [InternetdbTransformRequest::class, 'call'];
    $u->transform_response = [InternetdbTransformResponse::class, 'call'];
});

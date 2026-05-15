<?php
declare(strict_types=1);

// Internetdb SDK utility: result_headers

class InternetdbResultHeaders
{
    public static function call(InternetdbContext $ctx): ?InternetdbResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

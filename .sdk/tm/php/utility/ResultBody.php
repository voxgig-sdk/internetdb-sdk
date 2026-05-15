<?php
declare(strict_types=1);

// Internetdb SDK utility: result_body

class InternetdbResultBody
{
    public static function call(InternetdbContext $ctx): ?InternetdbResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

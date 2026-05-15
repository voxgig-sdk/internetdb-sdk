<?php
declare(strict_types=1);

// Internetdb SDK log feature

require_once __DIR__ . '/BaseFeature.php';

class InternetdbLogFeature extends InternetdbBaseFeature
{
    private mixed $client;
    private ?array $options;
    private mixed $logger;

    public function __construct()
    {
        parent::__construct();
        $this->version = '0.0.1';
        $this->name = 'log';
        $this->active = true;
        $this->client = null;
        $this->options = null;
        $this->logger = null;
    }

    public function init(InternetdbContext $ctx, array $options): void
    {
        $this->client = $ctx->client;
        $this->options = $options;
        $this->active = ($options['active'] ?? null) === true;

        if ($this->active) {
            if (isset($options['logger'])) {
                $this->logger = $options['logger'];
            } else {
                $this->logger = STDERR;
            }
        }
    }

    private function _loghook(string $hook, InternetdbContext $ctx, string $level = 'info'): void
    {
        if (!$this->logger) {
            return;
        }
        $opname = $ctx->op ? $ctx->op->name : '';
        $msg = "hook={$hook} op={$opname}";
        if (is_resource($this->logger)) {
            fwrite($this->logger, "[" . strtoupper($level) . "] {$msg}\n");
        } elseif (is_callable($this->logger)) {
            ($this->logger)("[" . strtoupper($level) . "] {$msg}");
        }
    }

    public function PostConstruct(InternetdbContext $ctx): void { $this->_loghook('PostConstruct', $ctx); }
    public function PostConstructEntity(InternetdbContext $ctx): void { $this->_loghook('PostConstructEntity', $ctx); }
    public function SetData(InternetdbContext $ctx): void { $this->_loghook('SetData', $ctx); }
    public function GetData(InternetdbContext $ctx): void { $this->_loghook('GetData', $ctx); }
    public function SetMatch(InternetdbContext $ctx): void { $this->_loghook('SetMatch', $ctx); }
    public function GetMatch(InternetdbContext $ctx): void { $this->_loghook('GetMatch', $ctx); }
    public function PrePoint(InternetdbContext $ctx): void { $this->_loghook('PrePoint', $ctx); }
    public function PreSpec(InternetdbContext $ctx): void { $this->_loghook('PreSpec', $ctx); }
    public function PreRequest(InternetdbContext $ctx): void { $this->_loghook('PreRequest', $ctx); }
    public function PreResponse(InternetdbContext $ctx): void { $this->_loghook('PreResponse', $ctx); }
    public function PreResult(InternetdbContext $ctx): void { $this->_loghook('PreResult', $ctx); }
}

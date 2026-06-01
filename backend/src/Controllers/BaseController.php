<?php

declare(strict_types=1);

namespace App\Controllers;

use JsonException;

abstract class BaseController
{
    protected function input(): array
    {
        $raw = file_get_contents('php://input');
        if (empty($raw)) {
            return $_POST;
        }
        try {
            return json_decode($raw, true, 512, JSON_THROW_ON_ERROR) ?? [];
        } catch (JsonException) {
            return [];
        }
    }

    protected function json(array $data, int $status = 200): array
    {
        http_response_code($status);
        return $data;
    }

    protected function bearerToken(): ?string
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (str_starts_with($header, 'Bearer ')) {
            return substr($header, 7);
        }
        return null;
    }
}

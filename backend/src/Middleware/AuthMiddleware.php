<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Config\Database;
use PDO;

class AuthMiddleware
{
    public static function handle(bool $requireAdmin = false): ?array
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!str_starts_with($header, 'Bearer ')) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }

        $token = substr($header, 7);
        $payload = self::decodeToken($token);

        if (!$payload) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired token']);
            exit;
        }

        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT id, email, name, surname, patronymic, nickname, role, status, total_points, is_test_user FROM users WHERE id = ? LIMIT 1");
        $stmt->execute([(int)$payload['sub']]);
        $user = $stmt->fetch();

        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => 'User not found']);
            exit;
        }

        if ($requireAdmin && $user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Forbidden: admin access required']);
            exit;
        }

        return $user;
    }

    private static function decodeToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) < 2) return null;
        $payload = json_decode(base64_decode($parts[1]), true);
        if (empty($payload['exp']) || $payload['exp'] < time()) return null;
        return $payload;
    }
}

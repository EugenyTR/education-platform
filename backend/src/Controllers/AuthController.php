<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;

class AuthController extends BaseController
{
    public function register(): array
    {
        $data = $this->input();

        $required = ['email', 'password', 'name', 'surname'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return $this->json(['error' => "Field {$field} is required"], 422);
            }
        }

        $existing = User::findByEmail($data['email']);
        if ($existing) {
            return $this->json(['error' => 'Email already registered'], 409);
        }

        $userId = User::create([
            'email' => $data['email'],
            'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT),
            'name' => $data['name'],
            'surname' => $data['surname'],
            'patronymic' => $data['patronymic'] ?? null,
            'nickname' => $data['nickname'] ?? null,
            'is_test_user' => str_contains($data['email'], 'test') ? 1 : 0,
        ]);

        $user = User::find($userId);

        // Initialize achievements for new user
        \App\Models\UserAchievement::initForUser($userId);

        // Welcome points
        $db = \App\Config\Database::getConnection();
        $db->prepare(
            "INSERT INTO point_transactions (user_id, type, amount, description)
             VALUES (?, 'manual_admin', 100, 'Добро пожаловать! Стартовые баллы')"
        )->execute([$userId]);
        $db->prepare("UPDATE users SET total_points = 100 WHERE id = ?")
            ->execute([$userId]);

        unset($user['password_hash']);

        return $this->json([
            'success' => true,
            'user' => $user,
            'token' => $this->generateToken($userId),
        ]);
    }

    public function login(): array
    {
        $data = $this->input();

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => 'Email and password required'], 422);
        }

        $user = User::findByEmail($data['email']);
        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            return $this->json(['error' => 'Invalid credentials'], 401);
        }

        unset($user['password_hash']);

        return $this->json([
            'success' => true,
            'user' => $user,
            'token' => $this->generateToken($user['id']),
        ]);
    }

    public function me(): array
    {
        $token = $this->bearerToken();
        if (!$token) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $payload = $this->decodeToken($token);
        if (!$payload) {
            return $this->json(['error' => 'Invalid token'], 401);
        }

        $user = User::find((int)$payload['sub']);
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        unset($user['password_hash']);
        return $this->json(['user' => $user]);
    }

    private function generateToken(int $userId): string
    {
        $header = json_encode(['alg' => 'none', 'typ' => 'JWT']);
        $time = time();
        $payload = json_encode([
            'iss' => 'edu-platform',
            'sub' => $userId,
            'iat' => $time,
            'exp' => $time + 86400 * 7,
        ]);
        return base64_encode($header) . '.' . base64_encode($payload) . '.';
    }

    private function decodeToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) < 2) {
            return null;
        }
        $payload = json_decode(base64_decode($parts[1]), true);
        if (empty($payload['exp']) || $payload['exp'] < time()) {
            return null;
        }
        return $payload;
    }
}

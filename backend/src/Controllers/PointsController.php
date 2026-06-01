<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Middleware\AuthMiddleware;
use App\Models\PointTransaction;
use App\Models\User;

class PointsController extends BaseController
{
    public function history(): array
    {
        $user = AuthMiddleware::handle();
        $items = PointTransaction::findByUser((int)$user['id']);
        return $this->json(['data' => $items]);
    }

    public function balance(): array
    {
        $user = AuthMiddleware::handle();
        $total = PointTransaction::sumByUser((int)$user['id']);
        return $this->json(['balance' => $total]);
    }

    public function share(): array
    {
        $user = AuthMiddleware::handle();
        $data = $this->input();

        if (empty($data['recipient_id']) || empty($data['amount']) || (int)$data['amount'] <= 0) {
            return $this->json(['error' => 'recipient_id and positive amount required'], 422);
        }

        $amount = (int)$data['amount'];
        $balance = PointTransaction::sumByUser((int)$user['id']);
        if ($balance < $amount) {
            return $this->json(['error' => 'Insufficient points'], 400);
        }

        $db = Database::getConnection();
        $db->beginTransaction();

        try {
            // Deduct from sender
            $db->prepare(
                "INSERT INTO point_transactions (user_id, type, amount, description, related_id)
                 VALUES (?, 'shared_sent', ?, ?, ?)"
            )->execute([$user['id'], -$amount, 'Отправлено пользователю ' . $data['recipient_id'], (string)$data['recipient_id']]);

            // Add to recipient
            $db->prepare(
                "INSERT INTO point_transactions (user_id, type, amount, description, related_id)
                 VALUES (?, 'shared_received', ?, ?, ?)"
            )->execute([$data['recipient_id'], $amount, 'Получено от ' . $user['name'] . ' ' . $user['surname'], (string)$user['id']]);

            $db->commit();
            return $this->json(['success' => true, 'shared' => $amount]);
        } catch (\Throwable $e) {
            $db->rollBack();
            return $this->json(['error' => 'Transfer failed', 'message' => $e->getMessage()], 500);
        }
    }

    public function adminAdd(): array
    {
        $admin = AuthMiddleware::handle(true);
        $data = $this->input();

        if (empty($data['user_id']) || !isset($data['amount'])) {
            return $this->json(['error' => 'user_id and amount required'], 422);
        }

        $amount = (int)$data['amount'];
        $db = Database::getConnection();

        $db->prepare(
            "INSERT INTO point_transactions (user_id, type, amount, description, related_id)
             VALUES (?, 'manual_admin', ?, ?, ?)"
        )->execute([$data['user_id'], $amount, $data['reason'] ?? 'Начислено администратором', (string)$admin['id']]);

        $db->prepare("UPDATE users SET total_points = total_points + ? WHERE id = ?")
            ->execute([$amount, $data['user_id']]);

        return $this->json(['success' => true, 'awarded' => $amount]);
    }

    public function adminGiftCourse(): array
    {
        $admin = AuthMiddleware::handle(true);
        $data = $this->input();

        if (empty($data['user_id']) || empty($data['course_id'])) {
            return $this->json(['error' => 'user_id and course_id required'], 422);
        }

        $db = Database::getConnection();
        $db->prepare(
            "INSERT INTO user_courses (user_id, course_id, access_type, progress)
             VALUES (?, ?, 'gifted', 0)
             ON DUPLICATE KEY UPDATE access_type = 'gifted'"
        )->execute([$data['user_id'], $data['course_id']]);

        return $this->json(['success' => true, 'message' => 'Course gifted']);
    }
}

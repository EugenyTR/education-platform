<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Achievement;
use App\Models\UserAchievement;

class AchievementController extends BaseController
{
    public function index(): array
    {
        $user = AuthMiddleware::handle();
        $items = UserAchievement::findByUser((int)$user['id']);
        return $this->json(['data' => $items]);
    }

    public function all(): array
    {
        $items = Achievement::all();
        return $this->json(['data' => $items]);
    }

    public function updateProgress(): array
    {
        $user = AuthMiddleware::handle();
        $data = $this->input();

        if (empty($data['achievement_id']) || !isset($data['progress'])) {
            return $this->json(['error' => 'achievement_id and progress required'], 422);
        }

        $achievement = Achievement::find((int)$data['achievement_id']);
        if (!$achievement) {
            return $this->json(['error' => 'Achievement not found'], 404);
        }

        $progress = max(0, min((int)$data['progress'], (int)$achievement['target']));
        $status = $progress >= (int)$achievement['target'] ? 'earned' : ($progress > 0 ? 'in_progress' : 'locked');

        $db = \App\Config\Database::getConnection();
        $stmt = $db->prepare(
            "UPDATE user_achievements SET current_progress = ?, status = ?, earned_at = IF(? = 'earned', COALESCE(earned_at, NOW()), earned_at)
             WHERE user_id = ? AND achievement_id = ?"
        );
        $stmt->execute([$progress, $status, $status, $user['id'], $achievement['id']]);

        if ($status === 'earned') {
            // Award points if newly earned
            $db->prepare("UPDATE users SET total_points = total_points + ? WHERE id = ?")
                ->execute([(int)$achievement['points'], $user['id']]);

            $db->prepare(
                "INSERT INTO point_transactions (user_id, type, amount, description, related_id)
                 VALUES (?, 'achievement_bonus', ?, ?, ?)"
            )->execute([$user['id'], (int)$achievement['points'], 'Достижение: ' . $achievement['title'], (string)$achievement['id']]);
        }

        return $this->json(['success' => true, 'status' => $status, 'progress' => $progress]);
    }
}

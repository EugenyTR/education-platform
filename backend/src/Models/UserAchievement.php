<?php

declare(strict_types=1);

namespace App\Models;

class UserAchievement extends Model
{
    protected static string $table = 'user_achievements';

    public static function findByUser(int $userId): array
    {
        $stmt = self::db()->prepare(
            "SELECT ua.*, a.title, a.description, a.icon, a.points, a.type, a.condition_type, a.target
             FROM user_achievements ua
             JOIN achievements a ON a.id = ua.achievement_id
             WHERE ua.user_id = ? ORDER BY ua.earned_at DESC, ua.id ASC"
        );
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public static function initForUser(int $userId): void
    {
        $db = self::db();
        $achievements = $db->query("SELECT id FROM achievements")->fetchAll();
        $stmt = $db->prepare("INSERT IGNORE INTO user_achievements (user_id, achievement_id, status) VALUES (?, ?, 'locked')");
        foreach ($achievements as $a) {
            $stmt->execute([$userId, $a['id']]);
        }
    }
}

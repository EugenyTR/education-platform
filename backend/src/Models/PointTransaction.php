<?php

declare(strict_types=1);

namespace App\Models;

class PointTransaction extends Model
{
    protected static string $table = 'point_transactions';

    public static function findByUser(int $userId, int $limit = 50): array
    {
        $stmt = self::db()->prepare("SELECT * FROM point_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?");
        $stmt->execute([$userId, $limit]);
        return $stmt->fetchAll();
    }

    public static function sumByUser(int $userId): int
    {
        $stmt = self::db()->prepare("SELECT COALESCE(SUM(amount), 0) as total FROM point_transactions WHERE user_id = ?");
        $stmt->execute([$userId]);
        return (int) $stmt->fetch()['total'];
    }
}

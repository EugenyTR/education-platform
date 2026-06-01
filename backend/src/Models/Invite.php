<?php

declare(strict_types=1);

namespace App\Models;

class Invite extends Model
{
    protected static string $table = 'invites';

    public static function findByCode(string $code): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM invites WHERE code = ? LIMIT 1");
        $stmt->execute([$code]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function findByReferrer(int $userId): array
    {
        $stmt = self::db()->prepare("SELECT * FROM invites WHERE referrer_user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public static function countByReferrer(int $userId): int
    {
        $stmt = self::db()->prepare("SELECT COUNT(*) as cnt FROM invites WHERE referrer_user_id = ? AND invited_user_id IS NOT NULL");
        $stmt->execute([$userId]);
        return (int) $stmt->fetch()['cnt'];
    }
}

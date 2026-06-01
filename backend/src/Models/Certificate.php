<?php

declare(strict_types=1);

namespace App\Models;

class Certificate extends Model
{
    protected static string $table = 'certificates';

    public static function findByUser(int $userId): array
    {
        $stmt = self::db()->prepare(
            "SELECT c.*, crs.title as course_title FROM certificates c
             JOIN courses crs ON crs.id = c.course_id
             WHERE c.user_id = ? ORDER BY c.created_at DESC"
        );
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public static function generateNumber(): string
    {
        return 'EDU-' . date('Y') . '-' . strtoupper(bin2hex(random_bytes(4)));
    }
}

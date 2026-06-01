<?php

declare(strict_types=1);

namespace App\Models;

class Achievement extends Model
{
    protected static string $table = 'achievements';

    public static function findByType(string $type): array
    {
        $stmt = self::db()->prepare("SELECT * FROM achievements WHERE type = ?");
        $stmt->execute([$type]);
        return $stmt->fetchAll();
    }
}

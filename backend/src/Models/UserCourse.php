<?php

declare(strict_types=1);

namespace App\Models;

class UserCourse extends Model
{
    protected static string $table = 'user_courses';

    public static function findByUser(int $userId): array
    {
        $stmt = self::db()->prepare(
            "SELECT uc.*, c.title as course_name FROM user_courses uc
             JOIN courses c ON c.id = uc.course_id
             WHERE uc.user_id = ? ORDER BY uc.updated_at DESC"
        );
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public static function findByUserAndCourse(int $userId, int $courseId): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM user_courses WHERE user_id = ? AND course_id = ? LIMIT 1");
        $stmt->execute([$userId, $courseId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}

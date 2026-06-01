<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateAchievementsTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS achievements (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            icon VARCHAR(50) NOT NULL,
            points INT UNSIGNED DEFAULT 0,
            type ENUM('course_completion', 'profile', 'social', 'referral', 'purchase') NOT NULL,
            condition_type VARCHAR(50) NOT NULL,
            target INT UNSIGNED NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_type (type),
            INDEX idx_condition (condition_type)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS achievements;");
    }
}

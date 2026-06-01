<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateCoursesTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS courses (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            cover_image VARCHAR(500) NULL,
            instructor VARCHAR(255) NOT NULL,
            duration VARCHAR(50) NOT NULL,
            lessons_count INT UNSIGNED DEFAULT 0,
            price INT UNSIGNED DEFAULT 0,
            discount_price INT UNSIGNED NULL,
            has_discount TINYINT(1) DEFAULT 0,
            discount_end_date DATE NULL,
            free_access_available TINYINT(1) DEFAULT 0,
            certificate_threshold TINYINT UNSIGNED DEFAULT 80,
            bonus_points INT UNSIGNED DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_instructor (instructor),
            INDEX idx_free_access (free_access_available)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS courses;");
    }
}

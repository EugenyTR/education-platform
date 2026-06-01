<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateLessonsTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS lessons (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            course_id INT UNSIGNED NOT NULL,
            title VARCHAR(255) NOT NULL,
            order_index INT UNSIGNED DEFAULT 0,
            video_url VARCHAR(500) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_course_order (course_id, order_index),
            CONSTRAINT fk_lessons_course
                FOREIGN KEY (course_id) REFERENCES courses(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS lessons;");
    }
}

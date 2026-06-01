<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateCourseRankingsTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS course_rankings (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            course_id INT UNSIGNED NOT NULL,
            score TINYINT UNSIGNED NOT NULL,
            time_spent VARCHAR(20) NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY unique_user_course_rank (user_id, course_id),
            INDEX idx_course_score (course_id, score),
            CONSTRAINT fk_cr_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_cr_course
                FOREIGN KEY (course_id) REFERENCES courses(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS course_rankings;");
    }
}

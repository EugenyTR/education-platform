<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateUserCoursesTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS user_courses (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            course_id INT UNSIGNED NOT NULL,
            access_type ENUM('free', 'purchased', 'gifted') DEFAULT 'free',
            progress TINYINT UNSIGNED DEFAULT 0,
            is_completed TINYINT(1) DEFAULT 0,
            completed_at TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY unique_user_course (user_id, course_id),
            INDEX idx_user_progress (user_id, is_completed),
            CONSTRAINT fk_uc_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_uc_course
                FOREIGN KEY (course_id) REFERENCES courses(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS user_courses;");
    }
}

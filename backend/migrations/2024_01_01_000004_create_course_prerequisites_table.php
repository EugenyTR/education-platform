<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateCoursePrerequisitesTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS course_prerequisites (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            course_id INT UNSIGNED NOT NULL,
            prerequisite_course_id INT UNSIGNED NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_prerequisite (course_id, prerequisite_course_id),
            CONSTRAINT fk_cp_course
                FOREIGN KEY (course_id) REFERENCES courses(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_cp_prerequisite
                FOREIGN KEY (prerequisite_course_id) REFERENCES courses(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS course_prerequisites;");
    }
}

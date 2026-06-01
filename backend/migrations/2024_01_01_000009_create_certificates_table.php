<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateCertificatesTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS certificates (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            course_id INT UNSIGNED NOT NULL,
            certificate_number VARCHAR(100) NOT NULL UNIQUE,
            score TINYINT UNSIGNED NOT NULL,
            completion_date DATE NOT NULL,
            status ENUM('available', 'issued') DEFAULT 'available',
            download_url VARCHAR(500) NULL,
            email_sent TINYINT(1) DEFAULT 0,
            is_base_course TINYINT(1) DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_user (user_id),
            INDEX idx_status (status),
            CONSTRAINT fk_cert_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_cert_course
                FOREIGN KEY (course_id) REFERENCES courses(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS certificates;");
    }
}

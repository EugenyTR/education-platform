<?php

declare(strict_types=1);

namespace App\Migrations;

class CreateInvitesTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS invites (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(50) NOT NULL UNIQUE,
            referrer_user_id INT UNSIGNED NOT NULL,
            invited_user_id INT UNSIGNED NULL,
            used_at TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_code (code),
            INDEX idx_referrer (referrer_user_id),
            CONSTRAINT fk_invites_referrer
                FOREIGN KEY (referrer_user_id) REFERENCES users(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_invites_invited
                FOREIGN KEY (invited_user_id) REFERENCES users(id)
                ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS invites;");
    }
}

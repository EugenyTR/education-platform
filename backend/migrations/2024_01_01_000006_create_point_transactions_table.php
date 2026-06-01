<?php

declare(strict_types=1);

namespace App\Migrations;

class CreatePointTransactionsTable extends AbstractMigration
{
    public function up(): void
    {
        $this->exec("CREATE TABLE IF NOT EXISTS point_transactions (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            type ENUM(
                'video_watch',
                'correct_answer',
                'donation',
                'purchase',
                'shared_received',
                'shared_sent',
                'manual_admin',
                'achievement_bonus',
                'referral_bonus'
            ) NOT NULL,
            amount INT NOT NULL,
            description VARCHAR(500) NOT NULL,
            related_id VARCHAR(50) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_user_created (user_id, created_at),
            INDEX idx_type (type),
            CONSTRAINT fk_pt_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    }

    public function down(): void
    {
        $this->exec("DROP TABLE IF EXISTS point_transactions;");
    }
}

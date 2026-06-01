<?php

declare(strict_types=1);

namespace App\Migrations;

use App\Config\Database;
use PDO;

abstract class AbstractMigration
{
    protected PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    abstract public function up(): void;

    abstract public function down(): void;

    protected function exec(string $sql): void
    {
        $this->db->exec($sql);
    }
}

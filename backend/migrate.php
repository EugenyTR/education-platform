<?php

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

use App\Config\Database;

$db = Database::getConnection();

// Ensure migrations table exists
$db->exec("CREATE TABLE IF NOT EXISTS migrations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    migration VARCHAR(255) NOT NULL UNIQUE,
    batch INT UNSIGNED NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

$direction = $argv[1] ?? 'up';
$targetBatch = isset($argv[2]) ? (int)$argv[2] : null;

$migrationsDir = __DIR__ . '/migrations';
$files = glob($migrationsDir . '/*_*.php');
sort($files);

if ($direction === 'up') {
    $executed = $db->query("SELECT migration FROM migrations")->fetchAll(PDO::FETCH_COLUMN);
    $executed = array_flip($executed);

    $maxBatch = (int) $db->query("SELECT MAX(batch) FROM migrations")->fetchColumn();
    $batch = $maxBatch + 1;

    foreach ($files as $file) {
        $name = basename($file);
        if (isset($executed[$name])) {
            continue;
        }

        echo "Migrating: {$name}\n";
        require_once $file;

        $className = migrationClassName($name);
        $migration = new $className();
        $migration->up();

        $stmt = $db->prepare("INSERT INTO migrations (migration, batch) VALUES (?, ?)");
        $stmt->execute([$name, $batch]);

        echo "Migrated:  {$name}\n";
    }

    echo "\nDone.\n";
} elseif ($direction === 'down') {
    $where = $targetBatch !== null ? "WHERE batch = {$targetBatch}" : "WHERE batch = (SELECT MAX(batch) FROM migrations)";
    $rows = $db->query("SELECT migration FROM migrations {$where} ORDER BY id DESC")->fetchAll(PDO::FETCH_COLUMN);

    foreach ($rows as $name) {
        $file = $migrationsDir . '/' . $name;
        if (!file_exists($file)) {
            echo "Skip missing: {$name}\n";
            continue;
        }

        echo "Rolling back: {$name}\n";
        require_once $file;

        $className = migrationClassName($name);
        $migration = new $className();
        $migration->down();

        $stmt = $db->prepare("DELETE FROM migrations WHERE migration = ?");
        $stmt->execute([$name]);

        echo "Rolled back:  {$name}\n";
    }

    echo "\nDone.\n";
} elseif ($direction === 'status') {
    $executed = $db->query("SELECT migration, batch, executed_at FROM migrations ORDER BY id")->fetchAll(PDO::FETCH_ASSOC);
    echo "Executed migrations:\n";
    foreach ($executed as $row) {
        echo "  [batch {$row['batch']}] {$row['migration']} at {$row['executed_at']}\n";
    }
    echo "\n";
} else {
    echo "Usage: php migrate.php [up|down|status] [batch]\n";
}

function migrationClassName(string $filename): string
{
    $base = basename($filename, '.php');
    $parts = explode('_', $base);
    $class = '';
    foreach ($parts as $part) {
        $class .= ucfirst($part);
    }
    return "App\\Migrations\\{$class}";
}

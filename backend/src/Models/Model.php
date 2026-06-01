<?php

declare(strict_types=1);

namespace App\Models;

use App\Config\Database;
use PDO;

abstract class Model
{
    protected static string $table = '';
    protected static string $primaryKey = 'id';

    protected static function db(): PDO
    {
        return Database::getConnection();
    }

    public static function all(): array
    {
        $stmt = self::db()->query("SELECT * FROM " . static::$table . " ORDER BY " . static::$primaryKey . " DESC");
        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $stmt = self::db()->prepare("SELECT * FROM " . static::$table . " WHERE " . static::$primaryKey . " = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function create(array $data): int
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));

        $stmt = self::db()->prepare("INSERT INTO " . static::$table . " ({$columns}) VALUES ({$placeholders})");
        $stmt->execute(array_values($data));

        return (int) self::db()->lastInsertId();
    }

    public static function update(int $id, array $data): bool
    {
        $fields = [];
        $values = [];
        foreach ($data as $key => $value) {
            $fields[] = "{$key} = ?";
            $values[] = $value;
        }
        $values[] = $id;

        $stmt = self::db()->prepare("UPDATE " . static::$table . " SET " . implode(', ', $fields) . " WHERE " . static::$primaryKey . " = ?");
        return $stmt->execute($values);
    }

    public static function delete(int $id): bool
    {
        $stmt = self::db()->prepare("DELETE FROM " . static::$table . " WHERE " . static::$primaryKey . " = ?");
        return $stmt->execute([$id]);
    }
}

<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Middleware\AuthMiddleware;
use App\Models\User;
use App\Models\UserCourse;

class UserController extends BaseController
{
    public function index(): array
    {
        AuthMiddleware::handle(true);
        $users = User::all();
        foreach ($users as &$user) {
            unset($user['password_hash']);
        }
        return $this->json(['data' => $users]);
    }

    public function show(): array
    {
        AuthMiddleware::handle(true);
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/(\d+)$/', $path, $matches);
        $id = (int) ($matches[1] ?? 0);

        $user = User::find($id);
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        unset($user['password_hash']);

        // Stats
        $db = Database::getConnection();
        $coursesCompleted = (int) $db->query("SELECT COUNT(*) as cnt FROM user_courses WHERE user_id = {$id} AND is_completed = 1")->fetch()['cnt'];
        $coursesEnrolled = (int) $db->query("SELECT COUNT(*) as cnt FROM user_courses WHERE user_id = {$id}")->fetch()['cnt'];
        $certificates = (int) $db->query("SELECT COUNT(*) as cnt FROM certificates WHERE user_id = {$id} AND status = 'issued'")->fetch()['cnt'];
        $achievements = (int) $db->query("SELECT COUNT(*) as cnt FROM user_achievements WHERE user_id = {$id} AND status = 'earned'")->fetch()['cnt'];

        $user['stats'] = [
            'courses_completed' => $coursesCompleted,
            'courses_enrolled' => $coursesEnrolled,
            'certificates' => $certificates,
            'achievements' => $achievements,
        ];

        return $this->json(['data' => $user]);
    }

    public function courses(): array
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/(\d+)\/courses/', $path, $matches);
        $id = (int) ($matches[1] ?? 0);

        $items = UserCourse::findByUser($id);
        return $this->json(['data' => $items]);
    }

    public function progress(): array
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/(\d+)\/progress/', $path, $matches);
        $id = (int) ($matches[1] ?? 0);

        $db = Database::getConnection();
        $stmt = $db->prepare(
            "SELECT uc.*, c.title as course_name FROM user_courses uc
             JOIN courses c ON c.id = uc.course_id
             WHERE uc.user_id = ? ORDER BY uc.updated_at DESC"
        );
        $stmt->execute([$id]);
        $progress = $stmt->fetchAll();

        return $this->json(['data' => $progress]);
    }
}

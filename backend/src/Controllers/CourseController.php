<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Models\Course;

class CourseController extends BaseController
{
    public function index(): array
    {
        $courses = Course::all();
        return $this->json(['data' => $courses]);
    }

    public function show(): array
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/(\d+)$/', $path, $matches);
        $id = (int) ($matches[1] ?? 0);

        $course = Course::find($id);
        if (!$course) {
            return $this->json(['error' => 'Course not found'], 404);
        }

        $db = Database::getConnection();

        // Lessons
        $stmt = $db->prepare("SELECT id, title, order_index, video_url FROM lessons WHERE course_id = ? ORDER BY order_index");
        $stmt->execute([$id]);
        $course['lessons'] = $stmt->fetchAll();

        // Prerequisites
        $stmt = $db->prepare(
            "SELECT c.id, c.title FROM course_prerequisites cp
             JOIN courses c ON c.id = cp.prerequisite_course_id
             WHERE cp.course_id = ?"
        );
        $stmt->execute([$id]);
        $course['prerequisites'] = $stmt->fetchAll();

        // Rankings top 10
        $stmt = $db->prepare(
            "SELECT u.name, u.surname, cr.score, cr.time_spent FROM course_rankings cr
             JOIN users u ON u.id = cr.user_id
             WHERE cr.course_id = ? ORDER BY cr.score DESC, cr.time_spent ASC LIMIT 10"
        );
        $stmt->execute([$id]);
        $course['top_ranks'] = $stmt->fetchAll();

        // Total views (enrollments)
        $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM user_courses WHERE course_id = ?");
        $stmt->execute([$id]);
        $course['total_views'] = (int) $stmt->fetch()['cnt'];

        return $this->json(['data' => $course]);
    }
}

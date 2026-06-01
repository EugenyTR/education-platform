<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Certificate;

class CertificateController extends BaseController
{
    public function index(): array
    {
        $user = AuthMiddleware::handle();
        $items = Certificate::findByUser((int)$user['id']);
        return $this->json(['data' => $items]);
    }

    public function generate(): array
    {
        $user = AuthMiddleware::handle();
        $data = $this->input();

        if (empty($data['course_id'])) {
            return $this->json(['error' => 'course_id required'], 422);
        }

        $db = \App\Config\Database::getConnection();
        $stmt = $db->prepare(
            "SELECT * FROM certificates WHERE user_id = ? AND course_id = ? LIMIT 1"
        );
        $stmt->execute([$user['id'], $data['course_id']]);
        $existing = $stmt->fetch();

        if ($existing && $existing['status'] === 'issued') {
            return $this->json(['error' => 'Certificate already issued'], 409);
        }

        $number = Certificate::generateNumber();
        $score = (int) ($data['score'] ?? 80);

        if ($existing) {
            $db->prepare(
                "UPDATE certificates SET status = 'issued', certificate_number = ?, score = ?, download_url = ?, email_sent = 1, completion_date = CURDATE()
                 WHERE id = ?"
            )->execute([$number, $score, '/certificates/' . $number . '.pdf', $existing['id']]);
            $id = $existing['id'];
        } else {
            $id = Certificate::create([
                'user_id' => $user['id'],
                'course_id' => $data['course_id'],
                'certificate_number' => $number,
                'score' => $score,
                'completion_date' => date('Y-m-d'),
                'status' => 'issued',
                'download_url' => '/certificates/' . $number . '.pdf',
                'email_sent' => 1,
                'is_base_course' => (int) ($data['is_base_course'] ?? 0),
            ]);
        }

        return $this->json(['success' => true, 'certificate_id' => $id, 'number' => $number]);
    }
}

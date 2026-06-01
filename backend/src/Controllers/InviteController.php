<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Middleware\AuthMiddleware;
use App\Models\Invite;

class InviteController extends BaseController
{
    public function myInvites(): array
    {
        $user = AuthMiddleware::handle();
        $items = Invite::findByReferrer((int)$user['id']);
        $count = Invite::countByReferrer((int)$user['id']);
        return $this->json(['data' => $items, 'invited_count' => $count]);
    }

    public function create(): array
    {
        $user = AuthMiddleware::handle();
        $code = strtoupper(substr(md5($user['id'] . time() . random_bytes(4)), 0, 10));

        $id = Invite::create([
            'code' => $code,
            'referrer_user_id' => $user['id'],
        ]);

        return $this->json(['success' => true, 'code' => $code, 'invite_id' => $id]);
    }

    public function show(): array
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/(\w+)$/', $path, $matches);
        $code = $matches[1] ?? '';

        $invite = Invite::findByCode($code);
        if (!$invite) {
            return $this->json(['error' => 'Invite not found'], 404);
        }

        $referrer = \App\Models\User::find((int)$invite['referrer_user_id']);
        if ($referrer) {
            unset($referrer['password_hash']);
        }

        return $this->json(['invite' => $invite, 'referrer' => $referrer]);
    }

    public function useInvite(): array
    {
        $data = $this->input();
        if (empty($data['code']) || empty($data['user_id'])) {
            return $this->json(['error' => 'code and user_id required'], 422);
        }

        $invite = Invite::findByCode($data['code']);
        if (!$invite) {
            return $this->json(['error' => 'Invite not found'], 404);
        }
        if ($invite['invited_user_id']) {
            return $this->json(['error' => 'Invite already used'], 409);
        }

        $db = Database::getConnection();
        $db->prepare(
            "UPDATE invites SET invited_user_id = ?, used_at = NOW() WHERE id = ?"
        )->execute([$data['user_id'], $invite['id']]);

        // Award referrer bonus points
        $db->prepare(
            "INSERT INTO point_transactions (user_id, type, amount, description, related_id)
             VALUES (?, 'referral_bonus', 100, 'Бонус за приглашение', ?)"
        )->execute([$invite['referrer_user_id'], (string)$data['user_id']]);

        $db->prepare("UPDATE users SET total_points = total_points + 100 WHERE id = ?")
            ->execute([$invite['referrer_user_id']]);

        return $this->json(['success' => true]);
    }
}

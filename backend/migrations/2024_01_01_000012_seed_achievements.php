<?php

declare(strict_types=1);

namespace App\Migrations;

class SeedAchievements extends AbstractMigration
{
    public function up(): void
    {
        $achievements = [
            [
                'title' => 'Первые шаги',
                'description' => 'Завершите свой первый курс полностью',
                'icon' => '🎯',
                'points' => 50,
                'type' => 'course_completion',
                'condition_type' => 'courses_completed',
                'target' => 1,
            ],
            [
                'title' => 'Знаток',
                'description' => 'Завершите 5 курсов с оценкой выше 80%',
                'icon' => '📚',
                'points' => 150,
                'type' => 'course_completion',
                'condition_type' => 'courses_completed_high_score',
                'target' => 5,
            ],
            [
                'title' => 'Мастер обучения',
                'description' => 'Завершите 10 курсов и получите средний балл 85+',
                'icon' => '🏆',
                'points' => 300,
                'type' => 'course_completion',
                'condition_type' => 'courses_completed_master',
                'target' => 10,
            ],
            [
                'title' => 'Полная регистрация',
                'description' => 'Заполните все поля в профиле',
                'icon' => '✅',
                'points' => 25,
                'type' => 'profile',
                'condition_type' => 'profile_complete',
                'target' => 100,
            ],
            [
                'title' => 'Социальная активность',
                'description' => 'Подпишитесь на все наши социальные сети',
                'icon' => '🌐',
                'points' => 75,
                'type' => 'social',
                'condition_type' => 'social_subscriptions',
                'target' => 4,
            ],
            [
                'title' => 'Пригласи друга',
                'description' => 'Пригласите 1 друга на платформу',
                'icon' => '👤',
                'points' => 100,
                'type' => 'referral',
                'condition_type' => 'friends_invited',
                'target' => 1,
            ],
            [
                'title' => 'Командный игрок',
                'description' => 'Пригласите 3 друзей на платформу',
                'icon' => '👥',
                'points' => 250,
                'type' => 'referral',
                'condition_type' => 'friends_invited',
                'target' => 3,
            ],
            [
                'title' => 'Амбассадор',
                'description' => 'Пригласите 10 друзей на платформу',
                'icon' => '🌟',
                'points' => 500,
                'type' => 'referral',
                'condition_type' => 'friends_invited',
                'target' => 10,
            ],
            [
                'title' => 'Инвестор в знания',
                'description' => 'Потратьте 10,000 рублей на курсы и донаты',
                'icon' => '💎',
                'points' => 200,
                'type' => 'purchase',
                'condition_type' => 'total_spent',
                'target' => 10000,
            ],
            [
                'title' => 'Щедрый покровитель',
                'description' => 'Потратьте 25,000 рублей на курсы и донаты',
                'icon' => '👑',
                'points' => 400,
                'type' => 'purchase',
                'condition_type' => 'total_spent',
                'target' => 25000,
            ],
        ];

        $stmt = $this->db->prepare(
            "INSERT INTO achievements
            (title, description, icon, points, type, condition_type, target)
            VALUES
            (:title, :description, :icon, :points, :type, :condition_type, :target)
            ON DUPLICATE KEY UPDATE title = title"
        );

        foreach ($achievements as $a) {
            $stmt->execute($a);
        }
    }

    public function down(): void
    {
        $this->exec("DELETE FROM achievements WHERE condition_type IN (
            'courses_completed', 'courses_completed_high_score', 'courses_completed_master',
            'profile_complete', 'social_subscriptions', 'friends_invited', 'total_spent'
        );");
    }
}

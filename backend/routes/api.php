<?php

declare(strict_types=1);

use App\Controllers\AuthController;
use App\Controllers\AchievementController;
use App\Controllers\CertificateController;
use App\Controllers\CourseController;
use App\Controllers\InviteController;
use App\Controllers\PointsController;
use App\Controllers\UserController;

/** @var App\Router $router */

$router->get('/api/health', function () {
    return ['status' => 'ok', 'service' => 'edu-platform-backend'];
});

// Auth
$router->post('/api/auth/register', [AuthController::class, 'register']);
$router->post('/api/auth/login', [AuthController::class, 'login']);
$router->get('/api/auth/me', [AuthController::class, 'me']);

// Courses
$router->get('/api/courses', [CourseController::class, 'index']);
$router->get('/api/courses/\d+', [CourseController::class, 'show']);

// Users
$router->get('/api/users', [UserController::class, 'index']);
$router->get('/api/users/\d+', [UserController::class, 'show']);
$router->get('/api/users/\d+/courses', [UserController::class, 'courses']);
$router->get('/api/users/\d+/progress', [UserController::class, 'progress']);

// Achievements
$router->get('/api/achievements', [AchievementController::class, 'all']);
$router->get('/api/my/achievements', [AchievementController::class, 'index']);
$router->post('/api/my/achievements/progress', [AchievementController::class, 'updateProgress']);

// Points
$router->get('/api/my/points', [PointsController::class, 'balance']);
$router->get('/api/my/points/history', [PointsController::class, 'history']);
$router->post('/api/points/share', [PointsController::class, 'share']);
$router->post('/api/admin/points', [PointsController::class, 'adminAdd']);
$router->post('/api/admin/gift-course', [PointsController::class, 'adminGiftCourse']);

// Certificates
$router->get('/api/my/certificates', [CertificateController::class, 'index']);
$router->post('/api/certificates/generate', [CertificateController::class, 'generate']);

// Invites
$router->get('/api/my/invites', [InviteController::class, 'myInvites']);
$router->post('/api/invites', [InviteController::class, 'create']);
$router->get('/api/invites/\w+', [InviteController::class, 'show']);
$router->post('/api/invites/use', [InviteController::class, 'useInvite']);

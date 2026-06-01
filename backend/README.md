# Educational Platform — PHP Backend

MySQL-powered backend with migrations, models, and a lightweight API router.

## Requirements

- PHP >= 8.1
- MySQL >= 5.7 / MariaDB >= 10.3
- Composer

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Create the MySQL database**
   ```sql
   CREATE DATABASE edu_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Run migrations**
   ```bash
   php migrate.php up
   ```

5. **Check migration status**
   ```bash
   php migrate.php status
   ```

6. **Rollback last batch**
   ```bash
   php migrate.php down
   ```

## Run the API

Use the PHP built-in server during development:

```bash
cd backend/public
php -S localhost:8000
```

Or configure your web server (Nginx/Apache) to point `DOCUMENT_ROOT` to `backend/public`.

## Production Deployment (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/backend/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\. {
        deny all;
    }
}
```

## API Endpoints

### Public

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/api/health`      | Health check         |
| POST   | `/api/auth/register` | Register user      |
| POST   | `/api/auth/login`  | Login user           |
| GET    | `/api/courses`     | List courses         |
| GET    | `/api/courses/{id}`| Course details       |
| GET    | `/api/invites/{code}` | Get invite info   |

### Authenticated (requires Bearer token)

| Method | Endpoint                        | Description          |
|--------|---------------------------------|----------------------|
| GET    | `/api/auth/me`                  | Current user         |
| GET    | `/api/my/achievements`          | My achievements      |
| POST   | `/api/my/achievements/progress` | Update achievement   |
| GET    | `/api/my/points`                | Balance              |
| GET    | `/api/my/points/history`        | Points history       |
| POST   | `/api/points/share`             | Share points         |
| GET    | `/api/my/certificates`          | My certificates      |
| POST   | `/api/certificates/generate`    | Generate certificate |
| GET    | `/api/my/invites`               | My invites           |
| POST   | `/api/invites`                  | Create invite        |
| POST   | `/api/invites/use`              | Use invite code      |

### Admin only

| Method | Endpoint                      | Description          |
|--------|-------------------------------|----------------------|
| GET    | `/api/users`                  | List all users       |
| GET    | `/api/users/{id}`             | User details         |
| GET    | `/api/users/{id}/courses`     | User courses         |
| GET    | `/api/users/{id}/progress`    | User progress        |
| POST   | `/api/admin/points`           | Add points to user   |
| POST   | `/api/admin/gift-course`      | Gift course to user  |

## Database Schema

### Tables

- **users** — platform users with roles (`student`, `admin`)
- **courses** — available courses with pricing and metadata
- **lessons** — lessons belonging to a course
- **course_prerequisites** — free-access prerequisites between courses
- **user_courses** — enrollments, progress, and completion state
- **point_transactions** — all point movements (video watch, purchases, transfers, admin actions)
- **achievements** — platform achievements catalog
- **user_achievements** — per-user achievement progress and unlock state
- **certificates** — generated certificates per course/user
- **invites** — referral codes and their usage
- **course_rankings** — leaderboard scores per course

### Achievements Seeded by Default

The migration `2024_01_01_000012_seed_achievements.php` inserts 10 achievements matching the original frontend data:
- First steps, Knowledge seeker, Master of learning
- Full registration, Social activity
- Friend inviter (1 / 3 / 10 friends)
- Big spender, Generous supporter

## Project Structure

```
backend/
├── config/
│   └── database.php         # PDO connection singleton
├── migrations/
│   ├── AbstractMigration.php
│   ├── 2024_01_01_000001_create_users_table.php
│   ├── 2024_01_01_000002_create_courses_table.php
│   ├── ...
│   └── 2024_01_01_000012_seed_achievements.php
├── public/
│   ├── index.php            # Front controller / API entry
│   └── .htaccess            # Apache rewrite rules
├── routes/
│   └── api.php              # Route definitions
├── src/
│   ├── Router.php
│   ├── Middleware/
│   │   └── AuthMiddleware.php
│   ├── Controllers/
│   │   ├── BaseController.php
│   │   ├── AuthController.php
│   │   ├── AchievementController.php
│   │   ├── CertificateController.php
│   │   ├── CourseController.php
│   │   ├── InviteController.php
│   │   ├── PointsController.php
│   │   └── UserController.php
│   └── Models/
│       ├── Model.php        # Base active-record style model
│       ├── Achievement.php
│       ├── Certificate.php
│       ├── Course.php
│       ├── Invite.php
│       ├── PointTransaction.php
│       ├── User.php
│       ├── UserAchievement.php
│       └── UserCourse.php
├── migrate.php              # CLI migration runner
├── composer.json
├── .env.example
└── README.md
```

## Next Steps

- Add more controllers: lessons, quizzes, payments
- Add request validation and sanitization
- Add rate limiting and security headers
- Integrate with the HTML/JS frontend (already connected)


# Образовательная платформа

Полная переписанная платформа на PHP (бэкенд) + чистый HTML/CSS/JS (фронтенд) с MySQL.

## Структура проекта

```
.
├── backend/              # PHP 8.1+ API
│   ├── config/          # Конфигурация (database.php)
│   ├── migrations/      # 12 миграций + сиды
│   ├── public/          # Точка входа (index.php)
│   ├── routes/          # API маршруты
│   ├── src/             # Контроллеры, модели, middleware
│   ├── composer.json
│   └── README.md
│
├── frontend/            # Чистый HTML/CSS/JS
│   ├── *.html          # Страницы (index, login, register, etc.)
│   ├── admin/          # Админ-панель
│   ├── css/style.css   # Стили
│   ├── js/             # API клиент, auth, логика страниц
│   └── README.md
│
└── PROJECT_README.md    # Этот файл
```

## Быстрый старт

### 1. Бэкенд (PHP + MySQL)

```bash
# Установка зависимостей
cd backend
composer install

# Настройка окружения
cp .env.example .env
# Отредактируй .env:
# DB_HOST=127.0.0.1
# DB_DATABASE=edu_platform
# DB_USERNAME=root
# DB_PASSWORD=

# Создание базы данных (одноразово)
mysql -u root -p -e "CREATE DATABASE edu_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Запуск миграций
php migrate.php up

# Запуск сервера (разработка)
cd public
php -S localhost:8000
```

### 2. Фронтенд

```bash
# Запуск сервера (разработка)
cd frontend
php -S localhost:3000
```

Открой: http://localhost:3000

## API Endpoints

### Публичные
| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/health` | Проверка работоспособности |
| POST | `/api/auth/register` | Регистрация |
| POST | `/api/auth/login` | Вход |
| GET | `/api/courses` | Список курсов |
| GET | `/api/courses/{id}` | Детали курса |

### Авторизованные (Bearer token)
| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/my/achievements` | Мои достижения |
| GET | `/api/my/points` | Баланс баллов |
| GET | `/api/my/points/history` | История баллов |
| GET | `/api/my/certificates` | Мои сертификаты |
| GET | `/api/my/invites` | Мои приглашения |
| POST | `/api/invites` | Создать приглашение |
| POST | `/api/points/share` | Отправить баллы |

### Администратор
| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/users` | Все пользователи |
| POST | `/api/admin/points` | Начислить баллы |
| POST | `/api/admin/gift-course` | Подарить курс |

## База данных

### Таблицы
| Таблица | Описание |
|---------|----------|
| `users` | Пользователи (студенты, админы) |
| `courses` | Курсы с ценами и скидками |
| `lessons` | Уроки внутри курсов |
| `course_prerequisites` | Условия доступа к курсам |
| `user_courses` | Записи на курсы, прогресс |
| `point_transactions` | История баллов |
| `achievements` | Каталог достижений |
| `user_achievements` | Прогресс достижений |
| `certificates` | Выданные сертификаты |
| `invites` | Реферальные коды |
| `course_rankings` | Рейтинги по курсам |

### Миграции
```
2024_01_01_000001_create_users_table
2024_01_01_000002_create_courses_table
2024_01_01_000003_create_lessons_table
2024_01_01_000004_create_course_prerequisites_table
2024_01_01_000005_create_user_courses_table
2024_01_01_000006_create_point_transactions_table
2024_01_01_000007_create_achievements_table
2024_01_01_000008_create_user_achievements_table
2024_01_01_000009_create_certificates_table
2024_01_01_000010_create_invites_table
2024_01_01_000011_create_course_rankings_table
2024_01_01_000012_seed_achievements
```

## Фронтенд страницы

| Страница | URL | Описание |
|----------|-----|----------|
| Главная | `/index.html` | Лендинг, курсы |
| Вход | `/login.html` | Форма входа |
| Регистрация | `/register.html` | Регистрация |
| Курсы | `/courses.html` | Все курсы |
| Курс | `/course-detail.html?id=X` | Детали курса |
| Профиль | `/profile.html` | Профиль пользователя |
| Достижения | `/achievements.html` | Достижения и баллы |
| Сертификаты | `/certificates.html` | Мои сертификаты |
| Баллы | `/points.html` | История и перевод |
| Приглашение | `/invite.html?code=XXX` | Реферальная ссылка |
| Админка | `/admin/` | Панель администратора |

## Особенности

### Бэкенд
- ✅ Чистый PHP 8.1+ без фреймворков
- ✅ PDO + MySQL с миграциями
- ✅ Легковесный роутер с regex-паттернами
- ✅ Middleware для аутентификации и админа
- ✅ JWT-подобные токены (без внешних библиотек)
- ✅ 8 контроллеров (Auth, Courses, Users, Achievements, Points, Certificates, Invites)
- ✅ 10 моделей (Active Record паттерн)

### Фронтенд
- ✅ Чистый HTML/CSS/JS без фреймворков
- ✅ Адаптивный дизайн
- ✅ API клиент с fetch
- ✅ Управление авторизацией (localStorage)
- ✅ Роутинг на стороне клиента (простой)
- ✅ Обработка ошибок и лоадеры

## Деплой

### Production (Nginx + PHP-FPM)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Фронтенд
    root /var/www/frontend;
    index index.html;
    
    location /api/ {
        # Перенаправление на бэкенд
        proxy_pass http://127.0.0.1:9000;
    }
    
    location /admin/ {
        root /var/www/frontend;
        index index.html;
    }
}

# Бэкенд (отдельный сервер или PHP-FPM)
server {
    listen 127.0.0.1:9000;
    root /var/www/backend/public;
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        include fastcgi_params;
    }
}
```

## Разработка

### Добавление новой сущности

1. **Миграция**: `backend/migrations/2024_01_01_0000XX_create_X_table.php`
2. **Модель**: `backend/src/Models/X.php`
3. **Контроллер**: `backend/src/Controllers/XController.php`
4. **Маршрут**: `backend/routes/api.php`
5. **Страница**: `frontend/X.html` + `frontend/js/x.js`

### Команды миграций
```bash
php migrate.php up          # Накатить все
php migrate.php down        # Откатить последнюю
php migrate.php status      # Статус
```

## Лицензия

Частный проект.

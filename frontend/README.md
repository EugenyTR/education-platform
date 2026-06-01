# Frontend — Образовательная платформа

Чистый HTML/CSS/JS фронтенд, подключённый к PHP API.

## Структура

```
frontend/
├── index.html              # Главная страница
├── login.html              # Вход
├── register.html           # Регистрация
├── courses.html            # Список курсов
├── course-detail.html      # Детали курса
├── profile.html            # Профиль пользователя
├── achievements.html       # Достижения
├── certificates.html       # Сертификаты
├── points.html             # Баллы
├── invite.html             # Реферальное приглашение
├── admin/
│   ├── index.html          # Админ панель
│   ├── users.html          # Управление пользователями
│   └── points.html         # Управление баллами
├── css/
│   └── style.css           # Основные стили
└── js/
    ├── api.js              # API клиент
    ├── auth.js             # Авторизация
    ├── app.js              # Общая логика
    ├── login.js            # Логика входа
    ├── register.js         # Логика регистрации
    ├── courses.js          # Список курсов
    ├── course-detail.js    # Детали курса
    ├── profile.js          # Профиль
    ├── achievements.js     # Достижения
    ├── certificates.js     # Сертификаты
    ├── points.js           # Баллы
    ├── invite.js           # Приглашения
    └── admin/
        ├── admin.js        # Админка общая
        ├── users.js        # Пользователи
        └── points.js       # Баллы (админ)
```

## Запуск

1. **Запустите бэкенд** (см. `backend/README.md`):
   ```bash
   cd backend
   composer install
   cp .env.example .env
   # Настройте .env
   php migrate.php up
   cd public && php -S localhost:8000
   ```

2. **Откройте фронтенд**:
   - Через PHP сервер: `cd frontend && php -S localhost:3000`
   - Или просто откройте `index.html` в браузере (может потребоваться CORS-конфигурация)

## Настройка API

По умолчанию `js/api.js` указывает на `http://localhost:8000/api`. Измените `API_BASE` при необходимости.

## Страницы

| Страница | Описание |
|---|---|
| `/index.html` | Главная, список курсов |
| `/login.html` | Вход в систему |
| `/register.html` | Регистрация нового пользователя |
| `/courses.html` | Все курсы |
| `/course-detail.html?id=X` | Детали курса |
| `/profile.html` | Профиль пользователя |
| `/achievements.html` | Достижения |
| `/certificates.html` | Сертификаты |
| `/points.html` | Баллы и история |
| `/invite.html?code=XXX` | Реферальное приглашение |
| `/admin/` | Админ панель (только admin) |

## Авторизация

- Токен сохраняется в `localStorage`
- `auth.js` управляет UI в зависимости от состояния входа
- `requireAuth()` перенаправляет на login при отсутствии токена
- `requireAdmin()` проверяет роль администратора

## Статусы

Все страницы показывают лоадеры при загрузке и обработчики ошибок.
Данные подтягиваются через `api.js` из PHP бэкенда.

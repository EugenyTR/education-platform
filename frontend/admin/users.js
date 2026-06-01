document.addEventListener('DOMContentLoaded', function() {
    requireAdmin();
    loadUsers();
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        logout();
        window.location.href = '../index.html';
    });
});

async function loadUsers() {
    try {
        const users = await api.getUsers();
        renderUsers(users);
    } catch (error) {
        document.getElementById('usersList').innerHTML = '<p>Ошибка загрузки пользователей</p>';
    }
}

function renderUsers(users) {
    const container = document.getElementById('usersList');
    
    if (users.length === 0) {
        container.innerHTML = '<p>Пользователей нет</p>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-item">
            <div class="user-info">
                <h3>${escapeHtml(user.name)} ${escapeHtml(user.surname)}</h3>
                <p>${escapeHtml(user.email)}</p>
                <p>Роль: ${user.role === 'admin' ? 'Администратор' : 'Студент'}</p>
                <p>Статус: ${formatStatus(user.status)}</p>
                <p>Баллов: ${user.total_points || 0}</p>
            </div>
            <div class="user-actions">
                <a href="user-detail.html?id=${user.id}" class="btn btn-outline">Подробнее</a>
            </div>
        </div>
    `).join('');
}

function formatStatus(status) {
    const statuses = {
        active: 'Активен',
        premium: 'Премиум',
        inactive: 'Неактивен'
    };
    return statuses[status] || status;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

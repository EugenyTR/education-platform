document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProfile();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});

async function loadProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const user = await api.me();
        renderProfile(user.user);
    } catch (error) {
        document.getElementById('profileContent').innerHTML = '<p>Ошибка загрузки профиля</p>';
    }
}

function renderProfile(user) {
    const container = document.getElementById('profileContent');
    
    container.innerHTML = `
        <div class="profile-header">
            <h2>${escapeHtml(user.name)} ${escapeHtml(user.surname)}${user.patronymic ? ' ' + escapeHtml(user.patronymic) : ''}</h2>
            <p class="profile-email">${escapeHtml(user.email)}</p>
            ${user.nickname ? `<p class="profile-nickname">@${escapeHtml(user.nickname)}</p>` : ''}
            <p class="profile-role">Роль: ${user.role === 'admin' ? 'Администратор' : 'Студент'}</p>
            <p class="profile-status">Статус: ${formatStatus(user.status)}</p>
        </div>
        
        <div class="profile-stats">
            <div class="stat-item">
                <h3>Баллов</h3>
                <p>${user.total_points || 0}</p>
            </div>
            <div class="stat-item">
                <h3>Курсов</h3>
                <p>-</p>
            </div>
            <div class="stat-item">
                <h3>Сертификатов</h3>
                <p>-</p>
            </div>
            <div class="stat-item">
                <h3>Достижений</h3>
                <p>-</p>
            </div>
        </div>
    `;
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

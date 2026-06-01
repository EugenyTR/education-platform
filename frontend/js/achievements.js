document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadAchievements();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});

async function loadAchievements() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const [myAchievements, allAchievements] = await Promise.all([
            api.getMyAchievements(),
            api.getAllAchievements()
        ]);
        
        renderStats(myAchievements);
        renderAchievements(myAchievements, allAchievements);
    } catch (error) {
        document.getElementById('achievementsList').innerHTML = '<p>Ошибка загрузки достижений</p>';
    }
}

function renderStats(achievements) {
    const earned = achievements.filter(a => a.status === 'earned').length;
    const inProgress = achievements.filter(a => a.status === 'in_progress').length;
    const locked = achievements.filter(a => a.status === 'locked').length;
    const totalPoints = achievements
        .filter(a => a.status === 'earned')
        .reduce((sum, a) => sum + (parseInt(a.points) || 0), 0);
    
    const container = document.getElementById('achievementsStats');
    container.innerHTML = `
        <div class="stat-card">
            <h3>${earned}</h3>
            <p>Получено</p>
        </div>
        <div class="stat-card">
            <h3>${inProgress}</h3>
            <p>В процессе</p>
        </div>
        <div class="stat-card">
            <h3>${locked}</h3>
            <p>Заблокировано</p>
        </div>
        <div class="stat-card">
            <h3>${totalPoints}</h3>
            <p>Баллов получено</p>
        </div>
    `;
}

function renderAchievements(myAchievements, allAchievements) {
    const container = document.getElementById('achievementsList');
    
    if (myAchievements.length === 0) {
        container.innerHTML = '<p>Достижения пока недоступны</p>';
        return;
    }
    
    container.innerHTML = myAchievements.map(achievement => `
        <div class="achievement-card ${achievement.status === 'earned' ? 'earned' : ''}">
            <div class="achievement-icon">${escapeHtml(achievement.icon)}</div>
            <h3>${escapeHtml(achievement.title)}</h3>
            <p>${escapeHtml(achievement.description)}</p>
            <div class="achievement-points">+${achievement.points} баллов</div>
            ${achievement.status !== 'earned' ? `
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(achievement.current_progress / achievement.target) * 100}%"></div>
                    </div>
                    <p>${achievement.current_progress} / ${achievement.target}</p>
                </div>
            ` : `
                <p class="earned-date">Получено: ${formatDate(achievement.earned_at)}</p>
            `}
        </div>
    `).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

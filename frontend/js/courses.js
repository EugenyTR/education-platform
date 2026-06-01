document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadCourses();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});

async function loadCourses() {
    try {
        const courses = await api.getCourses();
        const container = document.getElementById('coursesList');
        
        if (courses.length === 0) {
            container.innerHTML = '<p>Курсы пока не добавлены.</p>';
            return;
        }
        
        container.innerHTML = courses.map(course => `
            <div class="course-card" onclick="window.location.href='course-detail.html?id=${course.id}'">
                <div class="course-image">
                    <span class="course-placeholder">📖</span>
                </div>
                <div class="course-content">
                    <h3>${escapeHtml(course.title)}</h3>
                    <p>${escapeHtml(course.description ? course.description.substring(0, 120) + '...' : 'Описание недоступно')}</p>
                    <div class="course-meta">
                        <span>👨‍🏫 ${escapeHtml(course.instructor)}</span>
                        <span>⏱️ ${escapeHtml(course.duration)}</span>
                    </div>
                    <div class="course-price">
                        ${formatPrice(course.discount_price || course.price)}
                        ${course.discount_price && course.has_discount ? `<span class="old-price">${formatPrice(course.price)}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        document.getElementById('coursesList').innerHTML = '<p>Ошибка загрузки курсов</p>';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

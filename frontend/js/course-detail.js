document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadCourse();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});

async function loadCourse() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        document.getElementById('courseDetail').innerHTML = '<p>Курс не найден</p>';
        return;
    }
    
    try {
        const course = await api.getCourse(id);
        renderCourse(course);
    } catch (error) {
        document.getElementById('courseDetail').innerHTML = '<p>Ошибка загрузки курса</p>';
    }
}

function renderCourse(course) {
    const container = document.getElementById('courseDetail');
    
    container.innerHTML = `
        <div class="course-header">
            <h1>${escapeHtml(course.title)}</h1>
            <p class="course-description">${escapeHtml(course.description)}</p>
            <div class="course-meta">
                <span>👨‍🏫 ${escapeHtml(course.instructor)}</span>
                <span>⏱️ ${escapeHtml(course.duration)}</span>
                <span>📚 ${course.lessons_count || 0} уроков</span>
            </div>
            <div class="course-price">
                ${formatPrice(course.discount_price || course.price)}
                ${course.discount_price && course.has_discount ? `<span class="old-price">${formatPrice(course.price)}</span>` : ''}
            </div>
        </div>
        
        ${course.prerequisites && course.prerequisites.length > 0 ? `
            <div class="course-prerequisites">
                <h2>Условия бесплатного доступа</h2>
                <ul>
                    ${course.prerequisites.map(p => `<li>${escapeHtml(p.title)}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        ${course.lessons && course.lessons.length > 0 ? `
            <div class="course-lessons">
                <h2>Программа курса</h2>
                <ul class="lessons-list">
                    ${course.lessons.map(lesson => `
                        <li>
                            <span class="lesson-number">${lesson.order_index}</span>
                            <span class="lesson-title">${escapeHtml(lesson.title)}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : ''}
        
        ${course.top_ranks && course.top_ranks.length > 0 ? `
            <div class="course-rankings">
                <h2>Рейтинг участников</h2>
                <div class="rankings-list">
                    ${course.top_ranks.slice(0, 10).map((rank, i) => `
                        <div class="rank-item">
                            <span class="rank-number">#${i + 1}</span>
                            <span class="rank-name">${escapeHtml(rank.name)} ${escapeHtml(rank.surname)}</span>
                            <span class="rank-score">${rank.score}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="course-actions">
            <button class="btn btn-primary btn-lg">Купить курс</button>
        </div>
    `;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

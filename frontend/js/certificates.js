document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadCertificates();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});

async function loadCertificates() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const certificates = await api.getMyCertificates();
        renderCertificates(certificates);
    } catch (error) {
        document.getElementById('certificatesList').innerHTML = '<p>Ошибка загрузки сертификатов</p>';
    }
}

function renderCertificates(certificates) {
    const container = document.getElementById('certificatesList');
    
    if (certificates.length === 0) {
        container.innerHTML = '<p>У вас пока нет сертификатов</p>';
        return;
    }
    
    container.innerHTML = certificates.map(cert => `
        <div class="certificate-card">
            <h3>${escapeHtml(cert.course_title)}</h3>
            <p class="certificate-number">Сертификат №${escapeHtml(cert.certificate_number)}</p>
            <p>Балл: ${cert.score}%</p>
            <p>Дата: ${formatDate(cert.completion_date)}</p>
            <p>Статус: ${cert.status === 'issued' ? 'Выдан' : 'Доступен'}</p>
            ${cert.download_url ? `
                <button class="btn btn-primary" onclick="downloadCertificate('${cert.download_url}')">Скачать</button>
            ` : ''}
        </div>
    `).join('');
}

function downloadCertificate(url) {
    window.open(url, '_blank');
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

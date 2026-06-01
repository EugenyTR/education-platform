document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code') || window.location.pathname.split('/').pop();
    
    if (code) {
        loadInvite(code);
    } else {
        document.getElementById('inviteContent').innerHTML = '<p>Неверная ссылка приглашения</p>';
    }
});

async function loadInvite(code) {
    try {
        const result = await api.getInvite(code);
        renderInvite(result);
    } catch (error) {
        document.getElementById('inviteContent').innerHTML = '<p>Приглашение не найдено</p>';
    }
}

function renderInvite(data) {
    const container = document.getElementById('inviteContent');
    const invite = data.invite;
    const referrer = data.referrer;
    
    container.innerHTML = `
        <div class="invite-info">
            <p><strong>Пригласил:</strong> ${escapeHtml(referrer ? `${referrer.name} ${referrer.surname}` : 'Неизвестно')}</p>
            <p>Получите первый курс бесплатно!</p>
        </div>
    `;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

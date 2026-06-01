document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadPoints();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
    
    document.getElementById('shareBtn')?.addEventListener('click', function() {
        showShareDialog();
    });
});

async function loadPoints() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const [balance, transactions] = await Promise.all([
            api.getBalance(),
            api.getPointsHistory()
        ]);
        
        document.getElementById('balance').textContent = new Intl.NumberFormat('ru-RU').format(balance);
        renderTransactions(transactions);
    } catch (error) {
        document.getElementById('balance').textContent = 'Ошибка';
        document.getElementById('transactionsList').innerHTML = '<p>Ошибка загрузки истории</p>';
    }
}

function renderTransactions(transactions) {
    const container = document.getElementById('transactionsList');
    
    if (transactions.length === 0) {
        container.innerHTML = '<p>История пуста</p>';
        return;
    }
    
    container.innerHTML = transactions.map(tx => `
        <div class="transaction-item">
            <div>
                <p><strong>${formatTransactionType(tx.type)}</strong></p>
                <p class="transaction-desc">${escapeHtml(tx.description)}</p>
                <p class="transaction-date">${formatDateTime(tx.created_at)}</p>
            </div>
            <div class="transaction-amount ${tx.amount >= 0 ? 'positive' : 'negative'}">
                ${tx.amount >= 0 ? '+' : ''}${tx.amount}
            </div>
        </div>
    `).join('');
}

function formatTransactionType(type) {
    const types = {
        video_watch: 'Просмотр видео',
        correct_answer: 'Правильный ответ',
        donation: 'Донат',
        purchase: 'Покупка',
        shared_received: 'Получено',
        shared_sent: 'Отправлено',
        manual_admin: 'Начислено администратором',
        achievement_bonus: 'Достижение',
        referral_bonus: 'Реферальный бонус'
    };
    return types[type] || type;
}

function showShareDialog() {
    const recipientId = prompt('ID получателя:');
    if (!recipientId) return;
    
    const amount = prompt('Количество баллов:');
    if (!amount || parseInt(amount) <= 0) return;
    
    api.sharePoints(recipientId, parseInt(amount))
        .then(() => {
            alert('Баллы успешно отправлены!');
            loadPoints();
        })
        .catch(err => {
            alert('Ошибка: ' + err.message);
        });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

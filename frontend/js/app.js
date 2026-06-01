// Main app initialization
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});

function formatPrice(price) {
    if (!price || price === 0) return 'Бесплатно';
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ru-RU');
}

function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('ru-RU');
}

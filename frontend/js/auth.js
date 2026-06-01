let currentUser = null;

function updateAuthUI() {
    const token = localStorage.getItem('token');
    const authOnlyElements = document.querySelectorAll('.auth-only');
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (token) {
        currentUser = JSON.parse(localStorage.getItem('user') || 'null');
        authOnlyElements.forEach(el => el.classList.remove('hidden'));
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';

        if (currentUser && currentUser.role === 'admin') {
            adminOnlyElements.forEach(el => el.classList.remove('hidden'));
        }
    } else {
        authOnlyElements.forEach(el => el.classList.add('hidden'));
        adminOnlyElements.forEach(el => el.classList.add('hidden'));
        
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    updateAuthUI();
}

async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const user = await api.me();
        if (user && user.user) {
            currentUser = user.user;
            localStorage.setItem('user', JSON.stringify(user.user));
            updateAuthUI();
            return true;
        }
    } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        updateAuthUI();
        return false;
    }
    return false;
}

function requireAuth() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function requireAdmin() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
        alert('Доступ запрещён. Требуется роль администратора.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

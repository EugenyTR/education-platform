document.addEventListener('DOMContentLoaded', function() {
    requireAdmin();
    loadStats();
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        logout();
        window.location.href = '../index.html';
    });
});

async function loadStats() {
    try {
        const users = await api.getUsers();
        document.getElementById('totalUsers').textContent = users.length;
        
        // Placeholder for other stats
        document.getElementById('totalCourses').textContent = '-';
        document.getElementById('totalCertificates').textContent = '-';
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

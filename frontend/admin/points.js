document.addEventListener('DOMContentLoaded', function() {
    requireAdmin();
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        logout();
        window.location.href = '../index.html';
    });
    
    document.getElementById('awardPointsForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value;
        const amount = parseInt(document.getElementById('amount').value);
        const reason = document.getElementById('reason').value;
        
        try {
            await api.adminAddPoints(userId, amount, reason);
            alert('Баллы успешно начислены!');
            e.target.reset();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    });
    
    document.getElementById('giftCourseForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('giftUserId').value;
        const courseId = document.getElementById('courseId').value;
        
        try {
            await api.adminGiftCourse(userId, courseId);
            alert('Курс успешно подарен!');
            e.target.reset();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    });
});

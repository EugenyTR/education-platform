document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    try {
        const result = await api.login(data);
        if (result.success) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert(error.message || 'Ошибка входа');
    }
});

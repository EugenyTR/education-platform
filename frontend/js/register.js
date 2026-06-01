document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        patronymic: document.getElementById('patronymic').value || null,
        nickname: document.getElementById('nickname').value || null,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    try {
        const result = await api.register(data);
        if (result.success) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert(error.message || 'Ошибка регистрации');
    }
});

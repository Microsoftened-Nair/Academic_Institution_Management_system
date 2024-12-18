document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (replace with server-side authentication in production)
        if (username === 'admin' && password === 'admin123') {
            window.location.href = 'admin.html';
        } else if (username === 'teacher' && password === 'teacher123') {
            window.location.href = 'teacher.html';
        } else if (username === 'student' && password === 'student123') {
            window.location.href = 'student.html';
        } else {
            alert('Invalid username or password');
        }
    });
});


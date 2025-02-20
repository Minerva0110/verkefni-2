document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const quizWrapper = document.getElementById('quiz-wrapper');
    const toggleRegister = document.getElementById('toggle-register');
    const toggleLogin = document.getElementById('toggle-login');
    const logoutButton = document.getElementById('logout-button');
    
    console.info('✅ auth.js loaded and event listeners initialized');

    function showRegisterForm() {
        console.info('📢 Switching to registration form');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

    function showLoginForm() {
        console.info('📢 Switching to login form');
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

    function checkLoginStatus() {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            console.info('✅ User already logged in:', storedUser);
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            quizWrapper.style.display = 'block';
            logoutButton.style.display = 'block';
        } else {
            console.info('🔒 No user logged in');
        }
    }

    function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('login-message');

        const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

        if (storedUsers[username] && storedUsers[username] === password) {
            console.info('✅ User logged in:', username);
            localStorage.setItem('loggedInUser', username);

            loginMessage.textContent = `✅ Velkomin, ${username}!`;
            loginMessage.style.color = 'green';

            loginForm.style.display = 'none';
            quizWrapper.style.display = 'block';
            logoutButton.style.display = 'block';

            // Ensure fetchQuizCategories exists before calling
            if (typeof fetchQuizCategories === 'function') {
                console.info('📢 Calling fetchQuizCategories()');
                fetchQuizCategories();
            }
        } else {
            console.error('❌ Innskráning mistókst.');
            loginMessage.textContent = '❌ Rangt notandanafn eða lykilorð.';
            loginMessage.style.color = 'red';
        }
    }

    function logout() {
        console.info('📢 Clearing user session and logging out');
        localStorage.removeItem('loggedInUser');
        location.reload();
    }

    function registerUser(event) {
        event.preventDefault();

        const newUsername = document.getElementById('new-username').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const registerMessage = document.getElementById('register-message');

        if (!newUsername || !newPassword) {
            console.error('❌ Missing username or password');
            registerMessage.textContent = '❌ Vinsamlegast fylltu út bæði svæði.';
            registerMessage.style.color = 'red';
            return;
        }

        let storedUsers = JSON.parse(localStorage.getItem('users')) || {};

        if (storedUsers[newUsername]) {
            console.error('❌ Username already exists:', newUsername);
            registerMessage.textContent = '❌ Notandanafn er þegar í notkun.';
            registerMessage.style.color = 'red';
        } else {
            console.info('✅ Registering new user:', newUsername);
            storedUsers[newUsername] = newPassword;
            localStorage.setItem('users', JSON.stringify(storedUsers));

            registerMessage.textContent = '✅ Nýr notandi skráður! Þú getur nú skráð þig inn.';
            registerMessage.style.color = 'green';

            setTimeout(() => {
                showLoginForm();
            }, 1500);
        }
    }

    if (toggleRegister) {
        toggleRegister.addEventListener('click', showRegisterForm);
    }

    if (toggleLogin) {
        toggleLogin.addEventListener('click', showLoginForm);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    checkLoginStatus();
});

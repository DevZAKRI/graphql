import { fetchUserData } from '../app.js';


export function loginForm() {
    // I want to create the login form here in js
    const loginDev = document.createElement('div');
    loginDev.id = 'login-dev';
    const login_header = document.createElement('h1');
    login_header.id = 'login-header';
    login_header.textContent = 'Login';
    const loginPart = document.createElement('div');
    loginPart.id = 'login-part';
    loginPart.innerHTML = `
    <label for="username">Username</label><br>
    <input type="text" id="username" placeholder="write ur Zone01 username"><br>
    <label for="password">Password</label><br>
    <input type="password" id="password" placeholder="Password">
    `;
    const loginBtn = document.createElement('button');
    loginBtn.id = 'loginBtn';
    loginBtn.textContent = 'Login';
    const err = document.createElement('div');
    err.id = 'error';

    document.body.appendChild(loginDev);
    loginDev.appendChild(login_header);
    loginDev.appendChild(loginPart);
    loginDev.appendChild(loginBtn);
    loginDev.appendChild(err);
    
    

    loginBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const authResponse = await fetch('https://learn.zone01oujda.ma//api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + btoa(username + ':' + password),
                },
            });

            if (!authResponse.ok) {
                throw new Error('Invalid credentials');
            }
            const jwt = await authResponse.json();
            localStorage.setItem('jwt', jwt);
            await fetchUserData(jwt);
            profileSection.classList.remove('hidden');
            loginForm.classList.add('hidden');
        } catch (error) {
            err.textContent = error
        }
    });
}
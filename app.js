const loginForm = document.getElementById('loginForm');
const profileSection = document.getElementById('profileSection');
const userIdElement = document.getElementById('userId');
const userLoginElement = document.getElementById('userLogin');
const userEmailElement = document.getElementById('userEmail');
const logoutButton = document.getElementById('logoutButton');

loginForm.addEventListener('submit', async (event) => {
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
    alert(error.message);
  }
});

async function fetchUserData(jwt) {
  const query = `
    query GetUserInfo {
      user {
        id
        login
        email
      }
    }
  `;

  const response = await fetch('https://learn.zone01oujda.ma//api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await response.json();
  const user = data.data.user[0];

  userIdElement.textContent = user.id;
  userLoginElement.textContent = user.login;
  userEmailElement.textContent = user.email;
}

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('jwt');
  profileSection.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

window.addEventListener('load', () => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    fetchUserData(jwt);
    profileSection.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
});
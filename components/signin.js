import { getData } from "../main.js";

const API_LOGIN_URL = "https://learn.zone01oujda.ma/api/auth/signin";
export function renderLoginForm() {
  document.body.innerHTML = `
      <form id="loginForm">
        <input type="text" id="username" placeholder="Username or Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p id="errorMsg" style="color: red;"></p>
      </form>
    `;
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");
    const encodedCredentials = btoa(`${username}:${password}`);
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedCredentials}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error("Invalid credentials");
      const data = await response.json();
      localStorage.setItem("jwt", data);
      document.getElementById("loginForm").remove()
      getData()
    } catch (error) {
      errorMsg.textContent = error.message;
    }
  });
}

import { getData } from "../main.js";

// API endpoint for authentication
const API_LOGIN_URL = "https://learn.zone01oujda.ma/api/auth/signin";

// Function to render and handle the login form
export function renderLoginForm() {
  // Create and inject the login form HTML
  document.body.innerHTML = `
      <form id="loginForm">
        <input type="text" id="username" placeholder="Username or Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p id="errorMsg" style="color: red;"></p>
      </form>
    `;

  // Add submit event listener to the form
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent form from submitting normally

    // Get form input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    // Create Base64 encoded credentials for Basic Auth
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
      // Send login request to the API
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedCredentials}`,
          "Content-Type": "application/json"
        }
      });

      // Handle failed login attempt
      if (!response.ok) throw new Error("Invalid credentials");

      // Process successful login
      const data = await response.json();
      localStorage.setItem("jwt", data);  // Store JWT token
      document.getElementById("loginForm").remove();  // Remove login form
      getData();  // Fetch and display user data

    } catch (error) {
      // Display error message to user
      errorMsg.textContent = error.message;
    }
  });
}

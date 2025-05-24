import { renderLoginForm } from "./signin.js"
import { userinfo } from "./userinfo.js"

// Function to create the header component with user info and logout button
export const header = (user) => {
    // Create header container
    let header = document.createElement('header')
    header.classList.add('header')

    // Create logout button
    let logout = document.createElement('button')  // Fixed typo in 'button'
    logout.classList.add('logout')
    logout.innerText = "logout"

    // Add logout functionality
    logout.onclick = () => {
        localStorage.removeItem('jwt')  // Remove JWT token
        renderLoginForm()  // Show login form
    }

    // Add user info and logout button to header
    header.append(userinfo(user))  // Add user information component
    header.append(logout)  // Add logout button

    return header
}
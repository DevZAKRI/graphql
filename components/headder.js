import { renderLoginForm } from "./signin.js"
import { userinfo } from "./userinfo.js"

export const header = (user) => {
    let header = document.createElement('header')
    header.classList.add('header')
    let logout = document.createElement('buttton')
    logout.classList.add('logout')
    logout.innerText = "logout"
    logout.onclick = () => {
        localStorage.removeItem('jwt')
        renderLoginForm()
    }
    header.append(userinfo(user))
    header.append(logout)
    return header
}
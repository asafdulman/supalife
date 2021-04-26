import { useState } from "react"
import { userService } from "../services/userService";
import { useDispatch } from 'react-redux'
import { updateUser } from "../store/actions/userActions";
import { NavLink } from "react-router-dom";
import { storageService } from "../services/storageService";
import { hideBottomBar, showBottomBar } from "../store/actions/bottomBarActions";

export function Login() {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({ userName: '', password: '' })
    const onFocus = () => {
        dispatch(hideBottomBar())
    }
    const onBlur = () => {
        dispatch(showBottomBar())
    }

    const onHandleChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [name]: value })
    }

    const onLogin = async (ev) => {
        ev.preventDefault()
        const user = await userService.login(credentials)
        dispatch(updateUser(user))
        storageService.saveToStorage('userInStorage', user)
        setCredentials({ userName: '', password: '' })
    }

    const onGuestLogin = async () => {
        const user = await userService.login({ userName: 'Guest', password: 'a' })
        dispatch(updateUser(user))
        storageService.saveToStorage('userInStorage', user)
        setCredentials({ userName: '', password: '' })
    }

    return (
        <div className="login-box">
            <form className="login-form">
                <input onFocus={() => { onFocus() }} onBlur={() => { onBlur() }} className="user-name-input" autoComplete="off" type="text" name="userName" placeholder="User Name" value={credentials.userName} onChange={(ev) => { onHandleChange(ev) }} />
                <input onFocus={() => { onFocus() }} onBlur={() => { onBlur() }} className="password-input" type="password" name="password" placeholder="Password" value={credentials.password} onChange={(ev) => { onHandleChange(ev) }} />
                <button className="login-btn" onClick={(ev) => { onLogin(ev) }}>Login</button>
            </form>
            <p>Don't have an account yet?</p>
            <NavLink to="/signup">Sign up</NavLink>
            <div className="login-guest-btn" onClick={() => {onGuestLogin()}}><p>View as guest</p></div>
        </div>
    )
}

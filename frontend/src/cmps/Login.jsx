import { useState } from "react"
import { userService } from "../services/userService";
import { useDispatch } from 'react-redux'
import { updateUser } from "../store/actions/userActions";
import { NavLink } from "react-router-dom";

export function Login() {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({ userName: '', password: '' })

    const onHandleChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [name]: value })
    }

    const onLogin = async (ev) => {
        ev.preventDefault()
        console.log('user', ev);
        const user = await userService.login(credentials)
        dispatch(updateUser(user))
        setCredentials({ userName: '', password: '' })
    }

    return (
        <div className="login-box">
            <form className="login-form">
                <input className="user-name-input" autoComplete="off" type="text" name="userName" placeholder="User Name" value={credentials.userName} onChange={(ev) => { onHandleChange(ev) }} />
                {/* <i className="fas user-icon fa-user"></i> */}
                <input className="password-input" type="password" name="password" placeholder="Password" value={credentials.password} onChange={(ev) => { onHandleChange(ev) }} />
                <button className="login-btn" onClick={(ev) => { onLogin(ev) }}>Login</button>
            </form>
            <p>Don't have an account yet?</p>
            <NavLink to="/signup">Sign up</NavLink>
        </div>
    )
}

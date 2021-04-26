import { logout } from "../store/actions/userActions"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { useState } from "react";

export function Logout() {

    let history = useHistory();
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        history.push('/');
    }

    return (
        <div className="logout-box">
            <button className="logout-btn" onClick={() => { onLogout() }}>Logout</button>
        </div>
    )
}

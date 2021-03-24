import { NavLink } from "react-router-dom";
import { logout } from "../store/actions/userActions"
import { useDispatch } from 'react-redux'

export function SideBar({ isBarOpen, setIsBarOpen }) {

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        setIsBarOpen(false)
    }

    return (
        <div className={isBarOpen ? "side-bar-box-open" : "side-bar-box-close"}>
            <div className="side-bar-about-box">
            <i className="fas about-icon fa-arrow-right"></i>
            <NavLink to="/about">About</NavLink>
            </div>
            <div className="side-bar-edit-details-box">
            <i className="fas edit-details-icon fa-user-tag"></i>
            <NavLink to="/edituserinfo">Edit Details</NavLink>
            </div>
            <button className="logout-btn" onClick={() => { onLogout() }}>Logout</button>
            <p className="copy-rights">&#169; Asaf Dulman </p>
        </div >
    )
}

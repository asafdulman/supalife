import { useState } from "react"
import { updateUser } from "../store/actions/userActions";
import { useDispatch } from 'react-redux'
import { userService } from "../services/userService";
import { useHistory } from "react-router-dom";
import { Grow, Slide } from '@material-ui/core';
import { hideBottomBar, showBottomBar } from "../store/actions/bottomBarActions";

export function SignUp() {

    const [userData, setUserData] = useState({ userName: '', password: '', age: '', gender: 'male' })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    let history = useHistory();
    const dispatch = useDispatch()

    const onFocus = () => {
        dispatch(hideBottomBar())
    }
    const onBlur = () => {
        dispatch(showBottomBar())
    }

    const onHandleChange = (ev) => {
        const name = ev.target.name
        const value = name === 'age' ? +ev.target.value : ev.target.value
        setUserData({ ...userData, [name]: value })
    }

    const onSignup = async (ev) => {
        ev.preventDefault()
        if (!userData.userName || !userData.password || !userData.age || !userData.gender) {
            setIsErrorMessageOpen(true)
            setTimeout(() => {
                setIsErrorMessageOpen(false)
            }, 2000);
            return;
        }
        const user = await userService.signup(userData)
        dispatch(updateUser(user))
        setIsModalOpen(true)
    }

    const onGoToCategories = () => {
        history.push('/categories');
        setIsModalOpen(false)
    }

    return (
        <div className="signup-box">
            <Slide in={isErrorMessageOpen}>
                <div className="missing-fields-signup-message-modal">Please fill all fields.</div>
            </Slide>
            <h3 className="signup-heading">Create Account</h3>
            <form className="signup-form">
                <input onFocus={() => { onFocus() }} onBlur={() => { onBlur() }} required className="signup-username-input" onChange={(ev) => { onHandleChange(ev) }} type="text" name="userName" placeholder="User Name" />
                <input onFocus={() => { onFocus() }} onBlur={() => { onBlur() }} className="signup-password-input" onChange={(ev) => { onHandleChange(ev) }} type="text" name="password" placeholder="Password" />
                <input onFocus={() => { onFocus() }} onBlur={() => { onBlur() }} className="signup-age-input" onChange={(ev) => { onHandleChange(ev) }} type="number" name="age" placeholder="Age" min="0" max="99" />
                <select value={userData.gender} className="sign-up-gender-select" name="gender" onChange={(ev) => { onHandleChange(ev) }}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="trans">Transgender</option>
                </select>
                <button className="signup-btn" onClick={(ev) => { onSignup(ev) }}>Sign Me Up!</button>
            </form>
            <Grow in={isModalOpen}>
                <div className="go-to-categories-modal">
                    <p>Your have signed up successfully! Now let's add some life categories.</p>
                    <p onClick={() => { onGoToCategories() }}>Take me there</p>
                </div>
            </Grow>
        </div>
    )
}

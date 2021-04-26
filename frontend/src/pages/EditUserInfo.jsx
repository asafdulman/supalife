import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../services/userService'
import { updateUser } from '../store/actions/userActions'
import { Slide } from '@material-ui/core'

export function EditUserInfo() {
    const [userData, setUserData] = useState(null)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData({ userName: loggedInUser?.userName, age: loggedInUser?.age })
    }, [])

    const onHandleChange = (ev) => {
        const name = ev.target.name
        const value = name === 'age' ? +ev.target.value : ev.target.value
        setUserData({ ...userData, [name]: value })
    }

    const onSave = async (ev) => {
        ev.preventDefault()
        if (loggedInUser.userName === 'Guest') return;
        if (userData.userName === loggedInUser.userName && userData.age === loggedInUser.age) {
            setIsErrorMessageOpen(true)
            setTimeout(() => {
                setIsErrorMessageOpen(false)
            }, 2000);
            return;
        }
        const user = await userService.updateUserCreds(loggedInUser, userData.userName, userData.age)
        dispatch(updateUser(user))
        setIsSuccessMessageOpen(true)
        setTimeout(() => {
            setIsSuccessMessageOpen(false)
        }, 2000);
    }

    return (
        <div className="edit-details-box">
            <Slide in={isErrorMessageOpen}>
                <div className="same-creds-message-modal">No changes were made!</div>
            </Slide>
            <Slide in={isSuccessMessageOpen}>
                <div className="user-creds-message-modal">User Details Updated Successfully.</div>
            </Slide>
            <h1 className="edit-details-heading">Edit Details</h1>
            {loggedInUser.userName === 'Guest' && <p className="edit-user-info-guest">Since you are a visiting guest, you won't be able to edit any details.</p>}
            <form className="edit-details-form-box">
                <input onChange={(ev) => { onHandleChange(ev) }} value={userData?.userName} name="userName" type="text" placeholder="User Name" />
                {/* <input onChange={(ev) => { onHandleChange(ev) }} value={userData?.password} name="password" type="password" placeholder="Password" /> */}
                <input onChange={(ev) => { onHandleChange(ev) }} value={userData?.age} name="age" type="number" placeholder="Age" />
                <button onClick={(ev) => { onSave(ev) }}> Save Changes</button>
            </form>
        </div>
    )
}

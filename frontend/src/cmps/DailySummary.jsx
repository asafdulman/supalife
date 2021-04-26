import { useState } from 'react'
import { Zoom } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { hideBottomBar, showBottomBar } from '../store/actions/bottomBarActions';

export function DailySummary({ modifyDailySummary }) {

    const [userSummary, setUserSummary] = useState('')
    const [showSaveMessage, setShowSaveMessage] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()

    const onFocus = () => {
        dispatch(hideBottomBar())
    }
    const onBlur = () => {
        dispatch(showBottomBar())
    }

    const handleChange = (ev) => {
        setUserSummary(ev.target.value)
    }
    const onSaveSummary = async (ev) => {
        ev.preventDefault()
        if (!loggedInUser) return;
        setShowSaveMessage(true)
        setTimeout(() => {
            setShowSaveMessage(false)
        }, 1500);
        modifyDailySummary(userSummary)
    }

    return (
        <div>
            <form className="daily-summary-box">
                <input onFocus={() => { onFocus() }} onBlur={() => { onBlur() }} className="daily-summary-input" type="text" value={userSummary} placeholder="How was your day?" onChange={(ev) => { handleChange(ev) }} />
                <button className="daily-summary-btn" onClick={(ev) => { onSaveSummary(ev) }}><i className="fas fa-check"></i></button>
                <Zoom in={showSaveMessage}>
                <div className="daily-summary-message-modal">Daily Summary Saved</div>
                </Zoom>
            </form>
        </div>
    )
}

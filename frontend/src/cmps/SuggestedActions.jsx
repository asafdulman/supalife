import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { actionsService } from "../services/actionsService"
import { updateUser } from "../store/actions/userActions"
import { Slide, Zoom } from '@material-ui/core';
import { showBottomBar } from "../store/actions/bottomBarActions";

export function SuggestedActions({ selectedCategory, toggleSuggestedModal, isSuggestedModalOpen }) {

    const [randomActions, setRandomActions] = useState()
    const [selectedAction, setSelectedAction] = useState()
    const [selectedActionButton, setSelectedActionButton] = useState()
    const [datePicker, setDatePicker] = useState()
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isModalActionAdd, setIsModalActionAdd] = useState(false)
    const [isErrorMsgModal, setIsErrorMsgModal] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()

    useEffect(() => {
        getSuggestedAction(selectedCategory)
        setInitialDate()
    }, [])

    const setInitialDate = () => {
        let date = new Date()
        date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        date = loggedInUser?.userName === 'Guest' ? '2021-04-04' : date
        setDatePicker(date)
    }
    const getSuggestedAction = (category) => {
        const actions = actionsService.suggestedActions()
        var actionsByCategory = actions.filter(action => action.category === category)
        const actionsToDisplay = [];
        for (var i = 0; i < 3; i++) {
            const actionToAdd = actionsByCategory[Math.floor(Math.random() * actionsByCategory.length)]
            actionsToDisplay.push(actionToAdd)
            actionsByCategory = actionsByCategory.filter(action => action.title !== actionToAdd.title)
        }
        setRandomActions(actionsToDisplay)
    }

    const onSelectSuggestedAction = (action, button) => {
        setSelectedActionButton(button)
        setSelectedAction(action)
        setIsDateModalOpen(true)
    }

    const onSaveAction = async (action) => {
        if (!action || !datePicker) {
            setIsErrorMsgModal(true)
            setTimeout(() => {
                setIsErrorMsgModal(false)
            }, 2000);
            return;
        }
        action.todoTime = datePicker
        if (loggedInUser.userName === 'Guest') {
            action.isDone = false
            action.createdAt = new Date()
            action.timeStamp = Date.now()
            loggedInUser.actions = [action, ...loggedInUser.actions]
            const user = { ...loggedInUser }
            dispatch(updateUser(user))
        } else {
            const user = await actionsService.addAction(loggedInUser, action)
            dispatch(updateUser(user))
        }
        setIsModalActionAdd(true)
        setTimeout(() => {
            setIsModalActionAdd(false)
        }, 2000);
        setTimeout(() => {
            toggleSuggestedModal('close')
        }, 3000);
        dispatch(showBottomBar())
    }

    return (
        <div>
            <Slide in={isModalActionAdd}>
                <div className="added-action-message-modal">
                    <p>"{selectedAction?.title}" Action Added Successfuly</p>
                </div>
            </Slide>
            <Slide in={isErrorMsgModal}>
                <div className="error-message-modal">
                    Please add a due date.
                    </div>
            </Slide>

            <Zoom in={isSuggestedModalOpen}>
                <div className="suggested-actions-box">
                    <i onClick={() => { toggleSuggestedModal('close') }} className="fas fa-2x fa-times close-add-suggested-action-modal"></i>
                    <h1 className="suggested-actions-heading">Might be a good time to add a new action?</h1>
                    <p className="suggested-actions-category-box">{selectedCategory}</p>
                    <div className="suggested-actions-btns-box">

                        {randomActions?.map((randomAction, index) => <button
                            key={index}
                            className={selectedActionButton === index ? "suggested-actions-btn-clicked" : 'suggested-actions-btn'}
                            onClick={() => { onSelectSuggestedAction(randomAction, index) }}>
                            {randomActions && randomAction.title}</button>)}

                    </div>
                    {isDateModalOpen && <div className="date-and-save-btn-box">
                        <input className="suggested-actions-date-input" value={datePicker} onChange={(ev) => { setDatePicker(ev.target.value) }} id="date" type="date" />
                        <button className="suggested-actions-save-btn" onClick={() => { onSaveAction(selectedAction) }}>Save</button>
                    </div>}
                </div>
            </Zoom>
        </div>
    )
}

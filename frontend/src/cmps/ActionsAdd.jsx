import { useEffect, useState, useRef } from "react"
import { categoryService } from "../services/categoryService"
import { Slide, Grow } from '@material-ui/core'
import { useSelector } from 'react-redux'

export function ActionsAdd({ onAddAction }) {
    const [actionToAdd, setActionToAdd] = useState({title: '', category: 'Family', todoTime: ''})
    const [isAddActionModal, setIsAddActionModal] = useState(false)
    const [isErrorMsgModal, setIsErrorMsgModal] = useState(false)
    const [isCompletedMsgModal, setIsCompletedMsgModal] = useState(false)
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const categories = categoryService.getStaticCategories()
    const inputRef = useRef(null);

    useEffect(() => {
        if (isAddActionModal) {
            inputRef.current.focus();
        }
    }, [isAddActionModal])

    const handleChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        setActionToAdd({ ...actionToAdd, [name]: value })
    }

    const onSendAction = (ev) => {
        ev.preventDefault()
        if (!loggedInUser) return;
        if (!actionToAdd || !actionToAdd.title || !actionToAdd.category) {
            setIsErrorMsgModal(true)
            setTimeout(() => {
                setIsErrorMsgModal(false)
            }, 3000);
            return;
        }
        const clearedAction = {title: '', category: 'Family', todoTime: ''}
        onAddAction(actionToAdd)
        setActionToAdd(clearedAction)
        setIsAddActionModal(!isAddActionModal)
        setTimeout(() => {
            setIsCompletedMsgModal(true)
        }, 300);
        setTimeout(() => {
            setIsCompletedMsgModal(false)
        }, 3000);
    }

    return (
        <div>
            <Slide in={isCompletedMsgModal}>
                <div className="add-action-message-modal">
                    New Action Added Successfuly
                    </div>
            </Slide>
            <Slide in={isErrorMsgModal}>
                <div className="add-action-error-message-modal">
                    You have some missing feilds.
                    </div>
            </Slide>
            <i onClick={() => { setIsAddActionModal(!isAddActionModal) }} className="fas fa-plus-circle add-action-list-btn fa-2x"></i>
            {isAddActionModal && <div onClick={() => { setIsAddActionModal(!isAddActionModal) }} className="add-action-modal-overlay"></div>}
            <Grow in={isAddActionModal}>
                <form className="add-action-box">
                    <i onClick={() => { setIsAddActionModal(false) }} className="fas fa-times close-add-action-modal"></i>
                    <h1>Add a new action</h1>
                    <input className="add-action-title-input" ref={inputRef} value={actionToAdd.title} name="title" placeholder="What needs to be done" type="text" onChange={(ev) => { handleChange(ev) }} />
                    <select className="select-category-action-add" value={actionToAdd.category} onChange={(ev) => { handleChange(ev) }} name="category">
                        {categories.map(category => <option selected={category === 'Family' ? 'selected' : ''} className="option-action-add" value={category}>{category}</option>)}
                    </select>
                    <input className="add-action-date-input" value={actionToAdd.todoTime} name="todoTime" type="date" onChange={(ev) => { handleChange(ev) }} />
                    <button className="add-action-save-btn" onClick={(ev) => { onSendAction(ev) }}>Go</button>
                </form>
            </Grow>
        </div>
    )
}

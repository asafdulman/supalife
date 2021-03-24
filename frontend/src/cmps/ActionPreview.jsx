import { Zoom } from "@material-ui/core"
import { useState } from "react"
import { actionsService } from "../services/actionsService"
import { categoryService } from "../services/categoryService"

import { Draggable } from 'react-beautiful-dnd'

export function ActionPreview({ index, action, onIsDone, onEditAction, onRemoveAction }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [EditedActionData, setEditedActionData] = useState()
    const [editedTitle, setEditedTitle] = useState(action.title)
    const categories = categoryService.getStaticCategories()

    const handleChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        setEditedActionData({ ...EditedActionData, [name]: value })
        if (name === 'title') {
            setEditedTitle(value)
        }
    }

    const onEditActionPreview = (ev) => {
        ev.preventDefault()
        onEditAction(action, EditedActionData)
        setIsModalOpen(false)
    }

    return (
        <Draggable draggableId={action.title} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={(snapshot.isDragging) ? 'action-preview-box-dragging' : 'action-preview-box'} >
                    <div className={action.isDone ? 'action-box-done' : 'action-box-not-done'}>
                        {/* <div className={action.isDone ? 'action-box-done-axis-left' : ''}></div>
                        <div className={action.isDone ? 'action-box-done-axis-right' : ''}></div> */}
                        <h3 className="action-preview-heading">{action.title}</h3>
                        <p className="action-category">{action.category}</p>
                        <p className="action-todo-time">{action.todoTime}</p>
                        <div className="action-preview-btns-box">
                            <button className={action.isDone ? 'undone-action-btn' : 'done-action-btn'} onClick={() => { onIsDone(action) }}><i className="fas fa-check"></i></button>
                            <button className="edit-action-btn" onClick={() => { setIsModalOpen(!isModalOpen) }}><i className="fas fa-pen"></i></button>
                            <button className="remove-action-btn" onClick={() => { onRemoveAction(action) }}><i className="far fa-trash-alt"></i></button>
                        </div>
                        <Zoom in={isModalOpen}>
                            <form className="edit-action-box">
                                <i onClick={() => { setIsModalOpen(false) }} className="fas fa-times close-add-action-modal"></i>
                                <input className="edit-action-input-title" name="title" onChange={(ev) => { handleChange(ev) }} value={editedTitle} placeholder="Edit action title" type="text" />
                                <select className="edit-action-input-category" onChange={(ev) => { handleChange(ev) }} name="category">
                                    {categories.map(category => <option selected={action.category === category ? 'selected' : ''} value={category}>{category}</option>)}
                                </select>
                                <input className="edit-action-input-date" name="todoTime" onChange={(ev) => { handleChange(ev) }} type="date" />
                                <button className="edit-action-save-btn" onClick={(ev) => { onEditActionPreview(ev) }}>Save</button>
                            </form>
                        </Zoom>
                    </div>

                </div>)

            }


            {/* <div className={action.isDone ? 'action-box-done' : 'action-box-not-done'}>
                <div className={action.isDone ? 'action-box-done-axis-left' : ''}></div>
                <div className={action.isDone ? 'action-box-done-axis-right' : ''}></div>
                <h3 className="action-preview-heading">{action.title}</h3>
                <p className="action-category">{action.category}</p>
                <p className="action-todo-time">{action.todoTime}</p>
                <div className="action-preview-btns-box">
                    <button className={action.isDone ? 'undone-action-btn' : 'done-action-btn'} onClick={() => { onIsDone(action) }}><i className="fas fa-check"></i></button>
                    <button className="edit-action-btn" onClick={() => { setIsModalOpen(!isModalOpen) }}><i className="fas fa-pen"></i></button>
                    <button className="remove-action-btn" onClick={() => { onRemoveAction(action) }}><i className="far fa-trash-alt"></i></button>
                </div>
                <Zoom in={isModalOpen}>
                    <form className="edit-action-box">
                        <i onClick={() => { setIsModalOpen(false) }} className="fas fa-times close-add-action-modal"></i>
                        <input className="edit-action-input-title" name="title" onChange={(ev) => { handleChange(ev) }} value={editedTitle} placeholder="Edit action title" type="text" />
                        <select className="edit-action-input-category" onChange={(ev) => { handleChange(ev) }} name="category">
                            {categories.map(category => <option selected={action.category === category ? 'selected' : ''} value={category}>{category}</option>)}
                        </select>
                        <input className="edit-action-input-date" name="todoTime" onChange={(ev) => { handleChange(ev) }} type="date" />
                        <button className="edit-action-save-btn" onClick={(ev) => { onEditActionPreview(ev) }}>Save</button>
                    </form>
                </Zoom>
            </div> */}
        </Draggable>
    )
}

{/* <Draggable draggableId={employee._id} index={index}>
    {(provided, snapshot) => (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={(snapshot.isDragging) ? 'employee-preview-box-dragging' : 'employee-preview-box'} >
            <p>{employee.lastName}, {employee.firstName}</p>

        </div>)

    }
</Draggable> */}
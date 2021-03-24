import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ActionPreview } from '../cmps/ActionPreview'
import { ActionsAdd } from '../cmps/ActionsAdd'
import { changeActionsOrder, updateUser } from '../store/actions/userActions'
import { actionsService } from '../services/actionsService'
import { Slide } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { userService } from '../services/userService'

// import { userService } from '../services/userService'
// import { removeAction } from '../services/actionsService'
export function ActionsPage() {

    const [filterBy, setFilterBy] = useState({ title: '', category: 'All' })
    // const [isAddActionModalOpen, setIsAddActionModalOpen] = useState(false)
    const [isRemoveMessageOpen, setIsRemoveMessageOpen] = useState(false)
    const [isErrorMsgModal, setIsErrorMsgModal] = useState(false)
    const [isDoneMsgModal, setIsDoneMsgModal] = useState(false)
    const [selectedAction, setSelectedAction] = useState()
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()

    useEffect(() => {
        userCategoryAction()
        showActionsStats()
    }, [])

    useEffect(() => {
        showActionsStats()
    }, [loggedInUser])
    useEffect(() => {
        console.log('filterBy', filterBy);
    }, [filterBy])

    const onAddAction = async (action) => {
        const user = await actionsService.addAction(loggedInUser, action)
        dispatch(updateUser(user))
    }

    const onIsDone = async (action) => {
        setSelectedAction(action)
        const user = await actionsService.updateActionDone(loggedInUser, action)
        dispatch(updateUser(user))
        setIsDoneMsgModal(true)
        setTimeout(() => {
            setIsDoneMsgModal(false)
        }, 2500);
    }

    const showDoneMessage = (action) => {
        return !action?.isDone ? <p className="done-action-message-modal">Well done! "{action?.title}" has completed.</p> : <p className="done-action-message-modal">"{action?.title}" is now undone.</p>
    }

    const onEditAction = async (originalAction, editedAction) => {
        const user = await actionsService.updateActionEdit(loggedInUser, originalAction, editedAction)
        dispatch(updateUser(user))
    }



    const userCategoryAction = () => {
        const actions = loggedInUser?.actions?.map(action => action.category)
        var res = actions?.filter((category, index) => actions.indexOf(category) === index)
        if (res) res = ['All', ...res]
        return res?.map(category => <option>{category}</option>)
    }



    const onRemoveAction = async (action) => {
        setIsRemoveMessageOpen(true)
        setSelectedAction(action)
    }

    const onRemoveAfterConfirmation = async () => {
        const user = await actionsService.removeAction(loggedInUser, selectedAction)
        dispatch(updateUser(user))
        if (user) setIsRemoveMessageOpen(false)

        setTimeout(() => {
            setIsErrorMsgModal(true)
        }, 500);
        setTimeout(() => {
            setIsErrorMsgModal(false)
        }, 2500);
    }

    const showActionsStats = () => {
        const totalActions = loggedInUser?.actions?.length;
        const doneActions = loggedInUser?.actions?.reduce((acc, action) => {
            return acc = action.isDone ? ++acc : acc
        }, 0)
        if (!doneActions && !totalActions) return '0 / 0'
        return `${doneActions} / ${totalActions}`
    }

    const onDragEnd = async (e) => {
        const { destination, source } = e
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        const newActions = [...loggedInUser.actions]
        const action = newActions.splice(source.index, 1)
        newActions.splice(destination.index, 0, action[0])
        loggedInUser.actions = newActions
        const user = await userService.updateUserActions(loggedInUser)
        dispatch(changeActionsOrder(user))
    }

    const onFilterActions = (ev) => {
        const name = ev.target.name
        setFilterBy({ ...filterBy, [name]: ev.target.value })
    }

    const actionsToShow = () => {
        const userActions = loggedInUser?.actions
        let filteredActions = filterBy.title ? userActions.filter(action => action.title.toLowerCase().includes(filterBy.title)) : userActions
        if (filterBy.category) {
            if (filterBy.category === 'All') {
                return filteredActions
            } else {
                filteredActions = filteredActions.filter(action => action.category === filterBy.category)
                return filteredActions
            }
        }
    }

    return (
        <div className="actions-page-box">
            <h1 className="actions-heading">Actions</h1>
            <div className="action-page-top-box">
                <ActionsAdd onAddAction={onAddAction} />
                <div className="filter-inputs-box">
                    <input autoComplete="off" value={filterBy.title} className="actions-filter-title-input" name="title" onChange={(ev) => { setFilterBy({ ...filterBy, title: ev.target.value }) }} type="text" placeholder="Search action" />
                    <select name="category" className="actions-filter-category-input" onChange={(ev) => { onFilterActions(ev) }}>
                        {userCategoryAction()}
                    </select>
                </div>
                <div className="action-recap-box">
                    <p>{showActionsStats()}</p>
                </div>

            </div>
            <Slide in={isDoneMsgModal}>
                {showDoneMessage(selectedAction)}
            </Slide>
            <Slide in={isRemoveMessageOpen}>
                <div className="remove-action-confirmation-box">
                    <p>Are you sure you want to delete this action?</p>
                    <button className="remove-action-confirm-btn" onClick={() => { onRemoveAfterConfirmation() }}>Delete</button>
                    <button className="remove-action-cancel-btn" onClick={() => { setIsRemoveMessageOpen(false) }}>I regret</button>
                </div>
            </Slide>
            <Slide in={isErrorMsgModal}>
                <p className="removed-action-message-modal">{selectedAction?.title} was successfuly removed.</p>
            </Slide>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'1'}>
                    {(provided, snapshot) => (
                        <div className={(snapshot.isDraggingOver) ? "list-wrapper-dragging-over" : "list-wrapper"}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {loggedInUser && actionsToShow().map((action, index) => <ActionPreview index={index} key={action.timeStamp} onRemoveAction={onRemoveAction} onEditAction={onEditAction} onIsDone={onIsDone} action={action} />)}
                            {provided.placeholder}
                        </div>
                    )}
                    {/* {loggedInUser && actionsToShow().map(action => <ActionPreview key={action.timeStamp} onRemoveAction={onRemoveAction} onEditAction={onEditAction} onIsDone={onIsDone} action={action} />)} */}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

{

}

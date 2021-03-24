import {
    userService
} from "../../services/userService"

export function loadUser(id) {
    return async dispatch => {
        const user = await userService.getUser(id)
        console.log('user', user);
        dispatch({
            type: 'LOAD_USER',
            user
        })
    }
}
export function updateUser(user) {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}
export function logout() {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            user: null
        })
    }
}

export function changeActionsOrder(user) {
    // const newActions = [...actions]
    // const action = newActions.splice(oldIdx, 1)
    // newActions.splice(newIdx, 0, action[0])
    // loggedInUser.actions = newActions
    return async dispatch => {
        dispatch({
            type: 'CHANGE_ORDER',
            user
        })
    }
}
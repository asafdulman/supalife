import { storageService } from "../../services/storageService";
import {
    userService
} from "../../services/userService"

export function loadUser(id) {
    return async dispatch => {
        const user = await userService.getUser(id)
        dispatch({
            type: 'LOAD_USER',
            user
        })
    }
}
export function updateUser(user) {
    storageService.saveToStorage('userInStorage', user)
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}
export function logout() {
    storageService.saveToStorage('userInStorage', null)
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            user: null
        })
    }
}

export function changeActionsOrder(user) {
    return async dispatch => {
        dispatch({
            type: 'CHANGE_ORDER',
            user
        })
    }
}
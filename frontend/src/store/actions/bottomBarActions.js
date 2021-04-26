export function showBottomBar() {
    return async dispatch => {
        dispatch({
            type: 'SHOW'
        })
    }
}
export function hideBottomBar() {
    return async dispatch => {
        dispatch({
            type: 'HIDE'
        })
    }
}
export function increaseProgressBar() {
    return async dispatch => {
        dispatch({
            type: 'INCREASE'
        })
    }
}
export function decreaseProgressBar() {
    return async dispatch => {
        dispatch({
            type: 'DECREASE'
        })
    }
}
export function setTotalCategories(numberOfCategories) {
    return async dispatch => {
        dispatch({
            type: 'SET_TOTAL_CATEGORIES',
            total: numberOfCategories
        })
    }
}
export function setCompletedCategories(completedCategories) {
    return async dispatch => {
        dispatch({
            type: 'SET_COMPLETED_CATEGORIES',
            completed: completedCategories
        })
    }
}


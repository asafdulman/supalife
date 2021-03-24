const initialState = {
    totalCategories: 0,
    completed: 0
}

export function progressBarReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state,
                completed: state.completed + 1
            }
            case 'DECREASE':
                return {
                    ...state,
                    completed: state.completed - 1
                }
                case 'SET_TOTAL_CATEGORIES':
                    return {
                        ...state,
                        totalCategories: action.total
                    }
                case 'SET_COMPLETED_CATEGORIES':
                    return {
                        ...state,
                        completed: action.completed
                    }
                default:
                    return state
    }

}
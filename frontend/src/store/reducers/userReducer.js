const initialState = {

}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
            case 'SET_USER':
                return {
                    ...state,
                    loggedInUser: action.user
                }

                case 'CHANGE_ORDER':
                    return {
                        ...state,
                        loggedInUser: action.user
                    }
                    default:
                        return state
    }

}
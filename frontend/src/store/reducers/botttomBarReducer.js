const initialState = {
    isShown: true
}

export function bottomBarReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW':
            return {
                ...state,
                isShown: true
            }
            case 'HIDE':
                return {
                    ...state,
                    isShown: false
                }
                default:
                    return state;
    }
}
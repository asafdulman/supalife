import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer';
import { progressBarReducer } from './reducers/progressBarReducer'
import {bottomBarReducer} from './reducers/botttomBarReducer'

const rootReducer = combineReducers({
    userReducer,
    progressBarReducer,
    bottomBarReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
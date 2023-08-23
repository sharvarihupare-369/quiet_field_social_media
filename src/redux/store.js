import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {reducer as authReducer} from './authentication/reducer'
import {reducer as postReducer} from './posts/reducer'
const rootReducer = combineReducers({
   authReducer,
   postReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
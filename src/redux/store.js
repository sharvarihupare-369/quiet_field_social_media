import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {reducer as authReducer} from './authentication/reducer'
import {reducer as postReducer} from './posts/reducer'
import {reducer as commentReducer} from './comments/reducer'
import {reducer as profileReducer} from './profile/reducer'
const rootReducer = combineReducers({
   authReducer,
   postReducer,
   commentReducer,
   profileReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
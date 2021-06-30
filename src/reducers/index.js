import authReducer from './auth';
import usersReducer from './users';
import {combineReducers} from "redux";

export default combineReducers({
       auth: authReducer,
       users: usersReducer,
});

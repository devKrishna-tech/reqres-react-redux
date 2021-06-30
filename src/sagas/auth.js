import {put, delay} from 'redux-saga/effects';
import axios from 'axios';
import * as authActions from "../actions/auth";
import * as usersActions from "../actions/users";

export function* authUserSaga(action) {
    yield put(authActions.authStart());
    let authUrl = 'https://reqres.in/api/login';
    const authData = {
        email: action.authData.email,
        password: action.authData.password,
    }
    if(action.authData.isSignUp){
        authUrl = 'https://reqres.in/api/register';
    }
    try {
        const response = yield axios.post(authUrl, authData);
        const expireInMins = 60;
        const userId = action.authData.isSignUp ? 10 : 4;
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('userId', userId.toString());
        yield localStorage.setItem('expirationDate', yield new Date(new Date().getTime() + expireInMins * 60000));
        yield put(authActions.authSuccess(response.data.token, userId));
        yield put(authActions.checkAuthTimeout(expireInMins));
        if(action.authData.isSignUp){
            const userData = {
                ...action.authData,
                userId: userId,
            }
            yield put(usersActions.addNewUserInit(userData));
        }
    } catch(error) {
        yield put(authActions.authFailed());

    }
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationMins * 60000);
    yield put(authActions.authLogout());
}

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(authActions.authLogoutSuccess());
    yield put(usersActions.clearUsersInit());
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(authActions.authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        const userId = yield localStorage.getItem('userId')
        if (expirationDate <= new Date()) {
            yield put(authActions.authLogout());
        } else {
            yield put(authActions.authSuccess(token, userId));
            yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 60000));
        }
    }
}
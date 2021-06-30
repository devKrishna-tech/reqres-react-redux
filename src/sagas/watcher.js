import * as authSagas from './auth';
import * as usersSagas from './users';
import {all, takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_USER, authSagas.authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authSagas.authCheckStateSaga),
    ])
}

export function* watchUsers() {
    yield all([
        takeEvery(actionTypes.FETCH_USERS, usersSagas.fetchUsersSaga),
        takeEvery(actionTypes.ADD_NEW_USER_INIT, usersSagas.addNewUserSaga),
        takeEvery(actionTypes.CLEAR_USERS_INIT, usersSagas.clearUsersSaga),
        takeEvery(actionTypes.DELETE_USER_INIT, usersSagas.deleteUserSaga),
    ])
}

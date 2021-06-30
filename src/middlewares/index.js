import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
export const sagaMiddleware = createSagaMiddleware();
export const middlewares =  applyMiddleware(
    sagaMiddleware
)

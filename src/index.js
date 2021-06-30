import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import reducers from "./reducers";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {createStore, compose} from "redux";
import {middlewares, sagaMiddleware} from './middlewares';
import * as watchers from './sagas/watcher';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(middlewares));
sagaMiddleware.run(watchers.watchAuth);
sagaMiddleware.run(watchers.watchUsers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);


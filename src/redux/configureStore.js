import {createStore, combineReducers, applyMiddleware} from 'redux';


import {Users} from './users';
import {Notices} from './notice';
import {Comments} from './comments';


import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            notices: Notices,
            comments: Comments
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
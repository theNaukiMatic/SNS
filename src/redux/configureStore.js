import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Users} from './users';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            
        }),
        // applyMiddleware(thunk, logger)
    );

    return store;
}
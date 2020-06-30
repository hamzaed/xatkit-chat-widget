import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {ADD_NEW_USER_MESSAGE} from './actions/actionTypes'

import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';

export const initStore = (storage, xatkitClient) => {

    const middleware = store => next => (action) => {
        console.log(action)
        console.log(ADD_NEW_USER_MESSAGE)
        switch (action.type) {
            case ADD_NEW_USER_MESSAGE: {
                xatkitClient.send('text', action.text);
                break;
            }
            default: {
                break;
            }
        }
        next(action)
    }

    const reducer = combineReducers({
        behavior: behavior,
        messages: messages(storage)
    });

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        reducer,
        composeEnhancer(applyMiddleware(middleware))
    )


}

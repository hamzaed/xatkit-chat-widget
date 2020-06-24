import { createStore, combineReducers } from 'redux';

import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';

export const initStore = (storage) => {
    const reducer = combineReducers({
        behavior: behavior,
        messages: messages(storage)
    });

    return createStore(
        reducer,
        process.env.NODE_ENV !== 'production' ?
            /* eslint-disable no-underscore-dangle */
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__() : ''
        /* eslint-enable */
    )


}

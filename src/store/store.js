import { createStore, combineReducers } from 'redux';

import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';
import quickButtons from './reducers/quickButtonsReducer';

function initStore(
    storage = localStorage
){
    const reducer = combineReducers({
        behavior: behavior,
        messages: messages(storage),
        quickButtons: quickButtons
    });

    return createStore(
        reducer,
        //persistedState,
        process.env.NODE_ENV !== 'production' ?
            /* eslint-disable no-underscore-dangle */
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__() : ''
        /* eslint-enable */
    )


}


export { initStore }

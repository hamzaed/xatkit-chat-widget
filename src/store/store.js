import { createStore, combineReducers } from 'redux';

import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';
import quickButtons from './reducers/quickButtonsReducer';

const saveToLocaleStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('Xatkit_widget_state',serializedState)
    }
    catch (e) {
        console.log(e)
    }
}


const reducer = combineReducers({ behavior, messages, quickButtons });

const store = createStore(
    reducer,
    process.env.NODE_ENV !== 'production' ?
        /* eslint-disable no-underscore-dangle */
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() : ''
    /* eslint-enable */
)

store.subscribe(()=> {
    saveToLocaleStorage(store.getState())
})

export default store

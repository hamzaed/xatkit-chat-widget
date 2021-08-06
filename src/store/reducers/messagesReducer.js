import { fromJS, List } from 'immutable';


import {
    createMiniCard,
    createAudioWidget,
    createNewMessage,
    createQuickButtons,
    getLocalSession,
    storeMessageTo,
    makeQuickButtonClicked
} from '../../utils/helpers';
import {MESSAGE_SENDER, SESSION_NAME} from '@constants';

import * as actionTypes from '../actions/actionTypes';


export default function (storage) {
    const initialState = List([]);

    return function reducer(state = initialState, action) {
        const storeMessage = storeMessageTo(storage)
        switch (action.type) {
            case actionTypes.ADD_NEW_USER_MESSAGE: {
                return storeMessage(state.push(createNewMessage(action.text, MESSAGE_SENDER.CLIENT)));
            }
            case actionTypes.ADD_NEW_RESPONSE_MESSAGE: {
                return storeMessage(state.push(createNewMessage(action.text, MESSAGE_SENDER.RESPONSE)));
            }
            case actionTypes.ADD_NEW_MINI_CARD: {
                return storeMessage(state.push(createMiniCard(action.miniCard)))
            }
            case actionTypes.ADD_NEW_AUDIO_WIDGET: {
                return storeMessage(state.push(createAudioWidget(action.audio)));
            }
            case actionTypes.ADD_QUICK_BUTTONS: {
                return storeMessage(state.push(createQuickButtons(action.buttons)))
            }
            case actionTypes.SET_QUICK_BUTTON_CLICKED: {
                return storeMessage(state.update(
                    action.quickButtonsIndex, quickButtons =>
                        makeQuickButtonClicked(quickButtons, action.buttonIndex)));
            }

            case actionTypes.PULL_SESSION: {
                const localSession = getLocalSession(storage, SESSION_NAME);
                if (localSession) {
                    return fromJS(localSession.conversation);
                }
                return state;
            }
            default:
                return state;
        }

    }
}


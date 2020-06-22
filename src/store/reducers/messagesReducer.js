import { List, fromJS } from 'immutable';

import { createReducer } from '@utils/store';
import { createNewMessage, createMiniCard, createLinkSnippet, createComponentMessage } from '../../utils/messages';
import { MESSAGE_SENDER } from '@constants';

import * as actionTypes from '../actions/actionTypes';


function getLocalSession(storage, key) {

  const cachedSession = storage.getItem(key);
  let session = null;
  if (cachedSession) {

    const parsedSession = JSON.parse(cachedSession);

    const formattedConversation = parsedSession.conversation
        ? parsedSession.conversation
        : [];

    session = {
      ...parsedSession,
      conversation: formattedConversation
    };
  }
   return session;
}


const storeMessageTo = storage => (conversation) => {

  const localSession = getLocalSession(storage, "XATKIT_SESSION");
  const newSession = {
    conversation: conversation.toJS()
  };
  storage.setItem('XATKIT_SESSION', JSON.stringify(newSession));
  return conversation;
};

export default function(storage){
  const initialState = List([]);

  return function reducer(state = initialState, action){
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
      case actionTypes.PULL_SESSION: {

        const localSession = getLocalSession(storage, 'XATKIT_SESSION');
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


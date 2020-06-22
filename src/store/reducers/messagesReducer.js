import { List, fromJS } from 'immutable';


import { createNewMessage, createMiniCard, createLinkSnippet, createComponentMessage } from '../../utils/helpers';
import { MESSAGE_SENDER, SESSION_NAME } from '@constants';

import * as actionTypes from '../actions/actionTypes';
import {storeMessageTo, getLocalSession} from '../../utils/helpers'


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


import { Map, List } from 'immutable';
import { MESSAGES_TYPES, MESSAGE_SENDER, MESSAGE_BOX_SCROLL_DURATION } from '../constants.js';

import Message from '@messagesComponents/Message';
import Snippet from '@messagesComponents/Snippet';
import QuickButtons from '@messagesComponents/QuickButtons';
import MiniCard from "@messagesComponents/MiniCard";

export function createNewMessage(text, sender) {
  return Map({
    type: MESSAGES_TYPES.TEXT,
    component: Message,
    text,
    sender,
    showAvatar: sender === MESSAGE_SENDER.RESPONSE
  });
}

export function createLinkSnippet(link) {
  return Map({
    type: MESSAGES_TYPES.SNIPPET.LINK,
    component: Snippet,
    title: link.title,
    link: link.link,
    target: link.target || '_blank',
    sender: MESSAGE_SENDER.RESPONSE,
    showAvatar: true
  });
}

export function createMiniCard(miniCard) {
  return Map( {
    type: MESSAGES_TYPES.MINI_CARD,
    component: MiniCard,
    title: miniCard.title,
    link: miniCard.link,
    img: miniCard.img,
    target: miniCard.target || '_blank',
    sender: MESSAGE_SENDER.RESPONSE,
    showAvatar: false
  })
}

export function createComponentMessage(component, props, showAvatar) {
  return Map({
    type: MESSAGES_TYPES.CUSTOM_COMPONENT,
    component,
    props,
    sender: MESSAGE_SENDER.RESPONSE,
    showAvatar
  });
}

/**
 * Easing Functions
 * @param {*} t timestamp
 * @param {*} b begining
 * @param {*} c change
 * @param {*} d duration
 */
function sinEaseOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

/**
 *
 * @param {*} target scroll target
 * @param {*} scrollStart
 * @param {*} scroll scroll distance
 */
function scrollWithSlowMotion(target, scrollStart, scroll) {
  const raf = window.webkitRequestAnimationFrame || window.requestAnimationFrame
  let start = null
  const step = (timestamp) => {
    if (!start) {
      start = timestamp
    }
    let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION)
    let total = scrollStart + stepScroll
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step)
    }
  }
  raf(step)
}

export function scrollToBottom(messagesDiv) {
  if (!messagesDiv) return;
  const screenHeight = messagesDiv.clientHeight;
  const scrollTop = messagesDiv.scrollTop;

  const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight)

  scrollOffset && scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
}



export function createQuickButtons(buttons) {
  return Map({
    type: MESSAGES_TYPES.QUICK_BUTTONS,
    component: QuickButtons,
    buttons: List(buttons.map( button => {
      return Map(button)
    }))
  });
}


export function getLocalSession(storage, key) {

  const cachedSession = storage.getItem(key);
  let session = null;
  if (cachedSession) {

    const parsedSession = JSON.parse(cachedSession);

    const formattedConversation = parsedSession.conversation
        ? parsedSession.conversation
        : [];
    const sessionId = parsedSession.sessionId

    session = {
      ...parsedSession,
      conversation: formattedConversation
    }
  }
  return session;
}

export function storeLocalSession(storage, key, sid) {

  const cachedSession = storage.getItem(key);
  let session;
  if (cachedSession) {
    const parsedSession = JSON.parse(cachedSession);
    session = {
      ...parsedSession,
      session_id: sid
    };
  } else {
    // No existing local session, create a new empty session with only session_id
    session = {
      session_id: sid
    };
  }
  // Store updated session to storage
  storage.setItem(key, JSON.stringify(session));
}


export const storeMessageTo = storage => (conversation) => {

  const localSession = getLocalSession(storage, "XATKIT_SESSION");
  const newSession = {
    ...localSession,
    conversation: conversation.toJS()
  };
  storage.setItem('XATKIT_SESSION', JSON.stringify(newSession));
  return conversation;
};
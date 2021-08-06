import {List, Map} from 'immutable';
import {MESSAGE_BOX_SCROLL_DURATION, MESSAGE_SENDER, MESSAGES_TYPES} from '../constants.js';

import Message from '@messagesComponents/Message';
import Snippet from '@messagesComponents/Snippet';
import QuickButtons from '@messagesComponents/QuickButtons';
import MiniCard from "@messagesComponents/MiniCard";
import AudioWidget from "@messagesComponents/AudioWidget";

import {SESSION_NAME} from '@constants';

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
    return Map({
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

export function createAudioWidget(audio) {
    return Map({
        type: MESSAGES_TYPES.AUDIO_WIDGET,
        component: AudioWidget,
        src: audio.src,
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
        buttons: List(buttons.map(button => {
            return Map(button)
        }))
    });
}


export function makeQuickButtonClicked(quickButtons, buttonIndex) {
    return quickButtons.set("buttons",quickButtons.get("buttons")
        .update(buttonIndex, button => {
            return button.set(
                "clicked",
                true
            );
        }))
}

export function getLocalSession(storage) {
    const cachedSession = storage.getItem(SESSION_NAME);
    let session = null;
    if (cachedSession) {

        const parsedSession = JSON.parse(cachedSession);

        const formattedConversation = parsedSession.conversation
            ? parsedSession.conversation
            : [];

        session = {
            ...parsedSession,
            conversation: formattedConversation
        }
    }
    return session;
}

export function storeLocalSession(storage, conversation_id) {
    const cachedSession = storage.getItem(SESSION_NAME);
    let session;
    if (cachedSession) {
        const parsedSession = JSON.parse(cachedSession);
        session = {
            ...parsedSession,
            conversation_id: conversation_id
        };
    } else {
        session = {
            conversation_id: conversation_id
        };
    }
    storage.setItem(SESSION_NAME, JSON.stringify(session));
}

export const storeMessageTo = storage => (conversation) => {
    const localSession = getLocalSession(storage, SESSION_NAME);
    const newSession = {
        ...localSession,
        conversation: conversation.toJS(),
        lastUpdate: Date.now()
    };
    storage.setItem(SESSION_NAME, JSON.stringify(newSession));
    return conversation;
};

import * as actions from './actionTypes';

export function toggleDarkMode() {
    return {
        type: actions.TOGGLE_DARK_MODE
    };
}

export function toggleChat() {
    return {
        type: actions.TOGGLE_CHAT
    };
}

export function toggleInputDisabled(newValue) {
    return {
        type: actions.TOGGLE_INPUT_DISABLED,
        newValue
    };
}


export function setPlaceholder(newValue) {
    return {
        type: actions.SET_PLACE_HOLDER,
        newValue
    };
}

export function addUserMessage(messageType, text) {
    return {
        type: actions.ADD_NEW_USER_MESSAGE,
        messageType,
        text
    };
}

export function addResponseMessage(text) {
    return {
        type: actions.ADD_NEW_RESPONSE_MESSAGE,
        text
    };
}

export function toggleMsgLoader(newValue) {
    return {
        type: actions.TOGGLE_MSG_LOADER,
        newValue
    }
}

export function addLinkSnippet(link) {
    return {
        type: actions.ADD_NEW_LINK_SNIPPET,
        link
    };
}

export function addMiniCard(miniCard) {
    return {
        type: actions.ADD_NEW_MINI_CARD,
        miniCard
    }
}

export function addAudioWidget(audio) {
    return {
        type: actions.ADD_NEW_AUDIO_WIDGET,
        audio
    }
}

export function renderCustomComponent(component, props, showAvatar) {
    return {
        type: actions.ADD_COMPONENT_MESSAGE,
        component,
        props,
        showAvatar
    };
}

export function dropMessages() {
    return {
        type: actions.DROP_MESSAGES
    };
}

export function hideAvatar() {
    return {
        type: actions.HIDE_AVATAR
    };
}

export function addQuickButtons(buttons) {
    return {
        type: actions.ADD_QUICK_BUTTONS,
        buttons
    }
}

export function setQuickButtonClicked(quickButtonsIndex, buttonIndex) {
    return {
        type: actions.SET_QUICK_BUTTON_CLICKED,
        quickButtonsIndex,
        buttonIndex
    }
}


export function pullSession() {
    return {
        type: actions.PULL_SESSION
    };
}

export function setConnected(newValue) {
    return {
        type: actions.SET_CONNECTED,
        newValue
    }
}

import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import './style.scss';

const Conversation = props =>
    <div className="xatkit-conversation-container">
        <Header
            title={props.title}
            subtitle={props.subtitle}
            toggleChat={props.toggleChat}
            showCloseButton={props.showCloseButton}
            titleAvatar={props.titleAvatar}
            darkMode={props.darkMode}
        />
        <Messages
            profileAvatar={props.profileAvatar}
            darkMode={props.darkMode}
            onQuickButtonClicked={props.onQuickButtonClicked}
            onEventLinkClicked={props.onEventLinkClicked}
        />
        <Sender
            sendMessage={props.sendMessage}
            placeholder={props.senderPlaceHolder}
            disabledInput={props.disabledInput}
            darkMode={props.darkMode}
        />
    </div>;

Conversation.propTypes = {
    title: PropTypes.string,
    titleAvatar: PropTypes.string,
    subtitle: PropTypes.string,
    sendMessage: PropTypes.func,
    senderPlaceHolder: PropTypes.string,
    profileAvatar: PropTypes.string,
    toggleChat: PropTypes.func,
    showCloseButton: PropTypes.bool,
    disabledInput: PropTypes.bool,
    autofocus: PropTypes.bool,
    darkMode: PropTypes.bool
};

export default Conversation;

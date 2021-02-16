import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import './style.scss';

const WidgetLayout = props => (
    <div
        className={
            `xatkit-widget-container ${props.fullScreenMode ? 'xatkit-full-screen' : ''} ${props.showChat ? 'xatkit-opened' : ''}`
        }
    >
        {props.showChat &&
        <Conversation
            title={props.title}
            subtitle={props.subtitle}
            darkMode={props.darkMode}
            sendMessage={props.onSendMessage}
            senderPlaceHolder={props.senderPlaceHolder}
            onQuickButtonClicked={props.onQuickButtonClicked}
            onEventLinkClicked={props.onEventLinkClicked}
            profileAvatar={props.profileAvatar}
            toggleChat={props.onToggleConversation}
            showChat={props.showChat}
            showCloseButton={props.showCloseButton}
            disabledInput={props.disabledInput}
            autofocus={props.autofocus}
            titleAvatar={props.titleAvatar}
            focus={props.focus}
            previousInput={props.previousInput}
        />
        }
        {props.customLauncher ?
            props.customLauncher(props.onToggleConversation) :
            !props.fullScreenMode &&
            <Launcher
                toggle={props.onToggleConversation}
                badge={props.badge}
                launcherImage={props.launcherImage}
                darkMode={props.darkMode}
            />
        }
    </div>
);

WidgetLayout.propTypes = {
    title: PropTypes.string,
    titleAvatar: PropTypes.string,
    subtitle: PropTypes.string,
    darkMode: PropTypes.bool,
    onSendMessage: PropTypes.func,
    onToggleConversation: PropTypes.func,
    showChat: PropTypes.bool,
    senderPlaceHolder: PropTypes.string,
    onQuickButtonClicked: PropTypes.func,
    onEventLinkClicked: PropTypes.func,
    profileAvatar: PropTypes.string,
    showCloseButton: PropTypes.bool,
    disabledInput: PropTypes.bool,
    fullScreenMode: PropTypes.bool,
    badge: PropTypes.number,
    autofocus: PropTypes.bool,
    customLauncher: PropTypes.func,
    launcherImage: PropTypes.string,
    focus: PropTypes.object,
    previousInput: PropTypes.string
};

export default connect(store => ({
    showChat: store.behavior.get('showChat'),
    disabledInput: store.behavior.get('disabledInput'),
    darkMode: store.behavior.get('darkMode'),
    senderPlaceHolder: store.behavior.get('placeholder')
}))(WidgetLayout);

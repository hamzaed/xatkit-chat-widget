import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SESSION_NAME} from '@constants';

import WidgetLayout from "./layout";
import {
  addMiniCard,
  addAudioWidget,
  addQuickButtons,
  addResponseMessage,
  addUserMessage,
  pullSession,
  setConnected,
  setPlaceholder,
  toggleChat,
  toggleInputDisabled,
  toggleMsgLoader,
  toggleDarkMode
} from "../../store/actions";

import { storeLocalSession, getLocalSession } from '../../utils/helpers'

class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullScreenMode: props.fullScreenMode
        }
    }

    componentDidMount() {
       this.initializeWidget();
    }

    initializeWidget() {
        const { dispatch, xatkitClient, storage, startMinimized, senderPlaceHolder, autoClear, buttonsPlaceHolder } = this.props

        if (!startMinimized) {
            dispatch(toggleChat());
        }
        dispatch(setPlaceholder(senderPlaceHolder));
        let localId = null
        const localSession = getLocalSession(storage);
        const lastUpdate = localSession && localSession.lastUpdate
        const sessionAge = Date.now() - lastUpdate
        if (autoClear || (sessionAge > 3*3600*1000)) {
            storage.removeItem(SESSION_NAME);
        } else {
            localId = this.getConversationId();
            localId && xatkitClient.setConversationId(localId)
        }

        xatkitClient.onConnect(
            () => {
                const conversationId = xatkitClient.getConversationId()
                if (conversationId && (conversationId === localId)) {
                    dispatch(pullSession());
                } else {
                    localId = conversationId
                    storage.removeItem(SESSION_NAME);
                }
                storeLocalSession(storage, conversationId);
                dispatch(setConnected(true))
            })

        xatkitClient.onConnectionError(
            (error) => {
                console.log(error)
                dispatch(setConnected(false))
            })

        xatkitClient.onBotMessage('text', msgObject => {
            console.log('Received bot message "' + msgObject.message + '"');
            dispatch(addResponseMessage(msgObject.message));
            if (msgObject.quickButtonValues !== undefined && msgObject.quickButtonValues.length > 0) {
                dispatch(addQuickButtons(msgObject.quickButtonValues));
                dispatch(toggleInputDisabled(true));
                dispatch(setPlaceholder(buttonsPlaceHolder));
            }
            dispatch(toggleMsgLoader(false));
        });

        xatkitClient.onBotMessage('miniCard', msgObject => {
            dispatch(addMiniCard(msgObject));
        });

        xatkitClient.onBotMessage("audio", msgObject => {
            dispatch(addAudioWidget(msgObject));
        });

        xatkitClient.onBotAction('darkMode', () => dispatch(toggleDarkMode()))
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.fullScreenMode !== nextProps.fullScreenMode) {
            return { fullScreenMode: nextProps.fullScreenMode }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.fullScreenMode !== this.state.fullScreenMode){
            this.props.dispatch(toggleChat());
        }
    }

    getConversationId() {
        const { storage } = this.props;
        const localSession = getLocalSession(storage, SESSION_NAME);
        return localSession ? localSession.conversation_id : null;
    }

    toggleConversation = () => {
        this.props.dispatch(toggleChat());
    }

    handleMessageSubmit = (event) => {
        event.preventDefault();
        const userInput = event.target.message.value;
        if (userInput.trim()) {
            console.log("Entered message: " + userInput);
            this.props.dispatch(addUserMessage('text', userInput));
        }
        event.target.message.value = '';
    }

    handleQuickButtonClicked = (event, value) => {
        const { senderPlaceHolder, dispatch } = this.props
        event.preventDefault();
        console.log("Clicked on " + value);
        dispatch(addUserMessage('button',value));
        dispatch(toggleInputDisabled(false));
        dispatch(setPlaceholder(senderPlaceHolder));
    }

    handleEventLinkClicked = (value) => {
        if(value.trim()) {
            this.props.dispatch(addUserMessage('text', value));
        }
    }

    render() {
        return (
            <WidgetLayout
                onToggleConversation={this.toggleConversation}
                onSendMessage={this.handleMessageSubmit}
                onQuickButtonClicked={this.handleQuickButtonClicked}
                onEventLinkClicked={this.handleEventLinkClicked}
                title={this.props.title}
                titleAvatar={this.props.titleAvatar}
                subtitle={this.props.subtitle}
                senderPlaceHolder={this.props.senderPlaceHolder}
                profileAvatar={this.props.profileAvatar}
                showCloseButton={this.props.showCloseButton}
                fullScreenMode={this.props.fullScreenMode}
                badge={this.props.badge}
                customLauncher={this.props.customLauncher}
                launcherImage={this.props.launcherImage}
            />
        );
    }
}

Widget.propTypes = {
    title: PropTypes.string,
    titleAvatar: PropTypes.string,
    subtitle: PropTypes.string,
    senderPlaceHolder: PropTypes.string,
    buttonsPlaceHolder: PropTypes.string,
    profileAvatar: PropTypes.string,
    showCloseButton: PropTypes.bool,
    fullScreenMode: PropTypes.bool,
    badge: PropTypes.number,
    customLauncher: PropTypes.func,
    launcherImage: PropTypes.string,
    previousInput: PropTypes.string,
    xatkitClient: PropTypes.object,
    storage: PropTypes.object
};

export default connect()(Widget);

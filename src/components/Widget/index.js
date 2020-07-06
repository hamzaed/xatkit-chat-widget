import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SESSION_NAME} from '@constants';


import WidgetLayout from './layout';
import {
  addMiniCard,
  addQuickButtons,
  addResponseMessage,
  addUserMessage,
  pullSession,
  setConnected,
  setPlaceholder,
  toggleChat,
  toggleInputDisabled,
  toggleMsgLoader
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
        const { dispatch, xatkitClient, storage, startMinimized, senderPlaceHolder, autoClear } = this.props




        if (!startMinimized) {
            dispatch(toggleChat());
        }
        dispatch(setPlaceholder(senderPlaceHolder));

        let localId = null
        const localSession = getLocalSession(storage, SESSION_NAME);
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
                storeLocalSession(storage, SESSION_NAME, conversationId);
                if (conversationId && (conversationId === localId)) {
                    dispatch(pullSession());
                }
                else {
                    localId = conversationId
                    storage.removeItem(SESSION_NAME);
                }
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
                dispatch(toggleInputDisabled());
                dispatch(setPlaceholder(buttonsPlaceHolder));
            }
            dispatch(toggleMsgLoader(false));
        });

        xatkitClient.onBotMessage('miniCard', msgObject => {
            dispatch(addMiniCard(msgObject));
        })

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.fullScreenMode !== nextProps.fullScreenMode) {
            return {fullScreenMode: nextProps.fullScreenMode}
        }
        return null
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.fullScreenMode!==this.state.fullScreenMode){
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
            this.props.dispatch(addUserMessage(userInput));
        }
        event.target.message.value = '';
    }


    handleQuickButtonClicked = (event, value) => {
        const { xatkitClient, dispatch } = this.props
        event.preventDefault();
        console.log("Clicked on " + value);
        addUserMessage(value);
        xatkitClient.send('button', value);
        dispatch(toggleInputDisabled(false));
        dispatch(setPlaceholder(this.props.senderPlaceHolder));
    }

    render() {
        return (
            <WidgetLayout
                onToggleConversation={this.toggleConversation}
                onSendMessage={this.handleMessageSubmit}
                onQuickButtonClicked={this.handleQuickButtonClicked}
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

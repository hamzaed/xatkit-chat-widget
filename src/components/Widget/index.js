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


import {storeLocalSession} from '../../utils/helpers'


class Widget extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fullScreenMode: props.fullScreenMode
        }
    }


    componentDidMount() {
        const {startMinimized, senderPlaceHolder, autoClear, dispatch, storage} = this.props

        this.handleOnConnect()
        this.handleOnConnectionError()
        if (!startMinimized) {
            dispatch(toggleChat());
        }
        dispatch(setPlaceholder(senderPlaceHolder));
        this.handleBotMessage();
        if (autoClear) {
            storage.removeItem(SESSION_NAME);
        } else {
            dispatch(pullSession());
        }
    }

    handleOnConnect() {
        const {dispatch, xatkitClient, storage} = this.props
        xatkitClient.onConnect(
            () => {
                window.xatkit_session = xatkitClient.socket.id;
                storeLocalSession(storage, SESSION_NAME, xatkitClient.socket.id);
                dispatch(setConnected(true))

            })
    }

    handleOnConnectionError() {
        const {dispatch, xatkitClient} = this.props
        xatkitClient.onConnectionError(
            (error) => {
                console.log(error)
                dispatch(setConnected(false))
            })
    }

    handleBotMessage() {
        const {buttonsPlaceHolder, dispatch, xatkitClient} = this.props
        xatkitClient.onBotMessage('text', msgObject => {
            console.log(msgObject);
            console.log('Received bot message "' + msgObject.message + '"');
            dispatch(addResponseMessage(msgObject.message));
            console.log(msgObject.quickButtonValues)
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



    toggleConversation = () => {
        this.props.dispatch(toggleChat());
    }

    handleMessageSubmit = (event) => {
        event.preventDefault();
        const userInput = event.target.message.value;
        if (userInput.trim()) {
            this.props.dispatch(addUserMessage(userInput));
            this.props.xatkitClient.send('text', userInput);
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

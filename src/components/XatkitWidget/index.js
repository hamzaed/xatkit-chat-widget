import React, {Component} from 'react';
import ConnectedWidget from '../../index';
import xatkitAvatar from '@assets/xatkit-avatar.png';
import xatkitLogoNegative from '@assets/xatkit-avatar-negative.svg';

import initXatkitClient from '../../XatkitClient'


import {
    addResponseMessage,
    addUserMessage,
    setQuickButtons,
    toggleWidget,
    toggleInputDisabled,
    toggleMsgLoader,
    toggleDarkMode,
    setPlaceholder,
    addLinkSnippetWithImg
} from '../../store/dispatcher'

import io from 'socket.io-client';
import PropTypes from "prop-types";


class XatkitWidget extends Component {

    /**
     * Constructs a new XatkitApp with the provided props.
     * <p>
     * This constructors opens a socket with the provided {@code window.xatkit_server} (or {@code localhost:5001} if
     * the server is not specified) that is used to send and receive messages.
     *
     * @param props the XatkitApp properties
     */
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            xatkit_server: this.props.server,
            connected: false
        };

        this.socket = initXatkitClient({
            server: this.props.server,
            username: this.props.username,
            hostname: this.props.hostname,
            url: this.props.url,
            origin: this.props.origin
        },()=>{
            window.xatkit_session = this.socket.id;
            this.setState({
            'connected' : true
             });
        }, (error) => {
            console.log(error)
            this.setState({
                'connected' : false
                })
        })

        this.inputRef = React.createRef();
        if (!this.props.startMinimized) {
            toggleWidget();
        }
        setPlaceholder(this.props.senderPlaceHolder);

        let buttonsPlaceholder = this.props.buttonsPlaceholder;
        this.socket.onBotMessage(msgObject => {
            console.log(msgObject);
            console.log('Received bot message "' + msgObject.message + '"');
            addResponseMessage(msgObject.message);
            console.log(msgObject.quickButtonValues)
            if (msgObject.quickButtonValues !== undefined && msgObject.quickButtonValues.length > 0) {
                setQuickButtons(msgObject.quickButtonValues);
                toggleInputDisabled();
                setPlaceholder(buttonsPlaceholder);
            }
            toggleMsgLoader(false);
        });

    }

    handleNewUserMessage = (newMessage) => {
        this.socket.send( newMessage);
    }

    handleQuickButtonClicked = (e) => {
        console.log("Clicked on " + e);
        addUserMessage(e);
        this.state.socket.emit('user_button_click', {'username': this.state.username, 'selectedValue': e});
        setQuickButtons([]);
        this.inputRef.current.focus();
        toggleInputDisabled(false);
        setPlaceholder(this.props.senderPlaceHolder);

    }

    render() {
           return( <ConnectedWidget
                title={this.props.title}
                subtitle={this.props.subtitle}
                senderPlaceHolder={this.props.senderPlaceHolder}
                handleNewUserMessage={this.handleNewUserMessage}
                handleQuickButtonClicked={this.handleQuickButtonClicked}
                profileAvatar={this.props.profileAvatar}
                launcherImage={this.props.launcherImage}
                storage={this.props.storage}
                autoClear={this.props.autoClear}

            />)}
}

XatkitWidget.propTypes = {
    server: PropTypes.string,
    username: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    startMinimized: PropTypes.bool,
    senderPlaceHolder: PropTypes.string,
    profileAvatar: PropTypes.string,
    launcherImage: PropTypes.string,
    buttonsPlaceholder: PropTypes.string,
    hostname: PropTypes.string,
    url: PropTypes.string,
    origin: PropTypes.string,
    storage: PropTypes.string,
    autoClear: PropTypes.bool
}

XatkitWidget.defaultProps = {
    server: 'http://localhost:5001',
    username: 'username',
    title: 'Xatkit Chat',
    subtitle: 'Test your Xatkit bot here!',
    startMinimized: false,
    senderPlaceHolder: 'Type a message...',
    profileAvatar: xatkitAvatar,
    launcherImage: xatkitLogoNegative,
    buttonsPlaceholder: "Choose an option",
    hostname: window.location.hostname,
    url: window.location.href,
    origin: window.location.origin
}


export default XatkitWidget;

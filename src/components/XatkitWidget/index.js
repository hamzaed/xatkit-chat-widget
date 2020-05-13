import React, {Component} from 'react';
import ConnectedWidget from '../../index';
import xatkitAvatar from '@assets/xatkit-avatar.png';
import xatkitLogoNegative from '@assets/xatkit-avatar-negative.png';


import {
    addResponseMessage,
    addUserMessage,
    setQuickButtons,
    toggleWidget,
    toggleInputDisabled,
    toggleMsgLoader,
    toggleDarkMode,
    setPlaceholder
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
        this.inputRef = React.createRef();
        if (!this.props.startMinimized) {
            toggleWidget();
        }
        setPlaceholder(this.props.senderPlaceHolder);
        const urlPattern = /(^https?:\/\/[^\/]+)\/?(.*)/i;
        /*
         * If the provided URL contains a base path the result array will contain the following information:
         * [0] full path (e.g. http://localhost:5001/test)
         * [1] server URL (e.g. http://localhost:5001)
         * [2] base path (e.g. test)
         * If the provided URL does not contain a base path the result array will contain the following information:
         * [0] full path
         * [1] server URL
         * [2] an empty string
         */
        const parsedUrl = this.props.server.match(urlPattern);
        if(parsedUrl === null) {
            /*
             * The provided URL doesn't match the pattern, we need to log an error and stop here.
             */
            console.error("The provided URL " + this.props.server + " is not a valid URL")
            return
        }
        let serverUrl = this.props.server;
        let basePath = '/socket.io';
        if (parsedUrl.length !== null && parsedUrl.length === 3) {
            if (parsedUrl[2] !== '') {
                basePath = '/' + parsedUrl[2];
            }
            serverUrl = parsedUrl[1]
        }
        const socket = io(serverUrl, {
            path: basePath
        });

        /*
         * Send additional information identifying the session when the socket connection is opened.
         */
        socket.on('connect', function() {
            socket.emit('init', {'hostname': props.hostname, 'url': props.url, 'origin': props.origin});
        });

        let buttonsPlaceholder = this.props.buttonsPlaceholder;
        socket.on('bot_message', function (msgObject) {
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

        socket.on('set_message_loader', function (setMessageLoaderObject) {
            if (setMessageLoaderObject.enableLoader === true) {
                toggleMsgLoader(true);
            }
        });

        socket.on('toggle_dark_mode', function() {
            toggleDarkMode();
        });

        this.state = {
            username: this.props.username,
            xatkit_server: this.props.server,
            socket: socket

        };


        socket.on('connect', () => {
            window.xatkit_session = socket.id
        });
    }


    handleNewUserMessage = (newMessage) => {
        this.state.socket.emit('user_message', {'message': newMessage, 'username': this.state.username});
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
        const Comp = React.forwardRef((props, ref) => (
            <ConnectedWidget
                title={props.title}
                subtitle={props.subtitle}
                senderPlaceHolder={props.senderPlaceHolder}
                handleNewUserMessage={this.handleNewUserMessage}
                handleQuickButtonClicked={this.handleQuickButtonClicked}
                profileAvatar={props.profileAvatar}
                launcherImage={props.launcherImage}
                focus={ref}

            />
        ));
        return (
            <Comp {...this.props} ref={this.inputRef}/>
        );
    }
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
    origin: PropTypes.string
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

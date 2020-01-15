import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  ConnectedWidget from '../../index';

import {addResponseMessage, toggleWidget} from '../../store/dispatcher'

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
        const server = window.xatkit_server === undefined ? 'http://localhost:5001' : window.xatkit_server;
        const username = window.xatkit_username === undefined ? 'username' : window.xatkit_username;
        const title = window.xatkit_widget_title === undefined? this.props.title:xatkit_widget_title;
        const subtitle = window.xatkit_widget_subtitle === undefined? this.props.subtitle:xatkit_widget_subtitle;
        const toggleChat = window.xatkit_start_minimized === undefined ? this.props.toggleChat : window.xatkit_start_minimized;
        if(toggleChat) {
            toggleWidget();}
        const socket = io(server);
        socket.on('bot_message', function(msgObject) {

            console.log(msgObject);
            console.log('Received bot message "' + msgObject.message + '"');
            addResponseMessage(msgObject.message);

        });
        this.state = {
            username: username,
            xatkit_server: server,
            socket: socket
        };
        this.labels = {
            title: title,
            subtitle: subtitle
        }

        socket.on('connect', () => {
            window.xatkit_session = socket.id
        });
    }


    handleNewUserMessage = (newMessage) => {

        this.state.socket.emit('user_message', {'message': newMessage, 'username': this.state.username});

    }


    render() {
        return (
            <ConnectedWidget
                title= {this.labels.title}
                subtitle= {this.labels.subtitle}
                handleNewUserMessage={this.handleNewUserMessage}

            />
        );
    }
}

XatkitWidget.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    toggleChat: PropTypes.bool,
    senderPlaceHolder: PropTypes.string
}

XatkitWidget.defaultProps = {
    title: 'Xatkit Chat',
    subtitle: 'Test your Xatkit bot here!',
    toggleChat: true,
    senderPlaceHolder: 'Type a message...'
}
export default XatkitWidget;
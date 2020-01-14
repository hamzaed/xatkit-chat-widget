import React, { Component } from 'react';
import  ConnectedWidget from '../../index';

import {addResponseMessage, toggleWidget} from '../../store/dispatcher'

import io from 'socket.io-client';

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
        toggleWidget();
        const server = window.xatkit_server === undefined ? 'http://localhost:5001' : window.xatkit_server;
        const username = window.xatkit_username === undefined ? 'username' : window.xatkit_username;
        const widget_title = window.xatkit_widget_title === undefined ? 'Xatkit Chat': window.xatkit_widget_title;
        const widget_subtitle = window.xatkit_widget_subtitle = undefined ? 'Test your Xatkit bot here!' : window.xatkit_widget_subtitl;
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
            title : widget_title,
            subtitle: widget_subtitle
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
export default XatkitWidget;
import React, { Component } from 'react';
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

        if(!this.props.startMinimized) {
            toggleWidget();}
        const urlPattern =/(^https?:\/\/[^\/]+)\/?(.*)/i;
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
        const parsedUrl = server.match(urlPattern);
        let serverUrl = server;
        let basePath = '/socket.io';
        if(parsedUrl.length !== null && parsedUrl.length === 3) {
            if(parsedUrl[2] !== '') {
                basePath = '/' + parsedUrl[2];
            }
            serverUrl = parsedUrl[1]
        }
        const socket = io(serverUrl, {
            path : basePath
        });
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


        socket.on('connect', () => {
            window.xatkit_session = socket.id
        });
    }


    handleNewUserMessage = (newMessage) => {

        this.state.socket.emit('user_message', {'message': newMessage, 'username': this.state.username});

    }
    handleQuickButtonClicked = (newMessage) => {
        //TODO
}

    render() {
        return (
            <ConnectedWidget
                title= {this.props.title}
                subtitle= {this.props.subtitle}
                senderPlaceHolder={this.props.senderPlaceHolder}
                handleNewUserMessage={this.handleNewUserMessage}
                handleQuickButtonClicked={this.handleQuickButtonClicked}

            />
        );
    }
}

XatkitWidget.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    startMinimized: PropTypes.bool,
    senderPlaceHolder: PropTypes.string
}

XatkitWidget.defaultProps = {
    title: 'Xatkit Chat',
    subtitle: 'Test your Xatkit bot here!',
    startMinimized: false,
    senderPlaceHolder: 'Type a message...'
}



export default XatkitWidget;
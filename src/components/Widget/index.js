import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleChat, addUserMessage } from '@actions';

import WidgetLayout from './layout';
import {pullSession} from "../../store/actions";
import {
  addResponseMessage,
  setPlaceholder,
  setQuickButtons,
  toggleInputDisabled, toggleMsgLoader,
  toggleWidget,
    addLinkSnippetWithImg
} from "../../store/dispatcher";
import initXatkitClient from "../../XatkitClient";


class Widget extends Component {

  constructor(props) {
    super(props);
    const {username, server, hostname, url, origin,storage} = props
    this.storage = storage === 'session'?sessionStorage:localStorage
    this.state = {
      username,
      xatkit_server: server,
      connected: false,
      previousInput : ""
    };
    this.xatkitClient = initXatkitClient({
      server,
      username,
      hostname,
      url,
      origin
    })
  }

  componentDidMount() {
    const {startMinimized, senderPlaceHolder, autoClear, dispatch}= this.props

    this.handleOnConnect()
    this.handleOnConnectionError()
    if (!startMinimized) {
      toggleWidget();
    }
    setPlaceholder(senderPlaceHolder);
    this.handleBotMessage();
    if(autoClear) {
      this.storage.clear();
    } else {
      dispatch(pullSession());
    }
  }

  handleOnConnect() {
    this.xatkitClient.onConnect(
        ()=>{
          window.xatkit_session = this.xatkitClient.socket.id;
          this.setState({
                'connected' : true
              })
        })
  }

  handleOnConnectionError(){
    this.xatkitClient.onConnectionError(
        (error) => {
          console.log(error)
          this.setState({
            'connected' : false
          })
        })
  }

  handleBotMessage(){
    const {buttonsPlaceHolder} = this.props
    this.xatkitClient.onBotMessage('text',msgObject => {
      console.log(msgObject);
      console.log('Received bot message "' + msgObject.message + '"');
      addResponseMessage(msgObject.message);
      console.log(msgObject.quickButtonValues)
      if (msgObject.quickButtonValues !== undefined && msgObject.quickButtonValues.length > 0) {
        setQuickButtons(msgObject.quickButtonValues);
        toggleInputDisabled();
        setPlaceholder(buttonsPlaceHolder);
      }
      toggleMsgLoader(false);
    });

    this.xatkitClient.onBotMessage('miniCard', msgObject => {
      addLinkSnippetWithImg(msgObject);
    })

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenMode) {
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
      this.setState({
        previousInput : userInput
      });

      this.xatkitClient.send('text',userInput);
    }
    event.target.message.value = '';
  }



  handleQuickButtonClicked = (event, value) => {
    const {username} = this.props
    event.preventDefault();
    console.log("Clicked on " + value);
    addUserMessage(value);
    this.xatkitClient.send('button',value);
    setQuickButtons([]);
    //this.inputRef.current.focus();
    toggleInputDisabled(false);
    setPlaceholder(this.props.senderPlaceHolder);
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
        autofocus={this.props.autofocus}
        customLauncher={this.props.customLauncher}
        launcherImage={this.props.launcherImage}
        focus={this.props.focus}
        previousInput={this.state.previousInput}
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
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func,
  launcherImage: PropTypes.string,
  focus: PropTypes.object,
  previousInput: PropTypes.string

};

export default connect()(Widget);

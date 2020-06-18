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
  toggleWidget
} from "../../store/dispatcher";
import initXatkitClient from "../../XatkitClient";


class Widget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      xatkit_server: this.props.server,
      connected: false,
      previousInput : ""
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

  componentDidMount() {

    this.props.dispatch(pullSession());
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

      this.socket.send( userInput);
    }
    event.target.message.value = '';
  }



  handleQuickButtonClicked = (event, value) => {
    event.preventDefault();
    console.log("Clicked on " + value);
    addUserMessage(value);
    this.state.socket.emit('user_button_click', {'username': this.state.username, 'selectedValue': value});
    setQuickButtons([]);
    this.inputRef.current.focus();
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

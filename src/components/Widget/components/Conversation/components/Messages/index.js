import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { hideAvatar } from '@actions';
import { scrollToBottom } from '@utils/helpers';

import Loader from './components/Loader';
import './styles.scss';

import xatkitAvatar from '@assets/xatkit-avatar.png'
import xatkitAvatarWhite from '@assets/xatkit-avatar-white.png'
import Message from './components/Message'
import MiniCard from './components/MiniCard'

import {MESSAGES_TYPES} from "@constants";

class Messages extends Component {

  componentDidMount() {
    scrollToBottom(this.$message);
  }

  componentDidUpdate() {
    scrollToBottom(this.$message);
  }

  $message = null

  getComponentToRender = (message, index, isLast) => {
    const ComponentToRender = (() => {
      switch (message.get('type')) {
        case MESSAGES_TYPES.TEXT: {
          return Message;
        }
        case MESSAGES_TYPES.MINI_CARD:
          return MiniCard;
        default:
          return null;
      }
    })();
    if (message.get('type') === 'component') {
      return <ComponentToRender id={index} {...message.get('props')} isLast={isLast} />;
    }
    return <ComponentToRender id={index} message={message} isLast={isLast} />;

  }


  shouldRenderAvatar = (message, index) => {
    const previousMessage = this.props.messages.get(index - 1);
    if (message.get('showAvatar') && previousMessage.get('showAvatar')) {
      this.props.dispatch(hideAvatar(index));
    }
  }

  getProfileAvatar = () => {
    if(this.props.darkMode === true) {
      if (this.props.profileAvatar === xatkitAvatar) {
        return xatkitAvatarWhite
      }
    }
    return this.props.profileAvatar;
  }

  render() {
    const { messages, profileAvatar, typing, connected } = this.props;
    return (
      <div id="xatkit-messages" className={"xatkit-messages-container" + (this.props.darkMode === true ? " dark-mode" : "")} ref={msg => this.$message = msg}>
        {!connected &&
        <div className="xatkit-server-error">
          <div className="xatkit-error-message">Trying to reach the server...</div></div>}
        {messages.map((message, index) =>
          <div className="xatkit-message" key={index}>
            {profileAvatar &&
              message.get('showAvatar') &&
              <img src={this.getProfileAvatar()} className="xatkit-avatar" alt="profile" />
            }
            {this.getComponentToRender(message)}
          </div>
        )}
        <Loader typing={typing} />
      </div>
    );
  }
}


Messages.propTypes = {
  messages: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  darkMode: PropTypes.bool,
  profileAvatar: PropTypes.string,
  connected: PropTypes.bool
};

export default connect(store => ({
  messages: store.messages,
  typing: store.behavior.get('msgLoader'),
  connected: store.behavior.get('connected')


}))(Messages);

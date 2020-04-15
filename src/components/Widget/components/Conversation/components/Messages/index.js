import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { hideAvatar } from '@actions';
import { scrollToBottom } from '@utils/messages';

import Loader from './components/Loader';
import './styles.scss';

import xatkitAvatar from '@assets/xatkit-avatar.png'
import xatkitAvatarWhite from '@assets/xatkit-avatar-white.png'

class Messages extends Component {
  componentDidMount() {
    scrollToBottom(this.$message);
  }

  componentDidUpdate() {
    scrollToBottom(this.$message);
  }

  $message = null

  getComponentToRender = message => {
    const ComponentToRender = message.get('component');
    const previousMessage = this.props.messages.get()
    if (message.get('type') === 'component') {
      return <ComponentToRender {...message.get('props')} />;
    }
    return <ComponentToRender message={message} darkMode={this.props.darkMode} />;
  };

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
    const { messages, profileAvatar, typing } = this.props;
    return (
      <div id="xatkit-messages" className={"xatkit-messages-container" + (this.props.darkMode === true ? " dark-mode" : "")} ref={msg => this.$message = msg}>
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
  profileAvatar: PropTypes.string
};

export default connect(store => ({
  messages: store.messages,
  typing: store.behavior.get('msgLoader'),
}))(Messages);

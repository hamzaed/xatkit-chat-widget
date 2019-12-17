import React, { Component } from 'react';
import PropTypes from 'prop-types';

import send from '@assets/send_button.svg';
import xatkit from '@assets/xatkit-logo.png';

import './style.scss';

class Sender extends Component{
  input = React.createRef();

  componentDidUpdate() {
    this.input.current.focus();
  }

  render() {
    const { sendMessage, placeholder, disabledInput, autofocus } = this.props;
    return (
        <div>
          <form className="rcw-sender" onSubmit={sendMessage}>
            <input type="text" className="rcw-new-message" name="message" placeholder={placeholder}
                   disabled={disabledInput} autoFocus={autofocus} autoComplete="off" ref={this.input}/>
            <button type="submit" className="rcw-send">
              <img src={send} className="rcw-send-icon" alt="send"/>
            </button>
          </form>
          <div className="xatkit">
            <a href="https://xatkit.com/" rel="nofollow" target="_blank"><img src={xatkit} className="xatkit-icon" alt="Xatkit"></img></a>
          </div>
        </div>
    );
  }

}

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
  autofocus: PropTypes.bool
};

export default Sender;

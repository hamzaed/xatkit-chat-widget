import React, { Component } from 'react';
import PropTypes from 'prop-types';

import send from '@assets/send_button.svg';
import xatkit from '@assets/built-with-xatkit.svg';

import './style.scss';

class Sender extends Component{

    constructor(props) {
        super(props);
        this.input = this.props.focus?React.createRef():this.props.focus;
    }

  componentDidUpdate() {

      this.input.current.focus();
  }

  render() {
    const { sendMessage, placeholder, disabledInput, autofocus, focus } = this.props;
    return (
        <div>
          <form className="rcw-sender" onSubmit={sendMessage}>
            <input type="text" className="rcw-new-message" name="message" placeholder={placeholder}
                   disabled={disabledInput} autoFocus={autofocus} autoComplete="off" ref={focus}/>
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
  autofocus: PropTypes.bool,
    focus: PropTypes.object
};

export default Sender;

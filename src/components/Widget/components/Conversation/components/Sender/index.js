import React, { Component } from 'react';
import PropTypes from 'prop-types';
import send from '@assets/send_button.svg';
import xatkit from '@assets/built-with-xatkit.svg';
import xatkitWhite from '@assets/built-with-xatkit-white.svg'
import './style.scss';

class Sender extends Component{

    constructor(props) {
        super(props);
        this.input = !this.props.focus?React.createRef():this.props.focus;
    }

  componentDidUpdate() {
      this.input.current.focus();
  }

    getXatkitLogo = () => {
        if(this.props.darkMode === true) {
            return xatkitWhite
        } else {
            return xatkit
        }
    };

  render() {
    const { sendMessage, placeholder, disabledInput, autofocus, focus } = this.props;
    return (
        <div>
          <form className={"rcw-sender" + (this.props.darkMode === true ? " dark-mode" : "")} onSubmit={sendMessage}>
            <input type="text" className={"rcw-new-message" + (this.props.darkMode === true ? " dark-mode" : "")} name="message" placeholder={placeholder}
                   disabled={disabledInput} autoFocus={autofocus} autoComplete="off" ref={focus}/>
            <button type="submit" className={"rcw-send" + (this.props.darkMode === true ? " dark-mode" : "")}>
              <img src={send} className="rcw-send-icon" alt="send"/>
            </button>
          </form>
          <div className={"xatkit" + (this.props.darkMode === true ? " dark-mode" : "")}>
            <a href="https://xatkit.com/" rel="nofollow" target="_blank"><img src={this.getXatkitLogo()} className={"xatkit-icon" + (this.props.darkMode === true ? " dark-mode" : "")} alt="Xatkit"/></a>
          </div>
        </div>
    );
  }

}

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
    darkMode: PropTypes.bool,
  autofocus: PropTypes.bool,
    focus: PropTypes.object
};

export default Sender;
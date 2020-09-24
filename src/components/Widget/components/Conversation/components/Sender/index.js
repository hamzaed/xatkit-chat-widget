import React, {Component} from 'react';
import PropTypes from 'prop-types';
import send from '@assets/send_button.svg';
import xatkit from '@assets/built-with-xatkit.svg';
import xatkitWhite from '@assets/built-with-xatkit-white.svg'
import './style.scss';
import {connect} from 'react-redux';
import ImmutablePropTypes from "react-immutable-proptypes";

class Sender extends Component {

    constructor(props) {
        super(props);
        this.input = React.createRef()
        this.state = {
            textInput: "",
            messages: props.messages? props.messages : [],
            currentMessageIndex: 0
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.getUserMessages = this.getUserMessages.bind(this)
        this.userMessages = this.getUserMessages()
    }

    componentDidMount() {
        this.input.current.focus()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.messages !== prevState.messages) {
            this.userMessages = this.getUserMessages()
        }
        this.input.current.focus()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.messages !== nextProps.messages) {
            return {messages: nextProps.messages}
        }
        return null
    }

    getUserMessages = () => {
        return this.state.messages.filter(v => {
            return v.get("sender") === "client" && v.get("type") === "text"
        }).map(v => {
            return v.get("text")
        })
    }
    getXatkitLogo = () => {
        if (this.props.darkMode === true) {
            return xatkitWhite
        } else {
            return xatkit
        }
    }

    onKeyDown = (e) => {
        let index = this.state.currentMessageIndex
        const size = this.userMessages.size
        if (e.key === 'ArrowUp' && this.props.disabledInput === false && index < size) {
            e.preventDefault();
            index++
            const inputText = this.userMessages.get(this.userMessages.size - index)
            this.setState({
                textInput: inputText,
                currentMessageIndex: index
            })

        } else if (e.key === 'ArrowDown' && this.props.disabledInput === false && index > 0) {
            index--
            const inputText = !index ? "" : this.userMessages.get(this.userMessages.size - index)
            this.setState({
                textInput: inputText,
                currentMessageIndex: index
            })
        }
    };

    /*
     * This is required to make sure inputs are added to the text field.
     */
    onChange = (e) => {
        this.setState({
            textInput: e.target.value
        });
    };

    /*
     * Reset the state before propagating, otherwise the last input remains visible.
     */
    onSubmit = (e) => {
        this.setState({
            textInput: "",
            currentMessageIndex: 0
        });
        this.props.sendMessage(e)
    }

    render() {
        const {placeholder, disabledInput, autofocus} = this.props;
        return (
            <div>
                <form className={"xatkit-sender" + (this.props.darkMode === true ? " dark-mode" : "")}
                      onSubmit={this.onSubmit}>
                    <input type="text"
                           className={"xatkit-new-message" + (this.props.darkMode === true ? " dark-mode" : "")}
                           name="message" placeholder={placeholder}
                           disabled={disabledInput} autoFocus={autofocus} autoComplete="off" ref={this.input}
                           onKeyDown={this.onKeyDown} value={this.state.textInput} onChange={this.onChange}/>
                    <button type="submit"
                            className={"xatkit-send" + (this.props.darkMode === true ? " dark-mode" : "")}>
                        <img src={send} className="xatkit-send-icon" alt="send"/>
                    </button>
                </form>
                <div className={"xatkit" + (this.props.darkMode === true ? " dark-mode" : "")}>
                    <a href="https://xatkit.com/" rel="nofollow noreferrer" target="_blank"><img src={this.getXatkitLogo()}
                                                                                      className={"xatkit-icon" + (this.props.darkMode === true ? " dark-mode" : "")}
                                                                                      alt="Xatkit"/></a>
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
    messages: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};


export default connect(store => ({
    messages: store.messages
}))(Sender);

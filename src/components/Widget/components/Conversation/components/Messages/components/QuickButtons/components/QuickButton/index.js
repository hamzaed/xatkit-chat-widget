import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import {connect} from "react-redux";

import { setQuickButtonClicked } from "@actions"

class QuickButton extends Component {
    constructor(props) {
        super(props);
        this.handleQuickButtonClicked = this.handleQuickButtonClicked.bind(this)
    }

    handleQuickButtonClicked(event){
        const { onQuickButtonClicked, button, quickButtonsIndex, buttonIndex, dispatch } = this.props;
        dispatch(setQuickButtonClicked(quickButtonsIndex,buttonIndex))
        onQuickButtonClicked(event, button.get('value'))
    }


    render() {
        const { darkMode, button, disabled } = this.props
        return (<button
            className={"xatkit-quick-button" + (darkMode ? " dark-mode" : "") + (button.get("clicked")? " xatkit-quick-button-selected" : "")}
            onClick={event => this.handleQuickButtonClicked(event)}
            disabled={disabled}>
            {button.get('label')}
        </button>)
    }
}

QuickButton.propTypes = {
    button: PropTypes.object,
    onQuickButtonClicked: PropTypes.func,
    buttonIndex: PropTypes.number,
    disabled: PropTypes.bool,
    darkMode: PropTypes.bool
};

export default connect()(QuickButton);

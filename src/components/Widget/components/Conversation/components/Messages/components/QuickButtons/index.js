import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import './style.scss';
import PropTypes from 'prop-types';
import QuickButton from "./components/QuickButton";


class QuickButtons extends Component {
  constructor(props) {
    super(props)
    this.getComponentToRender = this.getComponentToRender.bind(this);
  }

  getComponentToRender(button) {
    return (
      <QuickButton
        onQuickButtonClicked={this.props.onQuickButtonClicked}
        button={button}
        disabled={!this.props.isLast}
        //darkMode={this.props.darkMode}
      />
    );
  }

  render() {
    const {message, isLast} = this.props
    if (!message.get('buttons').size) {
      return null;
    }

    return (
      <div className="xatkit-quick-buttons-container">
        <ul className="xatkit-quick-buttons">
          {
            message.get('buttons').map((button, index) =>
              <li className="xatkit-quick-list-button" key={index}>
                {this.getComponentToRender(button)}
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}



export default QuickButtons;

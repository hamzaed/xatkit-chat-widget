import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class QuickButton extends PureComponent {
  render() {
    return (
      <button
        className={"xatkit-quick-button" + (this.props.darkMode === true ? " dark-mode" : "")}
        onClick={(event) => this.props.onQuickButtonClicked(event, this.props.button.get('value'))}
      >
        {this.props.button.get('label')}
      </button>
    )
  }
}

QuickButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  darkMode : PropTypes.bool
};

export default QuickButton;

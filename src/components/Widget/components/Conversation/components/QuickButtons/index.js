import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import './style.scss';
import PropTypes from 'prop-types';


class QuickButtons extends Component {
  constructor(props) {
    super(props)
    this.getComponentToRender = this.getComponentToRender.bind(this);
  }

  getComponentToRender(button) {
    const ComponentToRender = button.get('component');
    return (
      <ComponentToRender
        onQuickButtonClicked={this.props.onQuickButtonClicked}
        button={button}
        darkMode={this.props.darkMode}
      />
    );
  }

  render() {
    if (!this.props.buttons.size) {
      return null;
    }

    return (
      <div className={"xatkit-quick-buttons-container" + (this.props.darkMode === true ? " dark-mode" : "")}>
        <ul className="xatkit-quick-buttons">
          {
            this.props.buttons.map((button, index) =>
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

QuickButtons.propTypes = {
  buttons: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  darkMode: PropTypes.bool
};


export default connect((store) => ({
  buttons: store.quickButtons
}))(QuickButtons);

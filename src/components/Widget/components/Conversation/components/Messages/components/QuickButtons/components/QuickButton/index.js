import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class QuickButton extends PureComponent {
    constructor(props) {
        super(props);
        this.getComponentToRender = this.getComponentToRender.bind(this)
    }


    getComponentToRender() {
        const {darkMode, onQuickButtonClicked, button, disabled} = this.props
        if (!disabled) {
            return (<button
                className={"xatkit-quick-button" + (darkMode ? " dark-mode" : "")}
                onClick={(event) => onQuickButtonClicked(event, button.get('value'))}>
                {button.get('label')}
            </button>)
        }

        return (<button
            className={"xatkit-quick-button" + (darkMode ? " dark-mode" : "")}
            onClick={(event) => onQuickButtonClicked(event, button.get('value'))}
            disabled>
            {button.get('label')}
        </button>)
    }

    render() {

        return (
            this.getComponentToRender()
        )
    }
}

QuickButton.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    darkMode: PropTypes.bool
};

export default QuickButton;

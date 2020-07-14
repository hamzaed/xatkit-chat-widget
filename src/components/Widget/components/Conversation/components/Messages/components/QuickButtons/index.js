import React, {Component} from 'react';
import './style.scss';
import QuickButton from "./components/QuickButton";


class QuickButtons extends Component {
    constructor(props) {
        super(props)
        this.getComponentToRender = this.getComponentToRender.bind(this);
    }

    getComponentToRender(button, index) {
        return (
            <QuickButton
                onQuickButtonClicked={this.props.onQuickButtonClicked}
                button={button}
                disabled={!this.props.isLast}
                quickButtonsIndex={this.props.index}
                buttonIndex={index}
                darkMode={this.props.darkMode}
            />
        );
    }

    render() {
        const { message, darkMode } = this.props
        if (!message.get('buttons').size) {
            return null;
        }

        return (
            <div className={"xatkit-quick-buttons-container"+ (darkMode ? " dark-mode" : "")}>
                <ul className="xatkit-quick-buttons">
                    {
                        message.get('buttons').map((button, index) =>
                            <li className="xatkit-quick-list-button" key={index}>
                                {this.getComponentToRender(button,index)}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}


export default QuickButtons;

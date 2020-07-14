import React, {PureComponent} from 'react';
import {PROP_TYPES} from '@constants';

import './styles.scss';

class Snippet extends PureComponent {
    render() {
        return (
            <div className="xatkit-snippet">
                <h5 className="xatkit-snippet-title">
                    {this.props.message.get('title')}
                </h5>
                <div className="xatkit-snippet-details">
                    <a href={this.props.message.get('link')} target={this.props.message.get('target')}
                       className="xatkit-link">
                        {this.props.message.get('link')}
                    </a>
                </div>
            </div>
        );
    }
}

Snippet.propTypes = {
    message: PROP_TYPES.SNIPPET
};

export default Snippet;

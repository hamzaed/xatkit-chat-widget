import React, {PureComponent} from 'react';
import { PROP_TYPES } from '@constants';

import './styles.scss'

class SnippetWithImg extends PureComponent {
    render() {
        return (
            <div className="xatkit-img-snippet">
                <a href={this.props.message.get('link')} target={this.props.message.get('target')}><img className="xatkit-img-snippet-img" src={this.props.message.get('img')}/></a>
                <a className="xatkit-img-snippet-title" href={this.props.message.get('link')} target={this.props.message.get('target')}>{this.props.message.get('title')}</a>
            </div>
        );
    }
}

SnippetWithImg.propTypes = {
    title: PROP_TYPES.SNIPPET_WITH_IMG
};

export default SnippetWithImg;
import React, {PureComponent} from 'react';
import {PROP_TYPES} from '@constants';

import './styles.scss'
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

class MiniCard extends PureComponent {

    render() {
        const sanitizedHTML = markdownIt()
            .use(markdownItSup)
            .use(markdownItSanitizer)
            .use(markdownItLinkAttributes, {attrs: {target: '_blank', rel: 'noopener'}})
            .renderInline(this.props.message.get('title'));

        return (
            <div className="xatkit-img-snippet">
                <a href={this.props.message.get('link')} target={this.props.message.get('target')}><img
                    className="xatkit-img-snippet-img" src={this.props.message.get('img')}/></a>
                <a className="xatkit-img-snippet-title" href={this.props.message.get('link')}
                   target={this.props.message.get('target')}>{sanitizedHTML}</a>
            </div>
        );
    }
}

MiniCard.propTypes = {
    message: PROP_TYPES.MINI_CARD
};

export default MiniCard;

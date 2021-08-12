import React, {PureComponent} from 'react';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import {PROP_TYPES} from '@constants';

import './styles.scss';
import PropTypes from "prop-types";

class Message extends PureComponent {

    handleClick(e) {
        const {onEventLinkClicked} = this.props;
        const el = e.target.closest("a");
        if (el && e.currentTarget.contains(el)) {
            if (el.href.includes("##")) {
                e.preventDefault();
                const event = el.href.slice(el.href.indexOf("##") + 2);
                onEventLinkClicked(decodeURIComponent(event)
                    .replaceAll("+", " ")
                    .replaceAll("**", ""))
            }
        }
    }

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const sanitizedHTML = markdownIt()
            .use(markdownItSup)
            .use(markdownItSanitizer)
            .use(markdownItLinkAttributes, {attrs: {target: '_blank', rel: 'noopener'}})
            .render(this.props.message.get('text'));

        return (
            <div
                className={`xatkit-${this.props.message.get('sender')}` + (this.props.darkMode === true ? " dark-mode" : "")}>
                <div className="xatkit-message-text" dangerouslySetInnerHTML={{__html: sanitizedHTML}}
                     onClick={this.handleClick}/>
            </div>
        );
    }
}

Message.propTypes = {
    message: PROP_TYPES.MESSAGE,
    darkMode: PropTypes.bool,
    onEventLinkClicked: PropTypes.func
};

export default Message;

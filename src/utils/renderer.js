import ReactDOM from "react-dom";
import React from "react";
import XatkitWidget from "../components/XatkitWidget";

export function renderDefaultXatkitWidget() {
    ReactDOM.render(<XatkitWidget />, document.getElementById('xatkit-chat'));
}

export function renderXatkitWidget(elementId,title,subtitle,toggleChat, senderPlaceholder ) {
    ReactDOM.render(<XatkitWidget
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        senderPlaceHolder={senderPlaceholder}
    />, document.getElementById(elementId));
}
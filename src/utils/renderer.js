import ReactDOM from "react-dom";
import React from "react";
import XatkitWidget from "../components/XatkitWidget";

export function renderXatkitWidget(server, username,elementId,title,subtitle,startMinimized, senderPlaceholder, profileAvatar, launcherImage ) {
    const domElement = elementId === undefined ? document.getElementById('xatkit-chat') : document.getElementById(elementId);
    ReactDOM.render(<XatkitWidget
        server={server}
        username={username}
        title={title}
        subtitle={subtitle}
        startMinimized={startMinimized}
        senderPlaceHolder={senderPlaceholder}
        profileAvatar={profileAvatar}
        launcherImage={launcherImage}
    />, domElement);
}

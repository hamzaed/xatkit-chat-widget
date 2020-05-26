import ReactDOM from "react-dom";
import React from "react";
import XatkitWidget from "../components/XatkitWidget";
import xatkitAvatar from '@assets/xatkit-avatar.png';

export function renderXatkitWidget(server, username,elementId,title,subtitle,startMinimized, senderPlaceholder, profileAvatar, launcherImage, buttonsPlaceholder, hostname, url, origin) {
    /*
     * Check if the provided profileAvatar is an empty string, in this case we display the default Xatkit logo and log
     * and error in the console.
     */
    let avatar = profileAvatar;
    if(avatar === "") {
        console.log("Empty string provided as avatar, using the default Xatkit avatar");
        avatar = xatkitAvatar;
    }
    const domElement = elementId === undefined ? document.getElementById('xatkit-chat') : document.getElementById(elementId);
    ReactDOM.render(<XatkitWidget
        server={server}
        username={username}
        title={title}
        subtitle={subtitle}
        startMinimized={startMinimized}
        senderPlaceHolder={senderPlaceholder}
        profileAvatar={avatar}
        launcherImage={launcherImage}
        buttonsPlaceholder={buttonsPlaceholder}
        hostname={hostname}
        url={url}
        origin={origin}
    />, domElement);
}

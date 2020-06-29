import ReactDOM from "react-dom";
import React from "react";
import ConnectedWidget from "./src";
import xatkitAvatar from '@assets/xatkit-avatar.png';
import xatkitLogoNegative from '@assets/xatkit-avatar-negative.svg';


const renderXatkitWidget = (args) => {

    /*
    * Check if the provided profileAvatar is an empty string, in this case we display the default Xatkit logo and log
    * and error in the console.
    */
    let avatar = args.widget?.images?.profileAvatar;
    if (avatar === "") {
        console.log("Empty string provided as avatar, using the default Xatkit avatar");
        avatar = xatkitAvatar;
    }

    /*
     * Check if the provided launcherImage is an empty string, in this case we display the default Xatkit logo and log
     * and error in the console.
     */
    let launcher = args.widget?.images?.launcherImage;
    if (launcher === "") {
        console.log("Empty string provided as launcher, using the default Xatkit launcher");
        launcher = xatkitLogoNegative;
    }

    const domElement = args.elementId === undefined ? document.getElementById('xatkit-chat') : document.getElementById(args.elementId);

    ReactDOM.render(<ConnectedWidget
        server={args.server}
        username={args.username}
        title={args.widget?.title}
        subtitle={args.widget?.subtitle}
        startMinimized={args.widget?.startMinimized}
        senderPlaceHolder={args.widget?.placeHolders?.sender}
        profileAvatar={avatar}
        launcherImage={launcher}
        buttonsPlaceholder={args.widget?.placeHolders?.buttons}
        hostname={args.location?.hostname}
        url={args.location?.url}
        origin={args.location?.origin}
        storage={args.storage?.location}
        autoClear={args.storage?.autoClear}
    />, domElement);
}

export {
    renderXatkitWidget
}

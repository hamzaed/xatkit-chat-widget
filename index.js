import ReactDOM from "react-dom";
import React from "react";
import XatkitWidget from "./src/components/XatkitWidget";
import xatkitAvatar from '@assets/xatkit-avatar.png';
import xatkitLogoNegative from '@assets/xatkit-avatar-negative.svg';


const renderXatkitWidget = (args) => {

    /*
    * Check if the provided profileAvatar is an empty string, in this case we display the default Xatkit logo and log
    * and error in the console.
    */
    let avatar = args.profileAvatar;
    if(avatar === "") {
      console.log("Empty string provided as avatar, using the default Xatkit avatar");
      avatar = xatkitAvatar;
    }

    /*
     * Check if the provided launcherImage is an empty string, in this case we display the default Xatkit logo and log
     * and error in the console.
     */
    let launcher = args.launcherImage;
    if(launcher === "") {
      console.log("Empty string provided as launcher, using the default Xatkit launcher");
      launcher = xatkitLogoNegative;
    }

    const domElement = args.elementId === undefined ? document.getElementById('xatkit-chat') : document.getElementById(elementId);

    ReactDOM.render(<XatkitWidget
        server={args.server}
        username={args.username}
        title={args.title}
        subtitle={args.subtitle}
        startMinimized={args.startMinimized}
        senderPlaceHolder={args.senderPlaceHolder}
        profileAvatar={avatar}
        launcherImage={launcher}
        buttonsPlaceholder={args.buttonsPlaceholder}
        hostname={args.hostname}
        url={args.url}
        origin={args.origin}
    />, domElement);
}

export {
  renderXatkitWidget
}

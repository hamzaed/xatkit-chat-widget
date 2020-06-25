
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Widget from './components/Widget';
import {initStore} from './store/store';
import xatkitAvatar from '@assets/xatkit-avatar.png';
import xatkitLogoNegative from '@assets/xatkit-avatar-negative.svg';

let store = null;
initStore(localStorage);


const ConnectedWidget = props => {
const storage = props.storage === 'session'?sessionStorage:localStorage
  if(!store){
    store = initStore(storage)
  }
  return(
      <Provider store={store}>
        <Widget
            username={props.username}
            startMinimized={props.startMinimized}
            buttonsPlaceHolder={props.buttonsPlaceHolder}
            hostname={props.hostname}
            url={props.url}
            origin={props.origin}
            title={props.title}
            subtitle={props.subtitle}
            senderPlaceHolder={props.senderPlaceHolder}
            profileAvatar={props.profileAvatar}
            launcherImage={props.launcherImage}
            storage={props.storage}
            autoClear={props.autoClear}
            server={props.server}
            titleAvatar={props.titleAvatar}
            showCloseButton={props.showCloseButton}
            fullScreenMode={props.fullScreenMode}
            badge={props.badge}
            autofocus={props.autofocus}
            customLauncher={props.launcher}

        />
      </Provider>)
    }

ConnectedWidget.propTypes = {
  server: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  startMinimized: PropTypes.bool,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  launcherImage: PropTypes.string,
  buttonsPlaceHolder: PropTypes.string,
  hostname: PropTypes.string,
  url: PropTypes.string,
  origin: PropTypes.string,
  storage: PropTypes.string,
  autoClear: PropTypes.bool,
  titleAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  launcher: PropTypes.func,
  focus: PropTypes.object
};

ConnectedWidget.defaultProps = {
  showCloseButton: true,
  fullScreenMode: false,
  badge: 0,
  autofocus: true,
  server: 'http://localhost:5001',
  username: 'username',
  title: 'Xatkit Chat',
  subtitle: 'Test your Xatkit bot here!',
  startMinimized: false,
  senderPlaceHolder: 'Type a message...',
  profileAvatar: xatkitAvatar,
  launcherImage: xatkitLogoNegative,
  buttonsPlaceHolder: "Choose an option",
  hostname: window.location.hostname,
  url: window.location.href,
  origin: window.location.origin,
  storage: 'local'
};



export {
  ConnectedWidget as default,
    store
};

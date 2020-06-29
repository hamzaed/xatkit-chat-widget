import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import close from '@assets/clear-button.svg';
import Badge from './components/Badge';
import './style.scss';

const Launcher = ({toggle, chatOpened, badge, launcherImage, darkMode}) =>
    <button type="button"
            className={(chatOpened ? 'xatkit-launcher xatkit-hide-sm' : 'xatkit-launcher') + (darkMode === true ? " dark-mode" : "")}
            onClick={toggle}>
        <Badge badge={badge}/>
        {chatOpened ?
            <img src={close} className="xatkit-close-launcher" alt=""/> :
            <img src={launcherImage} className="xatkit-open-launcher" alt=""/>
        }
    </button>;

Launcher.propTypes = {
    toggle: PropTypes.func,
    chatOpened: PropTypes.bool,
    badge: PropTypes.number,
    launcherImage: PropTypes.string,
    darkMode: PropTypes.bool
};

export default connect(store => ({
    chatOpened: store.behavior.get('showChat')
}))(Launcher);

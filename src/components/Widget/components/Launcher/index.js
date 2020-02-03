import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import openLauncher from '@assets/xatkit-avatar-negative.png';
import close from '@assets/clear-button.svg';
import Badge from './components/Badge';
import './style.scss';

const Launcher = ({ toggle, chatOpened, badge,launcherImage}) =>
  <button type="button" className={chatOpened ? 'rcw-launcher rcw-hide-sm' : 'rcw-launcher'} onClick={toggle}>
    <Badge badge={badge} />
    {chatOpened ?
      <img src={close} className="rcw-close-launcher" alt="" /> :
      <img src={launcherImage.undefined?openLauncher:launcherImage} className="rcw-open-launcher" alt="" />
    }
  </button>;

Launcher.propTypes = {
  toggle: PropTypes.func,
  chatOpened: PropTypes.bool,
  badge: PropTypes.number,
  launcherImage: PropTypes.string
};

export default connect(store => ({
  chatOpened: store.behavior.get('showChat')
}))(Launcher);

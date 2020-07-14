import React from 'react';
import PropTypes from 'prop-types';

import close from '@assets/clear-button.svg';

import './style.scss';

const Header = ({title, subtitle, toggleChat, darkMode, showCloseButton, titleAvatar}) =>
    <div className={"xatkit-header" + (darkMode === true ? " dark-mode" : "")}>
        {showCloseButton &&
        <button className={ "xatkit-close-button" +  (darkMode ? " dark-mode" : "") } onClick={toggleChat}>
            <img src={close} className="xatkit-close" alt="close"/>
        </button>
        }
        <h4 className="xatkit-title">
            {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile"/>}
            {title}
        </h4>
        <span>{subtitle}</span>
    </div>;

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    toggleChat: PropTypes.func,
    darkMode: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    titleAvatar: PropTypes.string
};
export default Header;

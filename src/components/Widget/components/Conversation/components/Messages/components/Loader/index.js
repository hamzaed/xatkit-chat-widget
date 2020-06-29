import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Loader = props =>
    <div className={`xatkit-loader ${props.typing && 'active'}`}>
        <div className="xatkit-loader-container">
            <span className="xatkit-loader-dots"></span>
            <span className="xatkit-loader-dots"></span>
            <span className="xatkit-loader-dots"></span>
        </div>
    </div>;

Loader.propTypes = {
    typing: PropTypes.bool,
};

export default Loader;

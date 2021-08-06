import React, {PureComponent} from 'react';
import {PROP_TYPES} from '@constants';

import './styles.scss';


class AudioWidget extends PureComponent {


    render() {
        return(
            <div className="xatkit-audio-widget-container">
                <audio
                    controls
                    src={this.props.message.get("src")}>
                    Your browser does not support the
                <code>audio</code> element.
            </audio>
            </div>
        )
    }
}

AudioWidget.propTypes = {
    message: PROP_TYPES.AUDIO_WIDGET
};

export default AudioWidget;
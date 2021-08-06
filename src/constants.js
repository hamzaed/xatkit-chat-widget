import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const MESSAGE_SENDER = {
    CLIENT: 'client',
    RESPONSE: 'response'
};

export const MESSAGES_TYPES = {
    TEXT: 'text',
    MINI_CARD: 'miniCard',
    AUDIO_WIDGET: 'audio',
    QUICK_BUTTONS: 'quickButtons',
    SNIPPET: {
        LINK: 'snippet'
    },
    CUSTOM_COMPONENT: 'component'
};

export const PROP_TYPES = {
    MESSAGE: ImmutablePropTypes.contains({
        type: PropTypes.oneOf([
            MESSAGES_TYPES.TEXT,
            MESSAGES_TYPES.SNIPPET.LINK
        ]),
        text: PropTypes.string,
        sender: PropTypes.oneOf([
            MESSAGE_SENDER.CLIENT,
            MESSAGE_SENDER.RESPONSE
        ])
    }),

    SNIPPET: ImmutablePropTypes.contains({
        type: PropTypes.oneOf([
            MESSAGES_TYPES.TEXT,
            MESSAGES_TYPES.SNIPPET.LINK
        ]),
        title: PropTypes.string,
        link: PropTypes.string,
        sender: PropTypes.oneOf([
            MESSAGE_SENDER.CLIENT,
            MESSAGE_SENDER.RESPONSE
        ])
    }),

    MINI_CARD: ImmutablePropTypes.contains({
        type: PropTypes.exact(MESSAGES_TYPES.MINI_CARD),
        title: PropTypes.string,
        link: PropTypes.string,
        img: PropTypes.string,
        sender: PropTypes.oneOf([
            MESSAGE_SENDER.CLIENT,
            MESSAGE_SENDER.RESPONSE
        ])
    }),

    AUDIO_WIDGET: ImmutablePropTypes.contains({
        type: PropTypes.exact(MESSAGES_TYPES.AUDIO_WIDGET),
        src: PropTypes.string,
        sender: PropTypes.oneOf([
            MESSAGE_SENDER.CLIENT,
            MESSAGE_SENDER.RESPONSE
        ])
    })
};

export const SESSION_NAME = 'XATKIT_SESSION'

export const MESSAGE_BOX_SCROLL_DURATION = 400;

import React from 'react';
import {List} from 'immutable';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {createNewMessage} from '@utils/helpers';

import Messages from '../index';
import Message from '../components/Message';

configure({adapter: new Adapter()});

describe('<Messages />', () => {
    const message = createNewMessage('Response message 1');


    const responseMessages = List([message]);

    const messagesComponent = shallow(
        <Messages.WrappedComponent
            messages={responseMessages}
        />
    );

    it('should render a Message component', () => {
        expect(messagesComponent.find(Message)).toHaveLength(1);
    });

});

import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Launcher from '../index';
import Badge from '../components/Badge';

import openLauncher from '@assets/xatkit-avatar-negative.png';

configure({adapter: new Adapter()});

describe('<Launcher />', () => {
    const createMessageComponent = ({toggle, chatOpened, badge = 0, launcherImage}) =>
        shallow(<Launcher.WrappedComponent
            toggle={toggle}
            chatOpened={chatOpened}
            badge={badge}
            launcherImage={launcherImage}
        />);

    it('should call toggle prop when clicked', () => {
        const toggle = jest.fn();
        const chatOpened = false;
        const badge = 0;
        const launcherImage = openLauncher;
        const launcherComponent = createMessageComponent({toggle, chatOpened, badge, launcherImage});
        launcherComponent.find('.xatkit-launcher').simulate('click');
        expect(toggle).toBeCalled();
    });

    it('should render the open-launcher image when chatOpened = false', () => {
        const toggle = jest.fn();
        const chatOpened = false;
        const badge = 0;
        const launcherImage = openLauncher;
        const launcherComponent = createMessageComponent({toggle, chatOpened, badge, launcherImage});
        expect(launcherComponent.find('.xatkit-open-launcher')).toHaveLength(1);
    });

    it('should render the close-launcher image when chatOpened = true', () => {
        const toggle = jest.fn();
        const chatOpened = true;
        const launcherComponent = createMessageComponent({toggle, chatOpened});
        expect(launcherComponent.find('.xatkit-close-launcher')).toHaveLength(1);
    });

    it('should render Badge component when closed and new message is in', () => {
        const toggle = jest.fn();
        const chatOpened = false;
        const badge = 1;
        const launcherImage = openLauncher;
        const launcherComponent = createMessageComponent({toggle, chatOpened, badge, launcherImage});
        expect(launcherComponent.find(Badge).props().badge).toBe(1);
    })
});

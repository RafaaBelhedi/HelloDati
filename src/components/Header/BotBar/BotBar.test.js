import React from 'react';
import { shallow } from 'enzyme';
import BotBar from './BotBar';

describe('<BotBar />', () => {
  test('renders', () => {
    const wrapper = shallow(<BotBar />);
    expect(wrapper).toMatchSnapshot();
  });
});

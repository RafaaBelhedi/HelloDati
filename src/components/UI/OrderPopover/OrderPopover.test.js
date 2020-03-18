import React from 'react';
import { shallow } from 'enzyme';
import OrderPopover from './OrderPopover';

describe('<OrderPopover />', () => {
  test('renders', () => {
    const wrapper = shallow(<OrderPopover />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Devices from './Devices';

describe('<Devices />', () => {
  test('renders', () => {
    const wrapper = shallow(<Devices />);
    expect(wrapper).toMatchSnapshot();
  });
});

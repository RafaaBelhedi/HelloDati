import React from 'react';
import { shallow } from 'enzyme';
import DeviceCard from './DeviceCard';

describe('<DeviceCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<DeviceCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

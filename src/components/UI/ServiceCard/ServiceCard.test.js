import React from 'react';
import { shallow } from 'enzyme';
import ServiceCard from './ServiceCard';

describe('<ServiceCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<ServiceCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

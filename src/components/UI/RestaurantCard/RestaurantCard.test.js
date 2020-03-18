import React from 'react';
import { shallow } from 'enzyme';
import RestaurantCard from './RestaurantCard';

describe('<RestaurantCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<RestaurantCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

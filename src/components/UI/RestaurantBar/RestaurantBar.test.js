import React from 'react';
import { shallow } from 'enzyme';
import RestaurantBar from './RestaurantBar';

describe('<RestaurantBar />', () => {
  test('renders', () => {
    const wrapper = shallow(<RestaurantBar />);
    expect(wrapper).toMatchSnapshot();
  });
});

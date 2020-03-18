import React from 'react';
import { shallow } from 'enzyme';
import RestaurantContainer from './RestaurantContainer';

describe('<RestaurantContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<RestaurantContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

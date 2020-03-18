import React from 'react';
import { shallow } from 'enzyme';
import RestaurantForm from './RestaurantForm';

describe('<RestaurantForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<RestaurantForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

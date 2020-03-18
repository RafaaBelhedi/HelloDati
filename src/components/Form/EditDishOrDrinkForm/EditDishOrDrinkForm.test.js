import React from 'react';
import { shallow } from 'enzyme';
import EditDishOrDrinkForm from './EditDishOrDrinkForm';

describe('<EditDishOrDrinkForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<EditDishOrDrinkForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

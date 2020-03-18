import React from 'react';
import { shallow } from 'enzyme';
import AddDishOrDrinkForm from './AddDishOrDrinkForm';

describe('<AddDishOrDrinkForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddDishOrDrinkForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

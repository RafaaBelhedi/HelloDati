import React from 'react';
import { shallow } from 'enzyme';
import DishForm from './DishForm';

describe('<DishForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<DishForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

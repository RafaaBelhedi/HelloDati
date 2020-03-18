import React from 'react';
import { shallow } from 'enzyme';
import DishUpdateForm from './DishUpdateForm';

describe('<DishUpdateForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<DishUpdateForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

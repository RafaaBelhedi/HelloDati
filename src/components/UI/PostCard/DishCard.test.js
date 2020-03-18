import React from 'react';
import { shallow } from 'enzyme';
import DishCard from './DishCard';

describe('<DishCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<DishCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import CategoryButton from './CategoryButton';

describe('<CategoryButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<CategoryButton />);
    expect(wrapper).toMatchSnapshot();
  });
});

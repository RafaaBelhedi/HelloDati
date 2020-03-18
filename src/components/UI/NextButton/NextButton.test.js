import React from 'react';
import { shallow } from 'enzyme';
import NextButton from './NextButton';

describe('<NextButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<NextButton />);
    expect(wrapper).toMatchSnapshot();
  });
});

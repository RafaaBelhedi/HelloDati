import React from 'react';
import { shallow } from 'enzyme';
import Statistics from './Statistics';

describe('<Statistics />', () => {
  test('renders', () => {
    const wrapper = shallow(<Statistics />);
    expect(wrapper).toMatchSnapshot();
  });
});

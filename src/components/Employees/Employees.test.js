import React from 'react';
import { shallow } from 'enzyme';
import Employees from './Employees';

describe('<Employees />', () => {
  test('renders', () => {
    const wrapper = shallow(<Employees />);
    expect(wrapper).toMatchSnapshot();
  });
});

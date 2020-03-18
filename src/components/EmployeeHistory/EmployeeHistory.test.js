import React from 'react';
import { shallow } from 'enzyme';
import EmployeeHistory from './EmployeeHistory';

describe('<EmployeeHistory />', () => {
  test('renders', () => {
    const wrapper = shallow(<EmployeeHistory />);
    expect(wrapper).toMatchSnapshot();
  });
});

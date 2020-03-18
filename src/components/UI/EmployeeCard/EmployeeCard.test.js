import React from 'react';
import { shallow } from 'enzyme';
import EmployeeCard from './EmployeeCard';

describe('<EmployeeCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<EmployeeCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

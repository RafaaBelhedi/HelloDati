import React from 'react';
import { shallow } from 'enzyme';
import EmployeeForm from './EmployeeForm';

describe('<EmployeeForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<EmployeeForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

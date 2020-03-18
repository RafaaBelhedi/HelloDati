import React from 'react';
import { shallow } from 'enzyme';
import EmployeeEditForm from './EmployeeEditForm';

describe('<EmployeeEditForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<EmployeeEditForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

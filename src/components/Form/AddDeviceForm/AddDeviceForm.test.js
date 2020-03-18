import React from 'react';
import { shallow } from 'enzyme';
import AddDeviceForm from './AddDeviceForm';

describe('<AddDeviceForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddDeviceForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

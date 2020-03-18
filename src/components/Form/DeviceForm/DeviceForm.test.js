import React from 'react';
import { shallow } from 'enzyme';
import DeviceForm from './DeviceForm';

describe('<DeviceForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<DeviceForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

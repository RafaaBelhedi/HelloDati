import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './FormInput';

describe('<FormInput />', () => {
  test('renders', () => {
    const wrapper = shallow(<FormInput />);
    expect(wrapper).toMatchSnapshot();
  });
});

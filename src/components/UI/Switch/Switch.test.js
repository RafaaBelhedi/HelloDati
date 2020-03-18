import React from 'react';
import { shallow } from 'enzyme';
import Switch from './Switch';

describe('<Switch />', () => {
  test('renders', () => {
    const wrapper = shallow(<Switch />);
    expect(wrapper).toMatchSnapshot();
  });
});

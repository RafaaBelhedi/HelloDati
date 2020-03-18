import React from 'react';
import { shallow } from 'enzyme';
import AddButton from './AddButton';

describe('<AddButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddButton />);
    expect(wrapper).toMatchSnapshot();
  });
});

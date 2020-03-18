import React from 'react';
import { shallow } from 'enzyme';
import AddExtraPost from './AddExtraPost';

describe('<AddExtraPost />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddExtraPost />);
    expect(wrapper).toMatchSnapshot();
  });
});

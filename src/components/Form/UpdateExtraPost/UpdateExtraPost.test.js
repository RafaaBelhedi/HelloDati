import React from 'react';
import { shallow } from 'enzyme';
import UpdateExtraPost from './UpdateExtraPost';

describe('<UpdateExtraPost />', () => {
  test('renders', () => {
    const wrapper = shallow(<UpdateExtraPost />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import ExtraPostCard from './ExtraPostCard';

describe('<ExtraPostCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<ExtraPostCard />);
    expect(wrapper).toMatchSnapshot();
  });
});

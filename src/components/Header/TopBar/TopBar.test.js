import React from 'react';
import { shallow } from 'enzyme';
import TopBar from './TopBar';

describe('<TopBar />', () => {
  test('renders', () => {
    const wrapper = shallow(<TopBar />);
    expect(wrapper).toMatchSnapshot();
  });
});

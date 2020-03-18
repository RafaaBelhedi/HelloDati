import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from './NavigationBar';

describe('<NavigationBar />', () => {
  test('renders', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper).toMatchSnapshot();
  });
});

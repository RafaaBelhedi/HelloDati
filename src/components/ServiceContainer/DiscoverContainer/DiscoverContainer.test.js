import React from 'react';
import { shallow } from 'enzyme';
import DiscoverContainer from './DiscoverContainer';

describe('<DiscoverContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<DiscoverContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

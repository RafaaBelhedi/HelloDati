import React from 'react';
import { shallow } from 'enzyme';
import PricePage from './PricePage';

describe('<PricePage />', () => {
  test('renders', () => {
    const wrapper = shallow(<PricePage />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Presentation from './Presentation';

describe('<Presentation />', () => {
  test('renders', () => {
    const wrapper = shallow(<Presentation />);
    expect(wrapper).toMatchSnapshot();
  });
});

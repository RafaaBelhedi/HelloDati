import React from 'react';
import { shallow } from 'enzyme';
import DrinksContainer from './DrinksContainer';

describe('<DrinksContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<DrinksContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

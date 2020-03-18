import React from 'react';
import { shallow } from 'enzyme';
import ContactContainer from './ContactContainer';

describe('<ContactContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<ContactContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

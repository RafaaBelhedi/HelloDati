import React from 'react';
import { shallow } from 'enzyme';
import ServiceContainer from './ServiceContainer';

describe('<ServiceContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<ServiceContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

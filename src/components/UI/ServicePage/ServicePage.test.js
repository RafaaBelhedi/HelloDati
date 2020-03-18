import React from 'react';
import { shallow } from 'enzyme';
import ServicePage from './ServicePage';

describe('<ServicePage />', () => {
  test('renders', () => {
    const wrapper = shallow(<ServicePage />);
    expect(wrapper).toMatchSnapshot();
  });
});

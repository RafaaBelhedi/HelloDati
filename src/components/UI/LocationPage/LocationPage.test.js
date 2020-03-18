import React from 'react';
import { shallow } from 'enzyme';
import LocationPage from './LocationPage';

describe('<LocationPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<LocationPage />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import FormPage from './FormPage';

describe('<FormPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<FormPage />);
    expect(wrapper).toMatchSnapshot();
  });
});

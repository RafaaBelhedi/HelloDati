import React from 'react';
import { shallow } from 'enzyme';
import DescriptionPage from './DescriptionPage';

describe('<DescriptionPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<DescriptionPage />);
    expect(wrapper).toMatchSnapshot();
  });
});

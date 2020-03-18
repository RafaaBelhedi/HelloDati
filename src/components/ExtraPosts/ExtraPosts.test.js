import React from 'react';
import { shallow } from 'enzyme';
import ExtraPosts from './ExtraPosts';

describe('<ExtraPosts />', () => {
  test('renders', () => {
    const wrapper = shallow(<ExtraPosts />);
    expect(wrapper).toMatchSnapshot();
  });
});

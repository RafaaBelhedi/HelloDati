import React from 'react';
import { shallow } from 'enzyme';
import CategoryContainer from './CategoryContainer';

describe('<CategoryContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<CategoryContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import NavigationIndexes from './NavigationIndexes';

describe('<NavigationIndexes />', () => {
  test('renders', () => {
    const wrapper = shallow(<NavigationIndexes />);
    expect(wrapper).toMatchSnapshot();
  });
});

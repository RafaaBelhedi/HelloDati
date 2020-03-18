import React from 'react';
import { shallow } from 'enzyme';
import LeisureContainer from './LeisureContainer';

describe('<LeisureContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<LeisureContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

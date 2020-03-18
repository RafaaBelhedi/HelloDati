import React from 'react';
import { shallow } from 'enzyme';
import Routes from './Routes';

describe('<Routes />', () => {
  test('renders', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import FormNavigator from './FormNavigator';

describe('<FormNavigator />', () => {
  test('renders', () => {
    const wrapper = shallow(<FormNavigator />);
    expect(wrapper).toMatchSnapshot();
  });
});

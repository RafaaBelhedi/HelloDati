import React from 'react';
import { shallow } from 'enzyme';
import WellbeingContainer from './WellbeingContainer';

describe('<WellbeingContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<WellbeingContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

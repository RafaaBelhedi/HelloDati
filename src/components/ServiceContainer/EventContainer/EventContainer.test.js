import React from 'react';
import { shallow } from 'enzyme';
import EventContainer from './EventContainer';

describe('<EventContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<EventContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

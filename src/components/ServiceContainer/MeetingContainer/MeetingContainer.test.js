import React from 'react';
import { shallow } from 'enzyme';
import MeetingContainer from './MeetingContainer';

describe('<MeetingContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<MeetingContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

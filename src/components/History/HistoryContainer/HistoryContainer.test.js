import React from 'react';
import { shallow } from 'enzyme';
import HistoryContainer from './HistoryContainer';

describe('<HistoryContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<HistoryContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

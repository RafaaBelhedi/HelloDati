import React from 'react';
import { shallow } from 'enzyme';
import HistoryItem from './HistoryItem';

describe('<HistoryItem />', () => {
  test('renders', () => {
    const wrapper = shallow(<HistoryItem />);
    expect(wrapper).toMatchSnapshot();
  });
});

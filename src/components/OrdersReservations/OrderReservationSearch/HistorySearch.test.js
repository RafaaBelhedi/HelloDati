import React from 'react';
import { shallow } from 'enzyme';
import HistorySearch from './HistorySearch';

describe('<HistorySearch />', () => {
  test('renders', () => {
    const wrapper = shallow(<HistorySearch />);
    expect(wrapper).toMatchSnapshot();
  });
});

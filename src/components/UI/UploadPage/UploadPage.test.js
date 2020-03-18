import React from 'react';
import { shallow } from 'enzyme';
import UploadPage from './UploadPage';

describe('<UploadPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<UploadPage />);
    expect(wrapper).toMatchSnapshot();
  });
});

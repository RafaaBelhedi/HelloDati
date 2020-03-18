import React from 'react';
import { shallow } from 'enzyme';
import CategoryForm from './CategoryForm';

describe('<CategoryForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<CategoryForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

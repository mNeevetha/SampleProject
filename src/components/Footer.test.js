import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('Footer', () => {
  const wrapper = shallow(<Footer />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('To check for Footer and Footer Content', () => {
    expect(wrapper.find('.footer').exists()).toBe(true);
    expect(wrapper.find('.footer').text()).toEqual(
      '© 2017 Cognizant-APS,all rights reserved'
    );
  });
});

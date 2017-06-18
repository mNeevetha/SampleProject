import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { getMockUser } from '../__mocks__/mockUser';

import Header from './Header';

describe('Component: Header', () => {
  const spy = jest.fn();
  const user = getMockUser();

  window.matchMedia =
    window.matchMedia ||
    function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
      };
    };

  const wrapper = mount(
    <MemoryRouter>
      <Header currentUser={user} logOut={spy} />
    </MemoryRouter>
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have Button color', function() {
    expect(wrapper.find('.btn-color').exists()).toBe(true);
  });

  it('Check menu exists', function() {
    expect(wrapper.find('.btn-color').text()).toEqual('menu');
  });

  it('Check menu click', function() {
    wrapper.find('.btn-color').simulate('click');
    expect(matchMedia.call.length).toBe(1);
  });
});

import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  let loginPage;

  beforeEach(() => {
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <LoginPage />
      </Provider>
    );
    loginPage = wrapper.find(LoginPage);
  });

  it('renders without crashing', () => {
    expect(loginPage.exists()).toBe(true);
  });

  it('renders the login form', () => {
    expect(loginPage.find('.login-form').exists()).toBe(true);
  });
});

import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import HomePage from './HomePage';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import { getMockUser } from '../__mocks__/mockUser';

describe('Container: HomePage', () => {
  let homePage;

  const user = getMockUser();
  const updatedState = Object.assign({}, mockInitialState, {
    currentUser: user,
  });
  const mockHistory = {
    listen: () => {},
    push: () => {},
  };

  beforeEach(() => {
    const wrapper = mount(
      <Provider store={mockStore(updatedState)}>
        <HomePage history={mockHistory} />
      </Provider>
    );

    homePage = wrapper.find(HomePage);
  });

  it('renders without crashing', () => {
    expect(homePage.exists()).toBe(true);
  });

  it('renders the card title', () => {
    expect(homePage.find('.home-page-title').text()).toEqual(
      'Welcome to CliniCentric'
    );
  });

  it('Check for Button and Button label', () => {
    expect(homePage.find('.getStartedBtn').exists()).toBe(true);
    expect(homePage.find('.getStartedBtn').text()).toEqual('Get Started');
  });

  it('Check for Home Page Content', () => {
    expect(homePage.find('.home-page-content').text()).toContain(
      'You can use the CliniCentric application'
    );
  });

  it('Checkbox Unchecked and button disabled by default', () => {
    let checkbox = homePage.find({ type: 'checkbox' });
    let button = homePage.find({ type: 'button' });

    expect(checkbox.props().checked).toEqual(false);
    expect(button.props().disabled).toEqual(true);
  });

  it('Enabled button on checkbox checked', () => {
    let checkbox = homePage.find({ type: 'checkbox' });
    let button = homePage.find({ type: 'button' });

    homePage.find({ type: 'checkbox' }).simulate('change');

    expect(checkbox.props().checked).toEqual(true);
    expect(button.props().disabled).toEqual(false);
  });
});

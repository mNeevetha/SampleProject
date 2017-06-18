import { shallow } from 'enzyme';
import React from 'react';

import LoginForm from './LoginForm';

describe('Component: LoginForm', () => {
  it('should pass data to onChange() when email and password values are updated', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <LoginForm email="" handleChange={spy} password="" />
    );

    wrapper.find('#email').simulate('change', { value: 'example@example.com' });
    wrapper.find('#password').simulate('change', { value: 'password' });
    expect(spy.mock.calls.length).toEqual(2);
    expect(spy.mock.calls[0][0]).toEqual('email');
    expect(spy.mock.calls[0][1].value).toEqual('example@example.com');
    expect(spy.mock.calls[1][0]).toEqual('password');
    expect(spy.mock.calls[1][1].value).toEqual('password');
  });

  it('should enable the submit button when a valid email and password are provided', () => {
    const wrapper = shallow(
      <LoginForm email="email@example.com" password="password" />
    );

    const submitButton = wrapper.find('.login-form_submit');
    expect(submitButton.props().children.props.disabled).toEqual(false);
  });

  it('should call onSubmit when the login button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <LoginForm email="email@example.com" onSubmit={spy} password="password" />
    );

    const submitButton = wrapper.find('#submit');
    submitButton.simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
});

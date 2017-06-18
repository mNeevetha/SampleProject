import { shallow } from 'enzyme';
import React from 'react';

import APSQueryForm from './APSQueryForm';

describe('Component: APSQueryForm', () => {
  it('should pass data to onChange() when query form values are updated', () => {
    const spy = jest.fn();
    const spyDate = jest.fn();
    const wrapper = shallow(
      <APSQueryForm
        birthDate=""
        firstName=""
        formatDOB={spyDate}
        gender=""
        handleChange={spy}
        lastName=""
      />
    );

    wrapper.find('#firstName').simulate('change', { value: 'TestFirstName' });
    wrapper.find('#lastName').simulate('change', { value: 'TestLastName' });
    wrapper.find('#gender').simulate('change', { value: 'male' });
    wrapper.find('#birthDate').simulate('change', { value: '20/10/1995' });
    expect(spy.mock.calls.length).toEqual(3);

    expect(spyDate.mock.calls.length).toEqual(1);

    expect(spy.mock.calls[0][0]).toEqual('firstName');
    expect(spy.mock.calls[0][1].value).toEqual('TestFirstName');
    expect(spy.mock.calls[1][0]).toEqual('lastName');
    expect(spy.mock.calls[1][1].value).toEqual('TestLastName');
    expect(spy.mock.calls[2][0]).toEqual('gender');
    expect(spy.mock.calls[2][1].value).toEqual('male');
    expect(spyDate.mock.calls[0][0]).toEqual('birthDate');
    expect(spyDate.mock.calls[0][1].value).toEqual('20/10/1995');
  });

  it('should enable the Submit Applicant Info button when a valid form values are provided', () => {
    const wrapper = shallow(
      <APSQueryForm
        birthDate="1995-12-20"
        fileName="TestAps.jpg"
        firstName="TestFirstName"
        lastName="TestLastName"
      />
    );

    const submitButton = wrapper.find('.query-form_submit');
    expect(submitButton.props().children.props.disabled).toEqual(false);
  });

  it('should call onSubmit when the Submit Applicant Info button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <APSQueryForm
        birthDate="12/20/1995"
        firstName="TestFirstName"
        lastName="TestLastName"
        onSubmit={spy}
      />
    );

    const submitButton = wrapper.find('#submitQuery');
    submitButton.simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
});

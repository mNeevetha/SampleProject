import { shallow, mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import APSAdvanceQueryForm from './APSAdvanceQueryForm';

describe('Component: APSAdvanceQueryForm', () => {
  it('should not render the form title if queryId is null', () => {
    const spy = jest.fn();
    const spyDate = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <APSAdvanceQueryForm
          birthDate="27/08/1882"
          firstName="Joe"
          formatDOB={spyDate}
          gender="male"
          handleChange={spy}
          lastName="Smith"
          lastSSN=""
          match={{ params: { user_id: 1 } }}
          middleName=""
          phoneNumber=""
          queryId={null}
          zipCode=""
        />
      </MemoryRouter>
    );
    expect(wrapper.find('.query-form_title').exists()).toBe(false);
  });

  it('should render if queryId exists', () => {
    const spy = jest.fn();
    const spyDate = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <APSAdvanceQueryForm
          birthDate="27/08/1882"
          firstName="Joe"
          formatDOB={spyDate}
          gender="male"
          handleChange={spy}
          lastName="Smith"
          lastSSN=""
          match={{ params: { user_id: 1 } }}
          middleName=""
          phoneNumber=""
          queryId={1}
          zipCode=""
        />
      </MemoryRouter>
    );

    expect(wrapper.find('.query-form_title').text()).toBe(
      'Applicant Search Refinement*PROVIDE AT LEAST ONE ADDITIONAL INPUT'
    );
  });

  it('should pass data to onChange() when query form values are updated', () => {
    const spy = jest.fn();
    const spyDate = jest.fn();
    const wrapper = shallow(
      <APSAdvanceQueryForm
        birthDate="27/08/1882"
        firstName="Joe"
        formatDOB={spyDate}
        gender="male"
        handleChange={spy}
        lastName="Smith"
        lastSSN=""
        middleName=""
        phoneNumber=""
        queryId={1}
        zipCode=""
      />
    );

    wrapper.find('#lastSSN').simulate('change', { value: '1234' });
    wrapper.find('#middleName').simulate('change', { value: 'A' });
    wrapper.find('#phoneNumber').simulate('change', { value: '123-456-7890' });
    wrapper.find('#zipCode').simulate('change', { value: '12345' });

    expect(spy.mock.calls.length).toEqual(4);

    expect(spy.mock.calls[0][0]).toEqual('lastSSN');
    expect(spy.mock.calls[0][1].value).toEqual('1234');
    expect(spy.mock.calls[1][0]).toEqual('middleName');
    expect(spy.mock.calls[1][1].value).toEqual('A');
    expect(spy.mock.calls[2][0]).toEqual('phoneNumber');
    expect(spy.mock.calls[2][1].value).toEqual('123-456-7890');
    expect(spy.mock.calls[3][0]).toEqual('zipCode');
    expect(spy.mock.calls[3][1].value).toEqual('12345');
  });

  it('should enable the Submit Applicant Info button when a valid form values are provided', () => {
    const wrapper = shallow(
      <APSAdvanceQueryForm
        birthDate="1995-12-20"
        firstName="TestFirstName"
        gender="male"
        lastName="TestLastName"
        lastSSN="1234"
        middleName="a"
        phoneNumber="123-456-7890"
        queryId={1}
        zipCode="12345"
      />
    );

    const submitButton = wrapper.find('.query-form_submit');
    expect(submitButton.props().children.props.disabled).toEqual(false);
  });
});

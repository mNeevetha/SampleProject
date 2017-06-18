import { shallow } from 'enzyme';
import React from 'react';

import { APSQueryPage as ApsQuery } from './APSQueryPage';
import { mockInitialState } from '../__mocks__/mockInitialState';

describe('APSQueryPage', () => {
  let wrapper;
  const mockHistory = {
    listen: () => {},
    push: () => {},
  };

  beforeEach(() => {
    const props = mockInitialState;
    wrapper = shallow(<ApsQuery {...props} history={mockHistory} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders routes to the query forms', () => {
    expect(wrapper.find('Route').length).toEqual(2);
    expect(wrapper.find('Route').nodes[0].props.path).toEqual(
      '/users/:user_id/aps/new'
    );
    expect(wrapper.find('Route').nodes[1].props.path).toEqual(
      '/users/:user_id/aps/refine-search'
    );
  });

  it('renders the progress dialog', () => {
    expect(wrapper.find('.request-progress_dialog').exists()).toBe(true);
  });

  it('when state visible is true, sets property visible to true on dialog', () => {
    expect(wrapper.find('.request-progress_dialog').props().visible).toBe(
      false
    );
    wrapper.setState({ visible: true });
    expect(wrapper.find('.request-progress_dialog').props().visible).toBe(true);
  });

  it('when documents are retrieved, continue button is enabled and request progress is displayed', () => {
    const requestFinishedState = {
      user: {
        currentUser: {},
        userRequest: false,
      },
      auth: {
        isAuthenticated: false,
        authRequest: false,
      },
      apsQuery: {
        applicantDocuments: [{ documentId: 1 }, { documentId: 2 }],
        applicantDocumentIds: [1, 2],
        applicantPatientId: '123',
        apsQueryMessage: 'Success!',
        findingApplicantDocuments: false,
        requestingApplicantPatientId: false,
        retrievingApplicantDocuments: false,
      },
    };

    wrapper = shallow(
      <ApsQuery {...requestFinishedState} history={mockHistory} />
    );

    expect(wrapper.find('.request-progress_status.success').length).toEqual(3);
    expect(wrapper.find('DialogContainer').node.props.actions[0].label).toEqual(
      'Continue'
    );
  });
  it('when there is an error, refine search button is enabled and error is displayed', () => {
    const requestErrorState = {
      user: {
        currentUser: {},
        userRequest: false,
      },
      auth: {
        isAuthenticated: false,
        authRequest: false,
      },
      apsQuery: {
        applicantDocuments: [],
        applicantDocumentIds: [],
        applicantPatientId: '',
        apsQueryMessage: 'There was an error',
        requestError: true,
        findingApplicantDocuments: false,
        requestingApplicantPatientId: false,
        retrievingApplicantDocuments: false,
      },
    };

    wrapper = shallow(
      <ApsQuery {...requestErrorState} history={mockHistory} />
    );

    expect(wrapper.find('.request-progress_message').text()).toEqual(
      'There was an error'
    );
    expect(wrapper.find('DialogContainer').node.props.actions[0].label).toEqual(
      'Refine search'
    );
  });
});

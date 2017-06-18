import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const mockInitialState = {
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
    apsQueryMessage: '',
    findingApplicantDocuments: false,
    requestingApplicantPatientId: false,
    retrievingApplicantDocuments: false,
  },
};

const middlewares = [thunk];

export const mockStore = configureStore(middlewares);

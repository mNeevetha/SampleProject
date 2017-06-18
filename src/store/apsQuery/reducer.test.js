import {
  applicantDiscoveryFailure,
  applicantDiscoveryRequest,
  applicantDiscoverySuccess,
  findDocumentsFailure,
  findDocumentsRequest,
  findDocumentsSuccess,
  retrieveDocumentsFailure,
  retrieveDocumentsRequest,
  retrieveDocumentsSuccess,
} from './actions';

import apsQuery from './reducer';

describe('apsQuery reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      findingApplicantDocuments: false,
      applicantDocuments: [],
      applicantDocumentIds: [],
      applicantPatientId: '',
      apsQueryMessage: '',
      requestError: false,
      requestingApplicantPatientId: false,
      retrievingApplicantDocuments: false,
    };
  });

  it('should set requestingApplicantPatientId to true when passed applicantDiscoveryRequest', () => {
    const message = 'Searching for applicant...';
    const action = applicantDiscoveryRequest(message);
    const newState = apsQuery(initialState, action);

    expect(newState.applicantPatientId).toEqual('');
    expect(newState.requestingApplicantPatientId).toBe(true);
    expect(newState.requestError).toBe(false);
    expect(newState.apsQueryMessage).toEqual('Searching for applicant...');
  });

  it('should set state appropriately when passed applicantDiscoveryFailure', () => {
    const errorMessage = 'An error occurred';
    const action = applicantDiscoveryFailure(errorMessage);
    const newState = apsQuery(initialState, action);

    expect(newState.applicantPatientId).toEqual('');
    expect(newState.requestingApplicantPatientId).toBe(false);
    expect(newState.requestError).toBe(true);
    expect(newState.apsQueryMessage).toEqual(errorMessage);
  });

  it('should set state appropriately when passed applicantDiscoverySuccess', () => {
    const applicantPatientId = 23;
    const message = 'Applicant found!';
    const action = applicantDiscoverySuccess(applicantPatientId, message);
    const newState = apsQuery(initialState, action);
    expect(newState.applicantPatientId).toEqual(23);
    expect(newState.requestingApplicantPatientId).toBe(false);
    expect(newState.requestError).toBe(false);
    expect(newState.apsQueryMessage).toEqual(message);
  });

  it('should set state appropriately when passed findDocumentsFailure', () => {
    const errorMessage = 'There was an error!';
    const action = findDocumentsFailure(errorMessage);
    const newState = apsQuery(initialState, action);

    expect(newState.applicantDocuments).toEqual([]);
    expect(newState.findingApplicantDocuments).toBe(false);
    expect(newState.requestError).toBe(true);
    expect(newState.apsQueryMessage).toEqual(errorMessage);
  });

  it('should set state appropriately when passed findDocumentsRequest', () => {
    const message = 'Finding documents';
    const action = findDocumentsRequest(message);
    const newState = apsQuery(initialState, action);

    expect(newState.applicantDocuments).toEqual([]);
    expect(newState.findingApplicantDocuments).toBe(true);
    expect(newState.requestError).toBe(false);
    expect(newState.apsQueryMessage).toEqual(message);
  });

  it('should set state appropriately when passed findDocumentsSuccess', () => {
    const applicantDocumentIds = [
      { documentId: 90, repositoryId: 3018 },
      { documentId: 38, repositoryId: 2935 },
    ];
    const successMessage = 'Documents found!';
    const action = findDocumentsSuccess(applicantDocumentIds, successMessage);
    const newState = apsQuery(initialState, action);

    expect(newState.findingApplicantDocuments).toBe(false);
    expect(newState.applicantDocumentIds).toEqual(applicantDocumentIds);
    expect(newState.requestError).toBe(false);
    expect(newState.apsQueryMessage).toEqual(successMessage);
  });

  it('should set state appropriately when passed retrieveDocumentsFailure', () => {
    const errorMessage = 'There was an error!';
    const action = retrieveDocumentsFailure(errorMessage);
    const newState = apsQuery(initialState, action);

    expect(newState.retrievingApplicantDocuments).toBe(false);
    expect(newState.applicantDocuments).toEqual([]);
    expect(newState.requestError).toBe(true);
    expect(newState.apsQueryMessage).toEqual(errorMessage);
  });

  it('should set state appropriately when passed retrieveDocumentsRequest', () => {
    const message = 'Retrieving documents.';
    const action = retrieveDocumentsRequest(message);
    const newState = apsQuery(initialState, action);

    expect(newState.retrievingApplicantDocuments).toBe(true);
    expect(newState.applicantDocuments).toEqual([]);
    expect(newState.requestError).toBe(false);
    expect(newState.apsQueryMessage).toEqual(message);
  });

  it('should set state appropriately when passed retrieveDocumentsSuccess', () => {
    const applicantDocuments = [
      { documentId: 90, type: 'encounter' },
      { documentId: 38, type: 'condition' },
    ];
    const successMessage = 'Documents are retrieved!';
    const action = retrieveDocumentsSuccess(applicantDocuments, successMessage);
    const newState = apsQuery(initialState, action);

    expect(newState.retrievingApplicantDocuments).toBe(false);
    expect(newState.requestError).toBe(false);
    expect(newState.applicantDocuments).toEqual(applicantDocuments);
    expect(newState.apsQueryMessage).toEqual(successMessage);
  });
});

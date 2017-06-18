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

describe('Discover applicant actions', () => {
  it('handles the applicantDiscoveryFailure action creator', () => {
    const action = { type: 'APPLICANT_DISCOVERY__FAILURE' };
    expect(applicantDiscoveryFailure()).toEqual(action);
  });

  it('handles the applicantDiscoveryRequest action creator', () => {
    const action = { type: 'APPLICANT_DISCOVERY__REQUEST' };
    expect(applicantDiscoveryRequest()).toEqual(action);
  });

  it('handles the applicantDiscoverySuccess action creator', () => {
    const applicantPatientId = 12345;
    const action = { type: 'APPLICANT_DISCOVERY__SUCCESS', applicantPatientId };
    expect(applicantDiscoverySuccess(applicantPatientId)).toEqual(action);
  });
});

describe('Find documents actions', () => {
  it('handles the findDocumentsFailure action creator', () => {
    const action = { type: 'FIND_DOCUMENTS__FAILURE' };
    expect(findDocumentsFailure()).toEqual(action);
  });

  it('handles the findDocumentsRequest action creator', () => {
    const action = { type: 'FIND_DOCUMENTS__REQUEST' };
    expect(findDocumentsRequest()).toEqual(action);
  });

  it('handles the findDocumentsSuccess action creator', () => {
    const documentIds = [
      { communityId: 1978, repositoryId: 1887, documentId: 1800 },
      { communityId: 13, repositoryId: 123, documentId: 568 },
    ];
    const action = { type: 'FIND_DOCUMENTS__SUCCESS', documentIds };
    expect(findDocumentsSuccess(documentIds)).toEqual(action);
  });
});

describe('Retrieve documents actions', () => {
  it('handles the retrieveDocumentsFailure action creator', () => {
    const action = { type: 'RETRIEVE_DOCUMENTS__FAILURE' };
    expect(retrieveDocumentsFailure()).toEqual(action);
  });

  it('handles the retrieveDocumentsRequest action creator', () => {
    const action = { type: 'RETRIEVE_DOCUMENTS__REQUEST' };
    expect(retrieveDocumentsRequest()).toEqual(action);
  });

  it('handles the retrieveDocumentsSuccess action creator', () => {
    const documents = [
      { documentId: 90, type: 'encounter' },
      { documentId: 38, type: 'condition' },
    ];
    const action = { type: 'RETRIEVE_DOCUMENTS__SUCCESS', documents };
    expect(retrieveDocumentsSuccess(documents)).toEqual(action);
  });
});

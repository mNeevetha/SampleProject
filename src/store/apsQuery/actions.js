import ApsQuery from '../../services/ApsQuery';
import { apsQueryRecord } from '../apsQueryRecord/actions';

export const FIND_DOCUMENTS__FAILURE = 'FIND_DOCUMENTS__FAILURE';
export const FIND_DOCUMENTS__REQUEST = 'FIND_DOCUMENTS__REQUEST';
export const FIND_DOCUMENTS__SUCCESS = 'FIND_DOCUMENTS__SUCCESS';
export const APPLICANT_DISCOVERY__FAILURE = 'APPLICANT_DISCOVERY__FAILURE';
export const APPLICANT_DISCOVERY__REQUEST = 'APPLICANT_DISCOVERY__REQUEST';
export const APPLICANT_DISCOVERY__SUCCESS = 'APPLICANT_DISCOVERY__SUCCESS';
export const RETRIEVE_DOCUMENTS__FAILURE = 'RETRIEVE_DOCUMENTS__FAILURE';
export const RETRIEVE_DOCUMENTS__REQUEST = 'RETRIEVE_DOCUMENTS__REQUEST';
export const RETRIEVE_DOCUMENTS__SUCCESS = 'RETRIEVE_DOCUMENTS__SUCCESS';

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export function applicantDiscovery(queryParams, history, currentUser, queryId) {
  const requestMessage = 'Searching for applicant...';
  const successMessage = 'Applicant Found!';

  return async dispatch => {
    let errorMessage = 'There was an error processing your applicant request';
    dispatch(applicantDiscoveryRequest(requestMessage));
    try {
      await wait(1000);
      const response = await ApsQuery.discoverApplicant(queryParams, 'fhir');
      if (response.error || !response.entry || response.entry.length > 1) {
        if (!response.entry) errorMessage = 'No match found';
        if (response.entry.length > 1) errorMessage = 'No exact match';
        dispatch(applicantDiscoveryFailure(errorMessage));
        dispatch(apsQueryRecord(currentUser.id, false, queryId));
      } else {
        const applicantPatientId = response.entry[0].resource.id;
        dispatch(applicantDiscoverySuccess(applicantPatientId, successMessage));
        await wait(1000);
        dispatch(apsQueryRecord(currentUser.id, true, queryId));
        dispatch(findDocuments(applicantPatientId, currentUser.id, queryId));
      }
    } catch (error) {
      dispatch(applicantDiscoveryFailure(errorMessage));
      dispatch(apsQueryRecord(currentUser.id, false, queryId));
    }
  };
}

export function applicantDiscoveryFailure(message) {
  return { type: APPLICANT_DISCOVERY__FAILURE, message };
}

export function applicantDiscoveryRequest(message) {
  return { type: APPLICANT_DISCOVERY__REQUEST, message };
}

export function applicantDiscoverySuccess(applicantPatientId, message) {
  return {
    type: APPLICANT_DISCOVERY__SUCCESS,
    applicantPatientId,
    message,
  };
}

export function findDocuments(applicantPatientId, currentUser) {
  const errorMessage = "There was an error finding the applicant's documents";
  const requestMessage = 'Applicant Found. Searching for relevant documents.';
  const successMessage = 'Success! Documents found.';
  return async dispatch => {
    dispatch(findDocumentsRequest(requestMessage));
    try {
      await wait(2000);
      const response = await ApsQuery.findDocuments(applicantPatientId, 'fhir');
      if (!response) {
        dispatch(findDocumentsSuccess(response, successMessage));
        await wait(1000);
        dispatch(
          retrieveDocuments(applicantPatientId, response, currentUser.id)
        );
      } else {
        dispatch(findDocumentsFailure(errorMessage));
        
      }
    } catch (error) {
      dispatch(findDocumentsFailure(errorMessage));
    }
  };
}

export function findDocumentsFailure(message) {
  return { type: FIND_DOCUMENTS__FAILURE, message };
}

export function findDocumentsRequest(message) {
  return { type: FIND_DOCUMENTS__REQUEST, message };
}

export function findDocumentsSuccess(documentIds, message) {
  return { type: FIND_DOCUMENTS__SUCCESS, documentIds, message };
}

export function retrieveDocuments(
  applicantPatientId,
  documentIds,
  currentUser
) {
  const errorMessage =
    "There was an error retrieving the applicant's documents";
  const requestMessage = 'Retrieving documents.';
  const successMessage = 'Success! Documents retrieved.';

  return async dispatch => {
    dispatch(retrieveDocumentsRequest(requestMessage));
    try {
      await wait(2000);
      const response = await ApsQuery.retrieveDocuments(
        applicantPatientId,
        documentIds,
        'fhir'
      );
      if (response.error) {
        dispatch(retrieveDocumentsFailure(errorMessage));
      } else {
        dispatch(retrieveDocumentsSuccess(response.entry, successMessage));
      }
    } catch (error) {
      dispatch(retrieveDocumentsFailure(errorMessage));
    }
  };
}

export function retrieveDocumentsFailure(message) {
  return { type: RETRIEVE_DOCUMENTS__FAILURE, message };
}

export function retrieveDocumentsRequest(message) {
  return { type: RETRIEVE_DOCUMENTS__REQUEST, message };
}

export function retrieveDocumentsSuccess(documents, message) {
  return { type: RETRIEVE_DOCUMENTS__SUCCESS, documents, message };
}

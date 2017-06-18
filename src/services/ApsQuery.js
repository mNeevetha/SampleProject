import fetch from 'isomorphic-fetch';

import { FHIR_REQUEST_URL } from '../config/apiConfig';

class ApsQuery {
  _buildFhirQueryUrl(queryParams) {
    const queryUrl = `${FHIR_REQUEST_URL}/Patient?given=${queryParams.firstName}&family=${queryParams.lastName}&gender=${queryParams.gender}&birthdate=${queryParams.birthDate}&address-postalcode=${queryParams.zipCode}&phone=${queryParams.phoneNumber}&given=${queryParams.middleName}`;
    return queryUrl;
  }

  async _discoverFhirApplicant(queryParams) {
    const requestUrl = this._buildFhirQueryUrl(queryParams);
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  discoverApplicant(queryParams, requestType) {
    let jsonResponse;
    switch (requestType) {
      case 'fhir':
        jsonResponse = this._discoverFhirApplicant(queryParams);
        break;
      default:
        jsonResponse = {};
        break;
    }
    return jsonResponse;
  }

  findDocuments(applicantPatientId, requestType) {
    let jsonResponse;
    switch (requestType) {
      case 'fhir':
        //Dummy document Ids to differentiate returned jsonResponse from initialState
        jsonResponse = ['dummyDocId1', 'dummyDocId2'];
        break;
      default:
        jsonResponse = ['dummyDocId1', 'dummyDocId2'];
        break;
    }
    return jsonResponse;
  }

  retrieveDocuments(applicantPatientId, findDocumentsResponse, requestType) {
    let jsonResponse;
    switch (requestType) {
      case 'fhir':
        jsonResponse = this._retrieveFhirDocuments(applicantPatientId);
        break;
      default:
        jsonResponse = [];
        break;
    }
    return jsonResponse;
  }

  async _retrieveFhirDocuments(applicantPatientId) {
    const requestUrl = `${FHIR_REQUEST_URL}/Patient/${applicantPatientId}/$everything`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}

export default new ApsQuery();

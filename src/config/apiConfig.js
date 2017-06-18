export const APS_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:3000';

export const FHIR_REQUEST_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_FHIR_REQUEST_URL
  : 'http://fhirtest.uhn.ca/baseDstu3';

import {
  FIND_DOCUMENTS__FAILURE,
  FIND_DOCUMENTS__REQUEST,
  FIND_DOCUMENTS__SUCCESS,
  APPLICANT_DISCOVERY__REQUEST,
  APPLICANT_DISCOVERY__SUCCESS,
  APPLICANT_DISCOVERY__FAILURE,
  RETRIEVE_DOCUMENTS__REQUEST,
  RETRIEVE_DOCUMENTS__FAILURE,
  RETRIEVE_DOCUMENTS__SUCCESS,
} from './actions';

const initialState = {
  applicantDocuments: [],
  applicantDocumentIds: [],
  applicantPatientId: '',
  apsQueryMessage: '',
  findingApplicantDocuments: false,
  requestError: false,
  requestingApplicantPatientId: false,
  retrievingApplicantDocuments: false,
};

export default function apsQuery(state = initialState, action) {
  switch (action.type) {
    case APPLICANT_DISCOVERY__FAILURE:
      return Object.assign({}, state, {
        applicantPatientId: '',
        apsQueryMessage: action.message,
        requestError: true,
        requestingApplicantPatientId: false,
      });
    case APPLICANT_DISCOVERY__REQUEST:
      return Object.assign({}, state, {
        applicantPatientId: '',
        applicantDocuments: [],
        applicantDocumentIds: [],
        apsQueryMessage: action.message,
        requestError: false,
        requestingApplicantPatientId: true,
      });
    case APPLICANT_DISCOVERY__SUCCESS:
      return Object.assign({}, state, {
        applicantPatientId: action.applicantPatientId,
        requestingApplicantPatientId: false,
        apsQueryMessage: action.message,
      });
    case FIND_DOCUMENTS__FAILURE:
      return Object.assign({}, state, {
        applicantDocumentIds: [],
        apsQueryMessage: action.message,
        findingApplicantDocuments: false,
        requestError: true,
      });
    case FIND_DOCUMENTS__REQUEST:
      return Object.assign({}, state, {
        applicantDocumentIds: {},
        apsQueryMessage: action.message,
        findingApplicantDocuments: true,
      });
    case FIND_DOCUMENTS__SUCCESS:
      return Object.assign({}, state, {
        applicantDocumentIds: action.documentIds,
        findingApplicantDocuments: false,
        apsQueryMessage: action.message,
      });
    case RETRIEVE_DOCUMENTS__FAILURE:
      return Object.assign({}, state, {
        apsQueryMessage: action.message,
        applicantDocuments: [],
        requestError: true,
        retrievingApplicantDocuments: false,
      });
    case RETRIEVE_DOCUMENTS__REQUEST:
      return Object.assign({}, state, {
        retrievingApplicantDocuments: true,
        apsQueryMessage: action.message,
        applicantDocuments: [],
      });
    case RETRIEVE_DOCUMENTS__SUCCESS:
      return Object.assign({}, state, {
        applicantDocuments: action.documents,
        retrievingApplicantDocuments: false,
        apsQueryMessage: action.message,
      });
    default:
      return state;
  }
}

import {
  APS_RECORD__FAILURE,
  APS_RECORD__INSERT,
  APS_RECORD__SUCCESS,
  APS_RECORD__UPDATE,
} from './actions.js';

const initialState = {
  queryId: null,
  creatingApsQueryRecord: false,
};

export default function apsQueryRecord(state = initialState, action) {
  switch (action.type) {
    case APS_RECORD__INSERT:
      return Object.assign({}, state, {
        queryId: null,
        creatingAPSRecord: true,
      });
    case APS_RECORD__FAILURE:
      return Object.assign({}, state, {
        queryId: null,
        creatingAPSRecord: false,
      });
    case APS_RECORD__SUCCESS:
      return Object.assign({}, state, {
        queryId: action.query.queryId,
        creatingAPSRecord: false,
      });
    case APS_RECORD__UPDATE:
      return Object.assign({}, state, {
        creatingAPSRecord: true,
      });
    default:
      return state;
  }
}

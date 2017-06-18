import { APS_HISTORY__REQUEST, APS_HISTORY__SUCCESS, APS_HISTORY__FAILURE } from '../apsRequestHistory/actions';

const initialState = {
  list: [],
  requesting: false,
};

function apsRequestHistory(state = initialState, action) {
  switch (action.type) {
    case APS_HISTORY__FAILURE:
      return Object.assign({}, state, {
        requesting: false,
      });
    case APS_HISTORY__REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case APS_HISTORY__SUCCESS:
      return Object.assign({}, state, {
        list: state.list.concat(action.aps),
      });
    default:
      return state;
  }
}

export default apsRequestHistory;

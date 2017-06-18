export const APS_HISTORY__FAILURE = 'APS_HISTORY__FAILURE';
export const APS_HISTORY__REQUEST = 'APS_HISTORY__REQUEST';
export const APS_HISTORY__SUCCESS = 'APS_HISTORY__SUCCESS';

import APSRequestHistory from '../../services/APSRequestHistory';

export function apsRequestHistory(currentUser) {
  return async dispatch => {
    dispatch(apsHistoryRequest());
    try {
      const response = await APSRequestHistory.getAPSRequestHistoryUser(currentUser);
      if (response.error) {
        dispatch(apsHistoryFailure());
      } else {
        const { aps } = response;
        console.log("Actions");
        console.log(aps);
        dispatch(apsHistorySuccess(aps));
      }
    } catch (error) {
      dispatch(apsHistoryFailure());
    }
  };
}

export function apsHistoryFailure() {
  return { type: APS_HISTORY__FAILURE };
}

export function apsHistoryRequest() {
  return { type: APS_HISTORY__REQUEST };
}

export function apsHistorySuccess(aps) {
  return { type: APS_HISTORY__SUCCESS, aps };
}

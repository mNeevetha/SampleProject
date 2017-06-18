export const APS_RECORD__SUCCESS = 'APS_RECORD__SUCCESS';
export const APS_RECORD__FAILURE = 'APS_RECORD__FAILURE';
export const APS_RECORD__INSERT = 'APS_RECORD__REQUEST';
export const APS_RECORD__UPDATE = 'APS_RECORD__UPDATE';

import CreateAPSRecord from '../../services/CreateAPSRecord';

export function apsQueryRecord(userId, retrievedDocuments, queryId) {
  return async dispatch => {
    if (!queryId) {
      dispatch(apsRecordInsert());
    } else {
      dispatch(apsRecordUpdate());
    }
    try {
      const response = await CreateAPSRecord.createAPSRecordForUser(
        userId,
        retrievedDocuments,
        queryId
      );
      const { query } = response;
      dispatch(apsRecordSuccess(query));
    } catch (error) {
      dispatch(apsRecordFailure());
    }
  };
}

export function apsRecordInsert() {
  return { type: APS_RECORD__INSERT };
}

export function apsRecordUpdate() {
  return { type: APS_RECORD__UPDATE };
}

export function apsRecordFailure() {
  return { type: APS_RECORD__FAILURE };
}

export function apsRecordSuccess(query) {
  return { type: APS_RECORD__SUCCESS, query };
}

import fetch from 'isomorphic-fetch';

import { APS_URL } from '../config/apiConfig';

class CreateAPSRecord {
  async createAPSRecordForUser(userId, dataRetrieved, queryId) {
    let response;
    const createAPSRecordUrl = `${APS_URL}/users/${userId}/aps`;
    //Check made to insert APS record only for initial search
    if (!queryId) {
      response = await fetch(createAPSRecordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: userId,
          dataRetrieved: dataRetrieved,
        }),
      });
      return await response.json();
    } else {
      response = await fetch(`${createAPSRecordUrl}/${queryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: userId,
          queryId: queryId,
          dataRetrieved: dataRetrieved,
        }),
      });
      return await response.json();
    }
  }
}

export default new CreateAPSRecord();

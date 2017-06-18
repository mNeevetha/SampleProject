import fetch from 'isomorphic-fetch';

import { APS_URL } from '../config/apiConfig';

class APSRequestHistory {
  async getAPSRequestHistoryUser(currentUser) {
    const getAPSRecordForUserUrl = `${APS_URL}/users/${currentUser.id}/aps`;
    console.log(getAPSRecordForUserUrl)
    const response = await fetch(getAPSRecordForUserUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}

export default new APSRequestHistory();

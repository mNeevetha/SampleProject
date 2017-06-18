import fetch from 'isomorphic-fetch';

import { APS_URL } from '../config/apiConfig';

class User {
  async getCurrentUser() {
    const token = sessionStorage.getItem('jwt');
    const getCurrentUserUrl = `${APS_URL}/currentUser`;
    const response = await fetch(getCurrentUserUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return await response.json();
  }
}

export default new User();

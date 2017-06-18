import fetch from 'isomorphic-fetch';

import { APS_URL } from '../config/apiConfig';

class Auth {
  async loginUser(creds) {
    const loginUrl = `${APS_URL}/login`;

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: creds.email,
        password: creds.password,
      }),
    });

    return await response.json();
  }
}

export default new Auth();

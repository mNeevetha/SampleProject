export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function logout(history) {
  return async dispatch => {
      debugger;
    dispatch(logoutRequest());
    try {
      sessionStorage.removeItem('jwt')
      dispatch(logoutSuccess());
      history.push('/login');
    } catch (error) {
      dispatch(logoutFailure());
      console.log(error.message);
    }
  };
}

export function logoutFailure() {
  return { type: LOGOUT_FAILURE };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export function logoutSuccess(user) {
  return { type: LOGOUT_SUCCESS };
}

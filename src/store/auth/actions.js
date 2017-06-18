import { createErrorMessage } from '../flashMessage/actions';
import Auth from '../../services/Auth';
import { getCurrentUserSuccess, getCurrentUserFailure } from '../user/actions';

export const LOGIN__FAILURE = 'LOGIN__FAILURE';
export const LOGIN__REQUEST = 'LOGIN__REQUEST';
export const LOGIN__SUCCESS = 'LOGIN__SUCCESS';
export const LOGOUT__FAILURE = 'LOGOUT__FAILURE';
export const LOGOUT__REQUEST = 'LOGOUT__REQUEST';
export const LOGOUT__SUCCESS = 'LOGOUT__SUCCESS';

export function loginUser(creds, history) {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const response = await Auth.loginUser(creds);
      if (response.error) {
        dispatch(loginFailure());
        dispatch(getCurrentUserFailure());
        dispatch(createErrorMessage(response.error));
      } else {
        const { user, jwt } = response;
        sessionStorage.setItem('jwt', jwt);
        dispatch(loginSuccess());
        dispatch(getCurrentUserSuccess(user));
        history.push('/');
      }
    } catch (error) {
      dispatch(loginFailure());
      dispatch(getCurrentUserFailure());
      dispatch(createErrorMessage());
    }
  };
}

export function loginFailure() {
  return { type: LOGIN__FAILURE };
}

export function loginRequest() {
  return { type: LOGIN__REQUEST };
}

export function loginSuccess() {
  return { type: LOGIN__SUCCESS };
}

export function logoutUser(history) {
  return async dispatch => {
    dispatch(logoutRequest());
    try {
      sessionStorage.removeItem('jwt');
      dispatch(logoutSuccess());
      dispatch(getCurrentUserSuccess());
    } catch (error) {
      dispatch(logoutFailure());
    }
  };
}

export function logoutFailure() {
  return { type: LOGOUT__FAILURE };
}

export function logoutRequest() {
  return { type: LOGOUT__REQUEST };
}

export function logoutSuccess() {
  return { type: LOGOUT__SUCCESS };
}

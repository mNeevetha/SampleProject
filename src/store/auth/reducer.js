import {
  LOGIN__FAILURE,
  LOGIN__REQUEST,
  LOGIN__SUCCESS,
  LOGOUT__FAILURE,
  LOGOUT__REQUEST,
  LOGOUT__SUCCESS,
} from './actions';

const initialState = {
  isAuthenticated: false,
  authRequest: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN__FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        authRequest: false,
      });
    case LOGIN__REQUEST:
      return Object.assign({}, state, {
        authRequest: true,
      });
    case LOGIN__SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        authRequest: false,
      });
    case LOGOUT__FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: true,
        authRequest: false,
      });
    case LOGOUT__REQUEST:
      return Object.assign({}, state, {
        authRequest: true,
      });
    case LOGOUT__SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        authRequest: false,
      });
    default:
      return state;
  }
}

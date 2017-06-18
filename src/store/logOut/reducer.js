import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from './actions';

const initialState = {
  currentUser: {},
  userRequest: false,
};

export default function logout(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        currentUser: {},
        userRequest: false,
      });
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        currentUser: {},
        userRequest: true,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        currentUser: {},
        userRequest: false,
      });
    default:
      return state;
  }
}

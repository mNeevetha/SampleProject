import {
  GET_CURRENT_USER__FAILURE,
  GET_CURRENT_USER__REQUEST,
  GET_CURRENT_USER__SUCCESS,
} from './actions';

const initialState = {
  currentUser: {},
  userRequest: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER__FAILURE:
      return Object.assign({}, state, {
        currentUser: {},
        userRequest: false,
      });
    case GET_CURRENT_USER__REQUEST:
      return Object.assign({}, state, {
        currentUser: {},
        userRequest: true,
      });
    case GET_CURRENT_USER__SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.user,
        userRequest: false,
      });
    default:
      return state;
  }
}

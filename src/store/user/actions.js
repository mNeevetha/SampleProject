import User from '../../services/User';

export const GET_CURRENT_USER__FAILURE = 'GET_CURRENT_USER__FAILURE';
export const GET_CURRENT_USER__REQUEST = 'GET_CURRENT_USER__REQUEST';
export const GET_CURRENT_USER__SUCCESS = 'GET_CURRENT_USER__SUCCESS';

export function getCurrentUser() {
  return async dispatch => {
    dispatch(getCurrentUserRequest());
    try {
      const response = await User.getCurrentUser();
      const { user } = response;
      dispatch(getCurrentUserSuccess(user));
    } catch (error) {
      dispatch(getCurrentUserFailure());
    }
  };
}

export function getCurrentUserFailure() {
  return { type: GET_CURRENT_USER__FAILURE };
}

export function getCurrentUserRequest() {
  return { type: GET_CURRENT_USER__REQUEST };
}

export function getCurrentUserSuccess(user) {
  return { type: GET_CURRENT_USER__SUCCESS, user };
}

import {
  getCurrentUserFailure,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from './actions';
import user from './reducer';

describe('user reducer', () => {
  it('should not set currentUser when passed GET_CURRENT_USER__FAILURE', () => {
    const initialState = {
      currentUser: {},
      userRequest: false,
    };

    const action = getCurrentUserFailure();
    const newState = user(initialState, action);

    expect(newState.currentUser).toEqual({});
    expect(newState.userRequest).toBe(false);
  });

  it('should set userRequest to true when passed GET_CURRENT_USER__REQUEST', () => {
    const initialState = {
      currentUser: {},
      userRequest: false,
    };

    const action = getCurrentUserRequest();
    const newState = user(initialState, action);

    expect(newState.userRequest).toBe(true);
  });

  it('should set current user when passed GET_CURRENT_USER__SUCCESS', () => {
    const initialState = {
      currentUser: {},
      userRequest: false,
    };

    const testUser = {
      id: 24,
      email: 'president@example.com',
      firstName: 'Abraham',
      lastName: 'Lincoln',
      createdAt: '2017-01-05T17:28:06.535Z',
      updatedAt: '2017-01-05T17:28:06.535Z',
    };

    const action = getCurrentUserSuccess(testUser);
    const newState = user(initialState, action);

    expect(newState.currentUser.id).toEqual(24);
  });
});

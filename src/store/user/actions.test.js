import {
  getCurrentUserFailure,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from './actions';

describe('get current user actions', () => {
  it('handles the getCurrentUserFailure action creator', () => {
    const action = { type: 'GET_CURRENT_USER__FAILURE' };
    expect(getCurrentUserFailure()).toEqual(action);
  });

  it('handles the getCurrentUserRequest action creator', () => {
    const action = { type: 'GET_CURRENT_USER__REQUEST' };
    expect(getCurrentUserRequest()).toEqual(action);
  });

  it('handles the getCurrentUserSuccess action creator', () => {
    const user = {
      id: 24,
      email: 'president@example.com',
      firstName: 'Abraham',
      lastName: 'Lincoln',
      createdAt: '2017-01-05T17:28:06.535Z',
      updatedAt: '2017-01-05T17:28:06.535Z',
    };
    const action = { type: 'GET_CURRENT_USER__SUCCESS', user };
    expect(getCurrentUserSuccess(user)).toEqual(action);
  });
});

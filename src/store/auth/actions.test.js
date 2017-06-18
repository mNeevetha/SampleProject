import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from './actions';

describe('login user actions', () => {
  it('handles the loginFailure action creator', () => {
    const action = { type: 'LOGIN__FAILURE' };
    expect(loginFailure()).toEqual(action);
  });

  it('handles the loginRequest action creator', () => {
    const action = { type: 'LOGIN__REQUEST' };
    expect(loginRequest()).toEqual(action);
  });

  it('handles the loginSuccess action creator', () => {
    const action = { type: 'LOGIN__SUCCESS' };
    expect(loginSuccess()).toEqual(action);
  });
});

describe('logout user actions', () => {
  it('handles the logoutFailure action creator', () => {
    const action = { type: 'LOGOUT__FAILURE' };
    expect(logoutFailure()).toEqual(action);
  });

  it('handles the logoutRequest action creator', () => {
    const action = { type: 'LOGOUT__REQUEST' };
    expect(logoutRequest()).toEqual(action);
  });

  it('handles the logoutSuccess action creator', () => {
    const action = { type: 'LOGOUT__SUCCESS' };
    expect(logoutSuccess()).toEqual(action);
  });
});

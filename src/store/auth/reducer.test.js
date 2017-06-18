import { loginFailure, loginRequest, loginSuccess } from './actions';
import auth from './reducer';

describe('auth reducer', () => {
  it('should set isAuthenticated to false when passed LOGIN__FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      authRequest: false,
    };

    const action = loginFailure();
    const newState = auth(initialState, action);

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.authRequest).toBe(false);
  });

  it('should set authRequest to true when passed LOGIN__REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      authRequest: false,
    };

    const action = loginRequest();

    const newState = auth(initialState, action);

    expect(newState.authRequest).toBe(true);
    expect(newState.isAuthenticated).toBe(false);
  });

  it('should set isAuthenticated to true when passed LOGIN__SUCCESS', () => {
    const initialState = {
      isAuthenticated: false,
      authRequest: false,
    };

    const action = loginSuccess();
    const newState = auth(initialState, action);

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.authRequest).toBe(false);
  });
});

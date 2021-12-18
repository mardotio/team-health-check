import actionCreator, { Actions } from '../util/actionCreator';
import { isErrorResponse, LoginResponse, LoginService } from '../util/client';
import { AppThunk } from '../store';

const LOGIN_START = 'LOGIN_START';
const LOGIN_END = 'LOGIN_END';
const LOGIN_ERROR = 'LOGIN_ERROR';

const userActions = {
  loginStart: () => actionCreator(LOGIN_START),
  loginEnd: (payload: LoginResponse) => actionCreator(LOGIN_END, payload),
  loginError: (payload: string) => actionCreator(LOGIN_ERROR, payload),
};

export type UserActions = Actions<typeof userActions>;

export const login = (): AppThunk => async (dispatch) => {
  dispatch(userActions.loginStart());

  const response = await LoginService.login();

  if (isErrorResponse(response)) {
    return dispatch(userActions.loginError('Error logging in.'));
  }

  return dispatch(userActions.loginEnd(response));
};

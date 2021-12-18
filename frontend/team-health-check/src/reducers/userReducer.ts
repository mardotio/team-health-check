import updateDataState, { DataState } from '../util/updateDataState';
import { LoginResponse } from '../util/client';
import { UserActions } from '../actions/userActions';

type UserState = {
  login: DataState<LoginResponse>;
};

const defaultUserState: UserState = {
  login: {
    loading: false,
    data: null,
    error: null,
    lastSuccess: null,
    lastUpdate: null,
  },
};

const userReducer = (state = defaultUserState, action: UserActions) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        login: updateDataState.loading(state.login),
      };
    case 'LOGIN_END':
      return {
        login: updateDataState.success(state.login, action.payload),
      };
    case 'LOGIN_ERROR':
      return {
        login: updateDataState.error(state.login, action.payload, true),
      };
    default:
      return state;
  }
};

export default userReducer;

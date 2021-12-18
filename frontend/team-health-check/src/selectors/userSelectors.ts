import { RootState } from '../store';

const selectLogin = (state: RootState) => state.user.login;

export default selectLogin;

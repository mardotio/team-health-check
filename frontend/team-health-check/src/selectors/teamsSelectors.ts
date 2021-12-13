import { RootState } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const selectGetTeams = (state: RootState) => state.teams.get;

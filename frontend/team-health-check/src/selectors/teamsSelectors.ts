import { RootState } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const selectGetTeams = (state: RootState) => state.teams.get;
export const selectCreateTeamsForm = (state: RootState) =>
  state.teams.createForm;

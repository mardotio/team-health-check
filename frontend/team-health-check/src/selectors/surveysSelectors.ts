import { RootState } from '../store';

export const selectTeamSurveys = (state: RootState) => state.surveys.get;
export const selectSelectedTeam = (state: RootState) =>
  state.surveys.selectedTeamId;
export const selectCreateSurveyForm = (state: RootState) =>
  state.surveys.createSurveyForm;
export const selectSurveysCreate = (state: RootState) => state.surveys.create;

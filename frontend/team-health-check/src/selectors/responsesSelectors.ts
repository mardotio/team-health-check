import { RootState } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const selectSurveyUserResponses = (state: RootState) =>
  state.responses.userResponses;

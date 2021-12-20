import actionCreator, { Actions } from '../util/actionCreator';
import {
  CreateSurveyRequest,
  CreateSurveyResponse,
  GetTeamSurveysResponse,
  isErrorResponse,
  SurveysService,
} from '../util/client';
import { AppThunk } from '../store';
import { closeModal } from './uiActions';
import { CREATE_SURVEY_DIALOG_ID } from '../components/CreateSurveyDialog/CreateSurveyDialog';

const GET_SURVEYS_START = 'GET_SURVEYS_START';
const GET_SURVEYS_END = 'GET_SURVEYS_END';
const GET_SURVEYS_ERROR = 'GET_SURVEYS_ERROR';
const PATCH_CREATE_SURVEY_FORM = 'PATCH_CREATE_SURVEY_FORM';
const CREATE_SURVEY_START = 'CREATE_SURVEY_START';
const CREATE_SURVEY_END = 'CREATE_SURVEY_END';
const CREATE_SURVEY_ERROR = 'CREATE_SURVEY_ERROR';

export interface CreateSurveyForm {
  teamId: string | null;
  maxResponses: string;
}

const surveysActions = {
  getSurveysStart: () => actionCreator(GET_SURVEYS_START),
  getSurveysEnd: (payload: {
    surveys: GetTeamSurveysResponse;
    teamId: string;
  }) => actionCreator(GET_SURVEYS_END, payload),
  getSurveysError: (payload: string) =>
    actionCreator(GET_SURVEYS_ERROR, payload),
  patchCreateSurveyForm: (payload: Partial<CreateSurveyForm>) =>
    actionCreator(PATCH_CREATE_SURVEY_FORM, payload),
  createSurveyStart: () => actionCreator(CREATE_SURVEY_START),
  createSurveyEnd: (payload: CreateSurveyResponse) =>
    actionCreator(CREATE_SURVEY_END, payload),
  createSurveyError: (payload: string) =>
    actionCreator(CREATE_SURVEY_ERROR, payload),
};

export type SurveysActions = Actions<typeof surveysActions>;

export const getTeamSurveys =
  (teamId: string): AppThunk =>
  async (dispatch) => {
    dispatch(surveysActions.getSurveysStart());

    const response = await SurveysService.getTeamSurveys(teamId);

    if (isErrorResponse(response)) {
      return dispatch(
        surveysActions.getSurveysError(
          `Error while retrieving surveys for team ${teamId}`,
        ),
      );
    }

    return dispatch(
      surveysActions.getSurveysEnd({ surveys: response, teamId }),
    );
  };

export const createSurvey =
  (payload: CreateSurveyRequest): AppThunk =>
  async (dispatch) => {
    dispatch(surveysActions.createSurveyStart());

    const response = await SurveysService.createSurvey(payload);

    if (isErrorResponse(response)) {
      return dispatch(
        surveysActions.createSurveyError('Error while creating survey.'),
      );
    }

    dispatch(closeModal(CREATE_SURVEY_DIALOG_ID));
    return dispatch(surveysActions.createSurveyEnd(response));
  };

export const { patchCreateSurveyForm } = surveysActions;

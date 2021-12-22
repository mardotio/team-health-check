import actionCreator, { Actions } from '../util/actionCreator';
import {
  CreateSurveyRequest,
  CreateSurveyResponse,
  GetSurveyResponse,
  GetSurveyResponsesResponse,
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
const GET_SURVEY_START = 'GET_SURVEY_START';
const GET_SURVEY_END = 'GET_SURVEY_END';
const GET_SURVEY_ERROR = 'GET_SURVEY_ERROR';
const GET_SURVEY_RESPONSES_START = 'GET_SURVEY_RESPONSES_START';
const GET_SURVEY_RESPONSES_END = 'GET_SURVEY_RESPONSES_END';
const GET_SURVEY_RESPONSES_ERROR = 'GET_SURVEY_RESPONSES_ERROR';

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
  getSurveyStart: (payload: string) => actionCreator(GET_SURVEY_START, payload),
  getSurveyEnd: (payload: GetSurveyResponse) =>
    actionCreator(GET_SURVEY_END, payload),
  getSurveyError: (payload: string) => actionCreator(GET_SURVEY_ERROR, payload),
  getSurveyResponsesStart: () => actionCreator(GET_SURVEY_RESPONSES_START),
  getSurveyResponsesEnd: (payload: GetSurveyResponsesResponse) =>
    actionCreator(GET_SURVEY_RESPONSES_END, payload),
  getSurveyResponsesError: (payload: string) =>
    actionCreator(GET_SURVEY_RESPONSES_ERROR, payload),
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
          `Error while retrieving surveys for team '${teamId}'`,
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

export const getTeamSurveyDetails =
  (surveyId: string): AppThunk =>
  async (dispatch) => {
    dispatch(surveysActions.getSurveyStart(surveyId));

    const response = await SurveysService.getSurvey(surveyId);

    if (isErrorResponse(response)) {
      return dispatch(
        surveysActions.getSurveyError(
          `Error while retrieving survey '${surveyId}'`,
        ),
      );
    }

    return dispatch(surveysActions.getSurveyEnd(response));
  };

export const getTeamSurveyResponses =
  (surveyId: string): AppThunk =>
  async (dispatch) => {
    dispatch(surveysActions.getSurveyResponsesStart());

    const response = await SurveysService.getSurveyResponses(surveyId);

    if (isErrorResponse(response)) {
      return dispatch(
        surveysActions.getSurveyResponsesError(
          `Error while retrieving responses for survey '${surveyId}'`,
        ),
      );
    }

    return dispatch(surveysActions.getSurveyResponsesEnd(response));
  };

export const { patchCreateSurveyForm } = surveysActions;

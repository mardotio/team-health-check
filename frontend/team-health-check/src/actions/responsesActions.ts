import actionCreator, { Actions } from '../util/actionCreator';
import {
  GetUserResponsesResponse,
  isErrorResponse,
  ResponsesService,
  ResponseValues,
} from '../util/client';
import { AppThunk } from '../store';

const GET_RESPONSES_START = 'GET_RESPONSES_START';
const GET_RESPONSES_END = 'GET_RESPONSES_END';
const GET_RESPONSES_ERROR = 'GET_RESPONSES_ERROR';
const SET_RESPONSE_START = 'SET_RESPONSE_START';
const SET_RESPONSE_END = 'SET_RESPONSE_END';
const SET_RESPONSE_ERROR = 'SET_RESPONSE_ERROR';

export interface ResponsesWithSurveyId extends GetUserResponsesResponse {
  surveyId: string;
}

export interface SetResponsePayload {
  questionId: string;
  value: ResponseValues;
}

const responsesActions = {
  getResponsesStart: () => actionCreator(GET_RESPONSES_START),
  getResponsesEnd: (payload: ResponsesWithSurveyId) =>
    actionCreator(GET_RESPONSES_END, payload),
  getResponsesError: (payload: string) =>
    actionCreator(GET_RESPONSES_ERROR, payload),
  setResponseStart: () => actionCreator(SET_RESPONSE_START),
  setResponseEnd: (payload: SetResponsePayload) =>
    actionCreator(SET_RESPONSE_END, payload),
  setResponseError: (payload: string) =>
    actionCreator(SET_RESPONSE_ERROR, payload),
};

export type ResponsesActions = Actions<typeof responsesActions>;

export const getSurveyUserResponses =
  (surveyId: string): AppThunk =>
  async (dispatch) => {
    dispatch(responsesActions.getResponsesStart());

    const response = await ResponsesService.getUserResponses(surveyId);

    if (isErrorResponse(response)) {
      return dispatch(
        responsesActions.getResponsesError(
          `Error while fetching responses for survey '${surveyId}.'`,
        ),
      );
    }

    return dispatch(
      responsesActions.getResponsesEnd({ ...response, surveyId }),
    );
  };

export const setResponse =
  (questionId: string, value: ResponseValues): AppThunk =>
  async (dispatch) => {
    dispatch(responsesActions.setResponseStart());

    const response = await ResponsesService.setResponse(questionId, {
      response: value,
    });

    if (isErrorResponse(response)) {
      return dispatch(
        responsesActions.setResponseError(
          `Error while setting response for question '${questionId}'`,
        ),
      );
    }

    return dispatch(responsesActions.setResponseEnd({ questionId, value }));
  };

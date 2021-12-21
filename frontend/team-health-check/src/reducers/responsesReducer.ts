import updateDataState, { DataState } from '../util/updateDataState';
import {
  ResponsesActions,
  ResponsesWithSurveyId,
  SetResponsePayload,
} from '../actions/responsesActions';

interface ResponsesState {
  userResponses: DataState<ResponsesWithSurveyId>;
  setResponse: DataState<SetResponsePayload>;
}

const defaultResponsesState: ResponsesState = {
  userResponses: {
    data: null,
    loading: false,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
  setResponse: {
    data: null,
    loading: false,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
};

const responsesReducer = (
  state = defaultResponsesState,
  action: ResponsesActions,
): ResponsesState => {
  switch (action.type) {
    case 'GET_RESPONSES_START':
      return {
        ...state,
        userResponses: updateDataState.loading(state.userResponses),
      };
    case 'GET_RESPONSES_END':
      return {
        ...state,
        userResponses: updateDataState.success(
          state.userResponses,
          action.payload,
        ),
      };
    case 'GET_RESPONSES_ERROR':
      return {
        ...state,
        userResponses: updateDataState.error(
          state.userResponses,
          action.payload,
        ),
      };
    case 'SET_RESPONSE_START':
      return {
        ...state,
        setResponse: updateDataState.loading(state.setResponse),
      };
    case 'SET_RESPONSE_END': {
      if (state.userResponses.data === null) {
        return {
          ...state,
          setResponse: updateDataState.success(
            state.setResponse,
            action.payload,
          ),
        };
      }

      const responses = state.userResponses.data.responses.map((r) => ({
        ...r,
        response:
          r.id === action.payload.questionId
            ? action.payload.value
            : r.response,
      }));

      return {
        ...state,
        userResponses: updateDataState.success(state.userResponses, {
          ...state.userResponses.data,
          responses,
        }),
        setResponse: updateDataState.success(state.setResponse, action.payload),
      };
    }
    case 'SET_RESPONSE_ERROR':
      return {
        ...state,
        setResponse: updateDataState.error(state.setResponse, action.payload),
      };
    default:
      return state;
  }
};

export default responsesReducer;

import updateDataState, { DataState } from '../util/updateDataState';
import { CreateSurveyResponse, SurveySummary } from '../util/client';
import { CreateSurveyForm, SurveysActions } from '../actions/surveysActions';
import partitionBy from '../util/partitionBy';

interface SurveysState {
  get: DataState<{
    active: SurveySummary[];
    inactive: SurveySummary[];
  }>;
  create: DataState<CreateSurveyResponse>;
  selectedTeamId: string | null;
  createSurveyForm: CreateSurveyForm;
}

const defaultSurveysState: SurveysState = {
  get: {
    data: null,
    loading: false,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
  selectedTeamId: null,
  createSurveyForm: {
    maxResponses: '',
    teamId: null,
  },
  create: {
    data: null,
    loading: false,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
};

const surveysReducer = (
  state = defaultSurveysState,
  action: SurveysActions,
): SurveysState => {
  switch (action.type) {
    case 'GET_SURVEYS_START':
      return {
        ...state,
        get: updateDataState.loading(state.get),
      };
    case 'GET_SURVEYS_END': {
      const [active, inactive] = partitionBy(
        action.payload.surveys.surveys,
        (e) => e.active,
      );
      return {
        ...state,
        get: updateDataState.success(state.get, { active, inactive }),
        selectedTeamId: action.payload.teamId,
      };
    }
    case 'GET_SURVEYS_ERROR':
      return {
        ...state,
        get: updateDataState.error(state.get, action.payload),
      };
    case 'PATCH_CREATE_SURVEY_FORM':
      return {
        ...state,
        createSurveyForm: {
          ...state.createSurveyForm,
          ...action.payload,
        },
      };
    case 'CREATE_SURVEY_START':
      return {
        ...state,
        create: updateDataState.loading(state.create),
      };
    case 'CREATE_SURVEY_END': {
      const createdSummary: SurveySummary = {
        id: action.payload.id,
        createdOn: action.payload.createdOn,
        active: action.payload.active,
      };

      return {
        ...state,
        create: updateDataState.success(state.create, action.payload),
        get:
          action.payload.team.id === state.selectedTeamId
            ? updateDataState.success(
                state.get,
                state.get.data
                  ? {
                      ...state.get.data,
                      active: [createdSummary, ...state.get.data.active],
                    }
                  : { inactive: [], active: [createdSummary] },
              )
            : state.get,
        createSurveyForm: {
          teamId: null,
          maxResponses: '',
        },
      };
    }
    case 'CREATE_SURVEY_ERROR':
      return {
        ...state,
        create: updateDataState.error(state.create, action.payload),
      };
    default:
      return state;
  }
};

export default surveysReducer;

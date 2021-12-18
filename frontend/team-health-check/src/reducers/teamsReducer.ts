import { Team } from '../util/client';
import { TeamsActions } from '../actions/teamsActions';
import updateDataState, { DataState } from '../util/updateDataState';

interface TeamsState {
  get: DataState<Team[]>;
  create: DataState<Team>;
  createForm: {
    teamName: string;
  };
}

const defaultTeamsState: TeamsState = {
  get: {
    loading: false,
    data: null,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
  create: {
    loading: false,
    data: null,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
  createForm: {
    teamName: '',
  },
};

const teamsReducer = (
  state = defaultTeamsState,
  action: TeamsActions,
): TeamsState => {
  switch (action.type) {
    case 'TEAMS_GET_START':
      return {
        ...state,
        get: updateDataState.loading(state.get),
      };
    case 'TEAMS_GET_END':
      return {
        ...state,
        get: updateDataState.success(state.get, action.payload),
      };
    case 'TEAMS_GET_ERROR':
      return {
        ...state,
        get: updateDataState.error(state.get, action.payload),
      };
    case 'TEAMS_CREATE_START':
      return {
        ...state,
        create: updateDataState.loading(state.create),
      };
    case 'TEAMS_CREATE_END':
      return {
        ...state,
        get: updateDataState.success(state.get, [
          ...(state.get.data || []),
          action.payload,
        ]),
        create: updateDataState.success(state.create, action.payload),
        createForm: {
          teamName: '',
        },
      };
    case 'TEAMS_CREATE_ERROR':
      return {
        ...state,
        create: updateDataState.error(state.create, action.payload),
      };
    case 'TEAMS_PATCH_CREATE_FORM':
      return {
        ...state,
        createForm: {
          ...state.createForm,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default teamsReducer;

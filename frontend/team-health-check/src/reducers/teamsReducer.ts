import { Team } from '../util/client';
import { TeamsActions } from '../actions/teamsActions';
import updateDataState, { DataState } from '../util/updateDataState';

interface TeamsState {
  get: DataState<Team[]>;
}

const defaultTeamsState: TeamsState = {
  get: {
    loading: false,
    data: null,
    error: null,
    lastUpdate: null,
    lastSuccess: null,
  },
};

const teamsReducer = (state = defaultTeamsState, action: TeamsActions) => {
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
    default:
      return state;
  }
};

export default teamsReducer;

import actionCreator, { Actions } from '../util/actionCreator';
import { isErrorResponse, Team, TeamsService } from '../util/client';
import { AppThunk } from '../store';

const TEAMS_GET_START = 'TEAMS_GET_START';
const TEAMS_GET_END = 'TEAMS_GET_END';
const TEAMS_GET_ERROR = 'TEAMS_GET_ERROR';

const teamsActions = {
  teamsStart: () => actionCreator(TEAMS_GET_START),
  teamsEnd: (payload: Team[]) => actionCreator(TEAMS_GET_END, payload),
  teamsError: (payload: string) => actionCreator(TEAMS_GET_ERROR, payload),
};

export type TeamsActions = Actions<typeof teamsActions>;

export const fetchTeams = (): AppThunk => async (dispatch) => {
  dispatch(teamsActions.teamsStart());

  const response = await TeamsService.getTeams();

  if (isErrorResponse(response)) {
    return dispatch(teamsActions.teamsError('Error while fetching teams.'));
  }

  return dispatch(teamsActions.teamsEnd(response.teams));
};

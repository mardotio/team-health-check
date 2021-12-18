import actionCreator, { Actions } from '../util/actionCreator';
import {
  CreateTeamResponse,
  isErrorResponse,
  Team,
  TeamsService,
} from '../util/client';
import { AppThunk } from '../store';
import { closeModal } from './uiActions';
import { CREATE_TEAM_MODAL_ID } from '../components/Sidebar/CreateTeamModal';

const TEAMS_GET_START = 'TEAMS_GET_START';
const TEAMS_GET_END = 'TEAMS_GET_END';
const TEAMS_GET_ERROR = 'TEAMS_GET_ERROR';
const TEAMS_CREATE_START = 'TEAMS_CREATE_START';
const TEAMS_CREATE_END = 'TEAMS_CREATE_END';
const TEAMS_CREATE_ERROR = 'TEAMS_CREATE_ERROR';
const TEAMS_PATCH_CREATE_FORM = 'TEAMS_PATCH_CREATE_FORM';

interface CreateTeamForm {
  teamName: string;
}

const teamsActions = {
  teamsStart: () => actionCreator(TEAMS_GET_START),
  teamsEnd: (payload: Team[]) => actionCreator(TEAMS_GET_END, payload),
  teamsError: (payload: string) => actionCreator(TEAMS_GET_ERROR, payload),
  teamsCreateStart: () => actionCreator(TEAMS_CREATE_START),
  teamsCreateEnd: (payload: CreateTeamResponse) =>
    actionCreator(TEAMS_CREATE_END, payload),
  teamsCreateError: (payload: string) =>
    actionCreator(TEAMS_CREATE_ERROR, payload),
  patchCreateForm: (payload: Partial<CreateTeamForm>) =>
    actionCreator(TEAMS_PATCH_CREATE_FORM, payload),
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

export const patchCreateTeamForm = teamsActions.patchCreateForm;

export const createTeam =
  (teamName: string): AppThunk =>
  async (dispatch) => {
    dispatch(teamsActions.teamsCreateStart());

    const response = await TeamsService.createTeam({ displayName: teamName });

    if (isErrorResponse(response)) {
      return dispatch(
        teamsActions.teamsCreateError(`Error while creating ${teamName}.`),
      );
    }

    dispatch(closeModal(CREATE_TEAM_MODAL_ID));
    return dispatch(teamsActions.teamsCreateEnd(response));
  };

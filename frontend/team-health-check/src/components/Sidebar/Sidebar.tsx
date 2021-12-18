import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectCreateTeamsForm,
  selectGetTeams,
} from '../../selectors/teamsSelectors';
import {
  createTeam,
  fetchTeams,
  patchCreateTeamForm,
} from '../../actions/teamsActions';
import selectModalId from '../../selectors/uiSelectors';
import { closeModal, openModal } from '../../actions/uiActions';
import CreateTeamModal, { CREATE_TEAM_MODAL_ID } from './CreateTeamModal';

const Wrapper = styled.nav`
  border-right: 1px solid #ccd4d9;
  flex-basis: 250px;
  flex-grow: 0;
`;

const Header = styled.h3`
  font-size: 18px;
  padding: 12px;
  border-bottom: 1px solid #ccd4d9;
`;

const TeamsContainer = styled.div`
  padding: 12px;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  text-transform: none !important;
  justify-content: flex-start !important;
  padding-left: 24px !important;
`;

const Sidebar = () => {
  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
  } = useAppSelector(selectGetTeams);
  const modalId = useAppSelector(selectModalId);
  const createTeamForm = useAppSelector(selectCreateTeamsForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!teams && !teamsLoading && !teamsError) {
      dispatch(fetchTeams());
    }
  }, [teams, teamsLoading, teamsError, dispatch]);

  const teamsButtons = (teams || []).map((t) => (
    <SidebarButton key={t.id} variant="text" size="small">
      {t.displayName}
    </SidebarButton>
  ));

  const onCancelCreate = () => {
    dispatch(closeModal(CREATE_TEAM_MODAL_ID));
    dispatch(patchCreateTeamForm({ teamName: '' }));
  };

  return (
    <Wrapper>
      <Header>Team Health Check</Header>
      <TeamsContainer>
        {teamsButtons}

        <SidebarButton
          variant="text"
          size="small"
          onClick={() => dispatch(openModal(CREATE_TEAM_MODAL_ID))}
        >
          Add team
        </SidebarButton>
      </TeamsContainer>
      <CreateTeamModal
        isOpen={modalId === CREATE_TEAM_MODAL_ID}
        onTeamNameChange={(teamName) =>
          dispatch(patchCreateTeamForm({ teamName }))
        }
        onSubmit={(teamName) => dispatch(createTeam(teamName))}
        teamName={createTeamForm.teamName}
        onCancel={onCancelCreate}
        onClose={() => dispatch(closeModal(CREATE_TEAM_MODAL_ID))}
      />
    </Wrapper>
  );
};

export default Sidebar;

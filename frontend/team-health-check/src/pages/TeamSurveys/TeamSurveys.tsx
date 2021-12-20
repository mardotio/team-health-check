import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoTeamSelected from './NoTeamSelected';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectCreateSurveyForm,
  selectSelectedTeam,
  selectTeamSurveys,
} from '../../selectors/surveysSelectors';
import { selectGetTeams } from '../../selectors/teamsSelectors';
import {
  createSurvey,
  getTeamSurveys,
  patchCreateSurveyForm,
} from '../../actions/surveysActions';
import selectModalId from '../../selectors/uiSelectors';
import CreateSurveyDialog from '../../components/CreateSurveyDialog';
import { CREATE_SURVEY_DIALOG_ID } from '../../components/CreateSurveyDialog/CreateSurveyDialog';
import { closeModal, openModal } from '../../actions/uiActions';
import SurveyList from './SurveyList';

const Header = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ccd4d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamSurveys = () => {
  const { teamName } = useParams<'teamName'>();
  const dispatch = useAppDispatch();
  const selectedTeamId = useAppSelector(selectSelectedTeam);
  const {
    loading: surveysLoading,
    error: surveysError,
    data: surveys,
  } = useAppSelector(selectTeamSurveys);
  const { data: teams } = useAppSelector(selectGetTeams);
  const modalId = useAppSelector(selectModalId);
  const createSurveyForm = useAppSelector(selectCreateSurveyForm);

  const selectedTeam = (teams || []).find((t) => t.displayName === teamName);

  useEffect(() => {
    if (!selectedTeam) {
      return;
    }

    if (selectedTeamId === selectedTeam.id && surveys) {
      return;
    }

    if (selectedTeamId !== selectedTeam.id && !surveysLoading) {
      dispatch(getTeamSurveys(selectedTeam.id));
    }

    if (!surveys && !surveysLoading && !surveysError) {
      dispatch(getTeamSurveys(selectedTeam.id));
    }
  }, [
    selectedTeam,
    selectedTeamId,
    surveys,
    surveysLoading,
    surveysError,
    dispatch,
  ]);

  if (!teamName) {
    return <NoTeamSelected />;
  }

  const onOpenCreateSurvey = () => {
    dispatch(openModal(CREATE_SURVEY_DIALOG_ID));
    dispatch(patchCreateSurveyForm({ teamId: selectedTeam?.id ?? null }));
  };

  if (!surveys || !selectedTeam) {
    return (
      <>
        <Header>
          <Typography variant="h2">{teamName}</Typography>
          <Button variant="contained" onClick={onOpenCreateSurvey}>
            Create Survey
          </Button>
        </Header>
        <div>Loading surveys...</div>
      </>
    );
  }

  const onCancelCreateSurvey = () => {
    dispatch(closeModal(CREATE_SURVEY_DIALOG_ID));
    dispatch(patchCreateSurveyForm({ teamId: null, maxResponses: '' }));
  };

  return (
    <>
      <Header>
        <Typography variant="h3">{teamName}</Typography>
        <Button variant="contained" onClick={onOpenCreateSurvey}>
          Create Survey
        </Button>
      </Header>

      <SurveyList
        onCreateSurvey={onOpenCreateSurvey}
        surveys={surveys}
        selectedTeam={selectedTeam}
      />

      <CreateSurveyDialog
        teams={teams || []}
        value={createSurveyForm}
        onChange={(e) => dispatch(patchCreateSurveyForm(e))}
        onSubmit={(v) => dispatch(createSurvey(v))}
        onCancel={onCancelCreateSurvey}
        onClose={() => dispatch(closeModal(CREATE_SURVEY_DIALOG_ID))}
        isOpen={modalId === CREATE_SURVEY_DIALOG_ID}
      />
    </>
  );
};

export default TeamSurveys;

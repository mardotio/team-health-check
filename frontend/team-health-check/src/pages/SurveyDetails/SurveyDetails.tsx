import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectGetTeams } from '../../selectors/teamsSelectors';
import {
  selectSurveyResponses,
  selectSurveysSurveyDetails,
} from '../../selectors/surveysSelectors';
import {
  getTeamSurveyDetails,
  getTeamSurveyResponses,
} from '../../actions/surveysActions';
import SurveyResponses from './SurveyResponses';
import SurveyMetadata from '../../components/SurveyMetadata';
import SurveyLinkModal, {
  SURVEY_LINK_MODAL_ID,
} from '../../components/SurveyLinkModal';
import selectModalId from '../../selectors/uiSelectors';
import { closeModal, openModal } from '../../actions/uiActions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ccd4d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow: auto;
`;

const SurveyDetails = () => {
  const { teamName, surveyId } = useParams<'teamName' | 'surveyId'>();
  const dispatch = useAppDispatch();
  const modalId = useAppSelector(selectModalId);
  const { data: teams } = useAppSelector(selectGetTeams);
  const {
    loading: surveyLoading,
    error: surveyError,
    data: survey,
  } = useAppSelector(selectSurveysSurveyDetails);
  const {
    loading: responsesLoading,
    error: responsesError,
    data: responses,
  } = useAppSelector(selectSurveyResponses);

  useEffect(() => {
    if (!survey && !surveyError && !surveyLoading && surveyId) {
      dispatch(getTeamSurveyDetails(surveyId));
    }
  }, [survey, surveyError, surveyLoading, surveyId, dispatch]);

  useEffect(() => {
    if (!responsesLoading && !responsesError && !responses && surveyId) {
      dispatch(getTeamSurveyResponses(surveyId));
    }
  }, [responsesLoading, responsesError, responses, surveyId, dispatch]);

  const selectedTeam = (teams || []).find((t) => t.displayName === teamName);

  if (teams && !selectedTeam) {
    return <div>Could not find team {teamName}</div>;
  }

  if (!responses || !survey) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header>
        <Typography variant="h3">{survey.team.displayName}</Typography>
      </Header>

      <Content>
        <SurveyMetadata
          survey={survey}
          onSurveyLinkClick={() => dispatch(openModal(SURVEY_LINK_MODAL_ID))}
          showActions={survey.active}
        />
        <SurveyResponses responses={responses.responses} />
        <SurveyLinkModal
          surveyId={survey.id}
          isOpen={modalId === SURVEY_LINK_MODAL_ID}
          onClose={() => dispatch(closeModal(SURVEY_LINK_MODAL_ID))}
        />
      </Content>
    </Wrapper>
  );
};

export default SurveyDetails;

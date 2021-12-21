import React, { useEffect } from 'react';
import { generatePath, useParams, Link as RrdLink } from 'react-router-dom';
import styled from 'styled-components';
import { Divider, Link, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectSurveysSurveyDetails } from '../../selectors/surveysSelectors';
import { getTeamSurveyDetails } from '../../actions/surveysActions';
import { selectSurveyUserResponses } from '../../selectors/responsesSelectors';
import {
  getSurveyUserResponses,
  setResponse,
} from '../../actions/responsesActions';
import SurveyQuestion from './SurveyQuestion';
import SurveyMetadata from '../../components/SurveyMetadata';
import ROUTES from '../../routes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const MetadataContainer = styled.div`
  margin-bottom: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const QuestionDivider = styled(Divider)`
  max-width: 250px;
  width: 100%;
  margin: 24px 0 !important;
`;

const Survey = () => {
  const { surveyId } = useParams<'surveyId'>();
  const dispatch = useAppDispatch();
  const {
    loading: surveyLoading,
    data: survey,
    error: surveyError,
  } = useAppSelector(selectSurveysSurveyDetails);
  const {
    loading: responsesLoading,
    data: responses,
    error: responsesError,
  } = useAppSelector(selectSurveyUserResponses);
  const isSurveyActive = survey ? survey.active : false;

  useEffect(() => {
    if (!surveyLoading && !survey && !surveyError && surveyId) {
      dispatch(getTeamSurveyDetails(surveyId));
    }
  }, [surveyLoading, survey, surveyError, surveyId]);

  useEffect(() => {
    if (
      isSurveyActive &&
      !responsesLoading &&
      !responsesError &&
      !responses &&
      surveyId
    ) {
      dispatch(getSurveyUserResponses(surveyId));
    }
  }, [
    isSurveyActive,
    responsesLoading,
    responsesError,
    responses,
    survey,
    dispatch,
  ]);

  if (!surveyId) {
    return <div>Could not fetch specified survey</div>;
  }

  if (surveyError) {
    return <div>Error while fetching survey {`'${surveyId}'`}</div>;
  }

  if (survey && !survey.active) {
    return (
      <Wrapper>
        <MetadataContainer>
          <SurveyMetadata survey={survey} showActions={false} />
        </MetadataContainer>

        <Typography>
          This survey is no longer accepting responses.{' '}
          <Link
            {...{
              component: RrdLink,
              to: generatePath(ROUTES.teamSurveyDetails, {
                teamName: survey.team.displayName,
                surveyId: survey.id,
              }),
            }}
          >
            View results
          </Link>
          .
        </Typography>
      </Wrapper>
    );
  }

  if (surveyLoading || !survey || responsesLoading || !responses) {
    return <div>loading survey</div>;
  }

  return (
    <Wrapper>
      <MetadataContainer>
        <SurveyMetadata survey={survey} showActions={false} />
      </MetadataContainer>

      {responses.responses.map((r, i) => (
        <React.Fragment key={r.id}>
          {i !== 0 && <QuestionDivider />}

          <SurveyQuestion
            value={r.response}
            question={r.question}
            questionId={r.id}
            onChange={(v) => {
              dispatch(setResponse(r.id, v));
            }}
          />
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default Survey;

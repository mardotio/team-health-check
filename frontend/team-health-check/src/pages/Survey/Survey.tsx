import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectSurveysSurveyDetails } from '../../selectors/surveysSelectors';
import { getTeamSurveyDetails } from '../../actions/surveysActions';
import { selectSurveyUserResponses } from '../../selectors/responsesSelectors';
import {
  getSurveyUserResponses,
  setResponse,
} from '../../actions/responsesActions';
import SurveyQuestion from './SurveyQuestion';

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
    return <div>This survey is no longer accepting responses</div>;
  }

  if (surveyLoading || !survey || responsesLoading || !responses) {
    return <div>loading survey</div>;
  }

  return (
    <div>
      {responses.responses.map((r) => (
        <SurveyQuestion
          key={r.id}
          value={r.response}
          question={r.question}
          questionId={r.id}
          onChange={(v) => {
            dispatch(setResponse(r.id, v));
          }}
        />
      ))}
    </div>
  );
};

export default Survey;

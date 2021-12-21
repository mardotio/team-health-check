import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import { ResponseValues, SurveyResponseItem } from '../../util/client';
import ResponseCard, { ResponseBreakdown } from './ResponseCard';

interface Props {
  responses: SurveyResponseItem[];
}

type BreakdownRecord = Record<string, ResponseBreakdown>;

const INITIAL_BREAKDOWN: ResponseBreakdown = {
  thumbsDown: 0,
  thumbsUp: 0,
  shrug: 0,
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const QuestionDivider = styled(Divider)`
  margin: 24px 0 !important;
  width: 250px;
`;

const toResponseBreakdown = (responses: ResponseValues[]): ResponseBreakdown =>
  responses.reduce(
    (groupedResponses, r) => ({
      ...groupedResponses,
      [r]: groupedResponses[r] + 1,
    }),
    INITIAL_BREAKDOWN,
  );

const toBreakdownRecord = (responses: SurveyResponseItem[]): BreakdownRecord =>
  responses.reduce(
    (groupedResponses, r) => ({
      ...groupedResponses,
      [r.id]: toResponseBreakdown(r.responses),
    }),
    {},
  );

const SurveyResponses = ({ responses }: Props) => {
  const groupedResponses = toBreakdownRecord(responses);

  return (
    <Wrapper>
      {responses.map((r, i) => (
        <>
          {i !== 0 && <QuestionDivider />}
          <ResponseCard
            question={r.question}
            breakdown={groupedResponses[r.id]}
            totalReplies={r.responses.length}
          />
        </>
      ))}
    </Wrapper>
  );
};

export default SurveyResponses;

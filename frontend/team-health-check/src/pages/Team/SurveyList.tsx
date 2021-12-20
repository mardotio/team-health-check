import React from 'react';
import styled from 'styled-components';
import { Link, Typography } from '@mui/material';
import { SurveySummary, Team } from '../../util/client';
import SurveyButton from '../../components/SurveyButton';

interface Props {
  surveys: { active: SurveySummary[]; inactive: SurveySummary[] } | null;
  selectedTeam: Team;
  onCreateSurvey: () => void;
}

const Wrapper = styled.div`
  padding: 24px;
`;

interface SurveyGridProps {
  columnCount: number;
  rowCount: number;
}

const SurveyGrid = styled.div<SurveyGridProps>`
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => columnCount}, 1fr);
  grid-template-rows: repeat(${({ rowCount }) => rowCount}, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 24px;
  justify-items: center;
`;

const SurveyList = ({ surveys, selectedTeam, onCreateSurvey }: Props) => {
  const COLUMNS = 5;

  if (surveys === null) {
    return <Wrapper>Loading surveys</Wrapper>;
  }

  const combinedSurveys = [...surveys.active, ...surveys.inactive];

  if (combinedSurveys.length <= 0) {
    return (
      <Wrapper>
        <Typography variant="body1">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link component="button" onClick={onCreateSurvey}>
            Create a survey
          </Link>{' '}
          to get started
        </Typography>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SurveyGrid
        columnCount={COLUMNS}
        rowCount={Math.floor(combinedSurveys.length / COLUMNS)}
      >
        {combinedSurveys.map((s) => (
          <SurveyButton
            to={`/teams/${selectedTeam.displayName}/${s.id}`}
            surveySummary={s}
          />
        ))}
      </SurveyGrid>
    </Wrapper>
  );
};

export default SurveyList;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format, toDate } from 'date-fns';
import { Typography } from '@mui/material';
import { SurveySummary } from '../../util/client';

interface Props {
  to: string;
  surveySummary: SurveySummary;
}

const Wrapper = styled(Link)`
  text-decoration: none;
  color: initial;
  border: 1px solid #ccd4d9;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
  padding: 12px 12px 4px 12px;
  width: 200px;
  text-align: center;

  &:hover {
    background-color: #f2f5f7;
  }
`;

interface StatusTextProps {
  active: boolean;
}

const StatusText = styled.p<StatusTextProps>`
  color: ${({ active }) => (active ? '#07a345' : '#818f99')};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;

  svg {
    fill: ${({ active }) => (active ? '#07a345' : '#818f99')};
    height: 6px;
    width: 6px;
    margin-right: 4px;
  }
`;

const SurveyButton = ({ to, surveySummary }: Props) => {
  const createdOn = toDate(surveySummary.createdOn);
  return (
    <Wrapper to={to}>
      <Typography variant="h6">{format(createdOn, 'M/d/yy')}</Typography>
      <Typography variant="subtitle1">
        {format(createdOn, 'h:mm:ss a')}
      </Typography>
      <Typography variant="subtitle2">week {format(createdOn, 'w')}</Typography>
      <StatusText active={surveySummary.active}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <Typography variant="caption" component="span">
          {surveySummary.active ? 'Active' : 'Inactive'}
        </Typography>
      </StatusText>
    </Wrapper>
  );
};

export default SurveyButton;

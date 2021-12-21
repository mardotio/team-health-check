import React from 'react';
import { format, toDate } from 'date-fns';
import styled from 'styled-components';
import { Button, Divider, Typography } from '@mui/material';
import { GetSurveyResponse } from '../../util/client';

interface Props {
  survey: GetSurveyResponse;
  onSurveyLinkClick: () => void;
}

const Wrapper = styled.div`
  padding: 12px 24px;
  border-radius: 4px;
  border: 1px solid #ccd4d9;
  max-width: 1000px;
  width: 100%;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const MetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Metadata = styled.dl`
  margin: 0;
`;

const SurveyMetadata = ({ survey, onSurveyLinkClick }: Props) => {
  const createdOn = toDate(survey.createdOn);

  return (
    <Wrapper>
      <MetadataContainer>
        <Metadata>
          <Typography variant="overline" component="dt">
            Created On
          </Typography>
          <Typography variant="body1" component="dd">
            {format(createdOn, 'MMMM d, yyyy')}
          </Typography>
        </Metadata>

        <Metadata>
          <Typography variant="overline" component="dt">
            Max responses
          </Typography>
          <Typography variant="body1" component="dd">
            {survey.maxResponses}
          </Typography>
        </Metadata>

        <Metadata>
          <Typography variant="overline" component="dt">
            Status
          </Typography>
          <Typography variant="body1" component="dd">
            {survey.active ? 'Active' : 'Inactive'}
          </Typography>
        </Metadata>
      </MetadataContainer>

      <Divider />

      <ActionsWrapper>
        <Button onClick={onSurveyLinkClick}>Survey link</Button>
      </ActionsWrapper>
    </Wrapper>
  );
};

export default SurveyMetadata;

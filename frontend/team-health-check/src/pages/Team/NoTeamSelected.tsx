import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const NoTeamSelected = () => (
  <Wrapper>
    <Typography variant="h5">Select a team to get started</Typography>
  </Wrapper>
);

export default NoTeamSelected;

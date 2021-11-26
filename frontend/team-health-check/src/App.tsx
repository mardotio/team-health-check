import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100%;
  background-color: white;
`;

const AppHeader = styled.header`
  padding: 12px;
  font-size: 36px;
  text-align: center;
  border-bottom: 1px solid lightgray;
`;

const App = () => (
  <AppWrapper>
    <AppHeader>Team Health Check</AppHeader>
  </AppWrapper>
);

export default App;

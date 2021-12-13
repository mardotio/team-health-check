import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import selectLogin from './selectors/userSelectors';
import { login } from './actions/userActions';

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

const App = () => {
  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
  } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loginData && !loginError && !loginLoading) {
      dispatch(login());
    }
  }, [loginData, loginError, loginLoading]);

  if (!loginData) {
    return null;
  }

  return (
    <AppWrapper>
      <AppHeader>Team Health Check</AppHeader>
    </AppWrapper>
  );
};

export default App;

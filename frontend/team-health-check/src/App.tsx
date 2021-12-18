import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import selectLogin from './selectors/userSelectors';
import { login } from './actions/userActions';
import Sidebar from './components/Sidebar';

const AppWrapper = styled.div`
  min-height: 100%;
  background-color: white;
  display: flex;
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
      <Sidebar />
    </AppWrapper>
  );
};

export default App;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import selectLogin from './selectors/userSelectors';
import { login } from './actions/userActions';
import Sidebar from './components/Sidebar';
import Team from './pages/Team';
import ROUTES from './routes';

const AppWrapper = styled.div`
  min-height: 100%;
  background-color: white;
  display: flex;
`;

const AppContent = styled.div`
  flex-grow: 1;
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
      <AppContent>
        <Routes>
          <Route path={ROUTES.teamSurveys} element={<Team />} />
          <Route path={ROUTES.home} element={<Team />} />
        </Routes>
      </AppContent>
    </AppWrapper>
  );
};

export default App;

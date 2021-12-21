import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import selectLogin from './selectors/userSelectors';
import { login } from './actions/userActions';
import Sidebar from './components/Sidebar';
import TeamSurveys from './pages/TeamSurveys';
import ROUTES from './routes';
import SurveyDetails from './pages/SurveyDetails/SurveyDetails';

const AppWrapper = styled.div`
  min-height: 100%;
  max-height: 100%;
  background-color: white;
  display: flex;
`;

const AppContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
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
          <Route path={ROUTES.teamSurveyDetails} element={<SurveyDetails />} />
          <Route path={ROUTES.teamSurveys} element={<TeamSurveys />} />
          <Route path={ROUTES.home} element={<TeamSurveys />} />
        </Routes>
      </AppContent>
    </AppWrapper>
  );
};

export default App;

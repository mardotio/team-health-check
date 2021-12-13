import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectGetTeams } from '../../selectors/teamsSelectors';
import { fetchTeams } from '../../actions/teamsActions';

const Wrapper = styled.nav`
  border-right: 1px solid #ccd4d9;
  flex-basis: 250px;
  flex-grow: 0;
`;

const Header = styled.h3`
  font-size: 18px;
  padding: 12px;
  border-bottom: 1px solid #ccd4d9;
`;

const TeamsContainer = styled.div`
  padding: 12px;
`;

const Sidebar = () => {
  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
  } = useAppSelector(selectGetTeams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!teams && !teamsLoading && !teamsError) {
      dispatch(fetchTeams());
    }
  }, [teams, teamsLoading, teamsError, dispatch]);

  const teamsButtons = (teams || []).map((t) => (
    <Button id={t.id} variant="outlined" size="small">
      {t.displayName}
    </Button>
  ));

  return (
    <Wrapper>
      <Header>Team Health Check</Header>
      <TeamsContainer>{teamsButtons}</TeamsContainer>
    </Wrapper>
  );
};

export default Sidebar;

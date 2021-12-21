import React from 'react';
import { generatePath } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import styled from 'styled-components';
import ROUTES from '../../routes';
import copyToClipboard from '../../util/copyToClipboard';

interface Props {
  surveyId: string;
  isOpen: boolean;
  onClose: () => void;
}

const LinkText = styled.div`
  font-family: monospace;
  background-color: #f2f5f7;
  border-left: 8px solid #e4e9ed;
  padding: 12px 24px;
  margin: 8px 0;
`;

export const SURVEY_LINK_MODAL_ID = 'SURVEY_LINK_MODAL_ID';

const SurveyLinkModal = ({ surveyId, isOpen, onClose }: Props) => {
  const { port, hostname, protocol } = window.location;
  const surveyLink = `${protocol}//${hostname}${
    port ? `:${port}` : ''
  }${generatePath(ROUTES.survey, { surveyId })}`;

  const copyAndClose = async () => {
    await copyToClipboard(surveyLink);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Survey link</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Share the link below to invite someone to your health check survey.
        </DialogContentText>

        <LinkText>{surveyLink}</LinkText>

        <DialogActions>
          <Button onClick={copyAndClose}>Copy link</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyLinkModal;

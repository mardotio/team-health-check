import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { CreateSurveyRequest, Team } from '../../util/client';
import { CreateSurveyForm } from '../../actions/surveysActions';

interface Props {
  teams: Team[];
  value: CreateSurveyForm;
  onChange: (v: Partial<CreateSurveyForm>) => void;
  onSubmit: (v: CreateSurveyRequest) => void;
  onCancel: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const getValidatedFormValues = ({
  teamId,
  maxResponses,
}: CreateSurveyForm): CreateSurveyRequest | null => {
  if (!teamId || !maxResponses) {
    return null;
  }

  const maxResponsesNumber = parseInt(maxResponses, 10);

  if (Number.isNaN(maxResponsesNumber) || maxResponsesNumber < 1) {
    return null;
  }

  return {
    teamId,
    maxResponses: maxResponsesNumber,
  };
};

export const CREATE_SURVEY_DIALOG_ID = 'CREATE_SURVEY_DIALOG_ID';

const CreateSurveyDialog = ({
  teams,
  value,
  isOpen,
  onChange,
  onSubmit: onSubmitProps,
  onClose,
  onCancel,
}: Props) => {
  const onSubmit = (values: CreateSurveyForm) => {
    const validatedValues = getValidatedFormValues(values);
    if (validatedValues) {
      onSubmitProps(validatedValues);
    }
  };

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>Create survey</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a team for your survey. The survey will automatically end when
          the maximum number of responses are received.
        </DialogContentText>
        <TextField
          id="create-survey-team-label"
          select
          label="Select team"
          value={value.teamId || ''}
          onChange={(e) => onChange({ teamId: e.target.value })}
          margin="dense"
          fullWidth
        >
          {teams.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.displayName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Maximum responses"
          required
          value={value.maxResponses}
          margin="dense"
          onChange={(e) =>
            onChange({
              maxResponses: (e.target.value || '').replace(/\D/g, ''),
            })
          }
          fullWidth
        />
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSubmit(value)} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSurveyDialog;

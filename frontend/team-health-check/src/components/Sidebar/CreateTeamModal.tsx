import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface Props {
  isOpen: boolean;
  onTeamNameChange: (v: string) => void;
  onSubmit: (v: string) => void;
  teamName: string;
  onCancel: () => void;
  onClose: () => void;
}

export const CREATE_TEAM_MODAL_ID = 'CREATE_TEAM_MODAL_ID';

const CreateTeamModal = ({
  isOpen,
  onTeamNameChange,
  onSubmit,
  teamName,
  onCancel,
  onClose,
}: Props) => {
  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(teamName);
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose} maxWidth="sm">
      <DialogTitle>Add a team</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a team in order to associate surveys with it.
        </DialogContentText>
        <form onSubmit={onSubmitForm}>
          <TextField
            required
            autoFocus
            label="Team name"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => onTeamNameChange(e.target.value)}
            fullWidth
            margin="dense"
          />
        </form>
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            cancel
          </Button>
          <Button onClick={() => onSubmit(teamName)} variant="contained">
            submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamModal;

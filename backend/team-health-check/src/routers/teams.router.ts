import express from 'express';
import {
  createTeam,
  getTeams,
  validateCreateTeam,
} from '../services/teams.service';

const teamsRouter = express.Router();

teamsRouter.get('/', getTeams);
teamsRouter.post('/', ...validateCreateTeam(), createTeam);

export default teamsRouter;

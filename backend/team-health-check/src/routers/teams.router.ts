import express from 'express';
import { createTeam, validateCreateTeam } from '../services/teams.service';

const teamsRouter = express.Router();

teamsRouter.post('/', ...validateCreateTeam(), createTeam);

export default teamsRouter;

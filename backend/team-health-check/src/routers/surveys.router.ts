import express from 'express';
import {
  createSurvey,
  getSurvey,
  getTeamSurveys,
  validateCreateSurvey,
  validateGetSurvey,
  validateGetTeamSurveys,
} from '../services/surveys.service';

const surveysRouter = express.Router();

surveysRouter.post('/', ...validateCreateSurvey(), createSurvey);
surveysRouter.get('/:surveyId', ...validateGetSurvey(), getSurvey);
surveysRouter.get('/team/:teamId', ...validateGetTeamSurveys(), getTeamSurveys);

export default surveysRouter;

import express from 'express';
import {
  createSurvey,
  getSurvey,
  getSurveyResponses,
  getTeamSurveys,
  validateCreateSurvey,
  validateGetSurvey,
  validateGetSurveyResponses,
  validateGetTeamSurveys,
} from '../services/surveys.service';

const surveysRouter = express.Router();

surveysRouter.post('/', ...validateCreateSurvey(), createSurvey);
surveysRouter.get('/:surveyId', ...validateGetSurvey(), getSurvey);
surveysRouter.get('/team/:teamId', ...validateGetTeamSurveys(), getTeamSurveys);
surveysRouter.get(
  '/:surveyId/responses',
  ...validateGetSurveyResponses(),
  getSurveyResponses,
);

export default surveysRouter;

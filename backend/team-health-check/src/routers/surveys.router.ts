import express from 'express';
import {
  createSurvey,
  editSurvey,
  getSurvey,
  getSurveyResponses,
  getTeamSurveys,
  validateCreateSurvey,
  validateEditSurvey,
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
surveysRouter.patch('/:surveyId', ...validateEditSurvey(), editSurvey);

export default surveysRouter;

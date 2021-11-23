import express from 'express';
import {
  createSurvey,
  getSurvey,
  validateCreateSurvey,
  validateGetSurvey,
} from '../services/surveys.service';

const surveysRouter = express.Router();

surveysRouter.post('/', ...validateCreateSurvey(), createSurvey);
surveysRouter.get('/:surveyId', ...validateGetSurvey(), getSurvey);

export default surveysRouter;

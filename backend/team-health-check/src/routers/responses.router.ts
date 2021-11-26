import express from 'express';
import {
  getSurveyResponse,
  setResponse,
  validateGetResponse,
  validateSetResponse,
} from '../services/responses.service';

const responsesRouter = express.Router();

responsesRouter.put('/:questionId', ...validateSetResponse(), setResponse);
responsesRouter.get(
  '/survey/:surveyId',
  ...validateGetResponse(),
  getSurveyResponse,
);

export default responsesRouter;

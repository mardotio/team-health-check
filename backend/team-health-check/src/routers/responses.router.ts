import express from 'express';
import {
  setResponse,
  validateSetResponse,
} from '../services/responses.service';

const responsesRouter = express.Router();

responsesRouter.put('/:questionId', ...validateSetResponse(), setResponse);

export default responsesRouter;

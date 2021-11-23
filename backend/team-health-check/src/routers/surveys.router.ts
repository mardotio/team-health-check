import express from 'express';
import { createSurvey, validateCreateSurvey } from '../services/surveys.service';

const surveysRouter = express.Router();

surveysRouter.post('/', ...validateCreateSurvey(), createSurvey);

export default surveysRouter;

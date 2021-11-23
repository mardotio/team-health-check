import express from 'express';
import { createSurvey } from '../services/surveys.service';

const surveysRouter = express.Router();

surveysRouter.post('/', createSurvey);

export default surveysRouter;

import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { getRepository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import Survey from '../entities/Survey';
import SurveyQuestion from '../entities/SurveyQuestion';
import sendJson from '../util/sendJson';
import APP_ENVIRONMENT from '../util/environment';

interface SurveyQuestionsResponse {
  questions: string[];
}

const fetchQuestions = async () => {
  const res = await fetch(APP_ENVIRONMENT.QUESTIONS_URL);

  if (res.ok) {
    return (await res.json()) as SurveyQuestionsResponse;
  }

  return null;
};

interface CreateSurveyResponse {
  id: string;
  createdOn: number;
  active: boolean;
  questions: {
    id: string;
    question: string;
  }[];
}

// eslint-disable-next-line import/prefer-default-export
export const createSurvey = async (req: Request, res: Response) => {
  const questions = await fetchQuestions();

  if (questions === null) {
    return res.send(500).json({ errors: ['Unable to fetch survey questions'] });
  }

  const surveyRepo = getRepository(Survey);
  const surveyQuestionRepo = getRepository(SurveyQuestion);

  const createdSurvey = await surveyRepo.save({
    ...new Survey(),
    id: uuidV4(),
    createdBy: req.jwtPayload.id,
    active: true,
  });

  const questionsAsyncSave = questions.questions.map((q) =>
    surveyQuestionRepo.save({
      ...new SurveyQuestion(),
      survey: createdSurvey,
      question: q,
    }),
  );

  let savedQuestions: SurveyQuestion[] | null = null;

  try {
    savedQuestions = await Promise.all(questionsAsyncSave);
  } catch (e) {
    return res.send(500).json({ errors: [e] });
  }

  if (savedQuestions === null) {
    return res
      .send(500)
      .json({ errors: ['Error while generating survey questions.'] });
  }

  return sendJson<CreateSurveyResponse>(res, 200, {
    id: createdSurvey.id,
    createdOn: createdSurvey.createdOn.getTime(),
    active: createdSurvey.active,
    questions: savedQuestions.map(({ id, question }) => ({ id, question })),
  });
};

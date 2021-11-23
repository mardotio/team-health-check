import { RequestHandler } from 'express';
import fetch from 'node-fetch';
import { getRepository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { body, param, validationResult } from 'express-validator';
import Survey from '../entities/Survey';
import SurveyQuestion from '../entities/SurveyQuestion';
import sendJson from '../util/sendJson';
import APP_ENVIRONMENT from '../util/environment';
import Team from '../entities/Team';

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

interface Question {
  id: string;
  question: string;
}

interface SurveyTeam {
  id: string;
  displayName: string;
}

interface CreateSurveyRequest {
  teamId: string;
}

interface CreateSurveyResponse {
  id: string;
  createdOn: number;
  active: boolean;
  questions: Question[];
  team: SurveyTeam;
}

export const validateCreateSurvey = () => [body('teamId').isUUID(4)];

export const createSurvey: RequestHandler<{}, {}, CreateSurveyRequest> = async (
  req,
  res,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendJson(res, 400, { errors: errors.array() });
  }

  const { teamId } = req.body;
  const teamRepo = getRepository(Team);

  const targetTeam = await teamRepo.findOne(teamId);

  if (!targetTeam) {
    return sendJson(res, 400, {
      errors: [`Could not find team with ID "${teamId}".`],
    });
  }

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
    team: targetTeam,
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
    team: {
      id: targetTeam.id,
      displayName: targetTeam.displayName,
    },
  });
};

interface GetSurveyParams {
  surveyId: string;
}

interface SurveyResponse {
  id: string;
  createdOn: number;
  questions: Question[];
  team: SurveyTeam;
  active: boolean;
}

export const validateGetSurvey = () => [param('surveyId').isUUID()];

export const getSurvey: RequestHandler<GetSurveyParams> = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendJson(res, 400, { errors: errors.array() });
  }

  const { surveyId } = req.params;
  const surveyRepo = getRepository(Survey);

  const targetSurvey = await surveyRepo.findOne({
    where: { id: surveyId },
    relations: ['questions', 'team'],
  });

  if (!targetSurvey) {
    return sendJson(res, 404, `Could not find survey by ID "${surveyId}".`);
  }

  return sendJson<SurveyResponse>(res, 200, {
    id: targetSurvey.id,
    createdOn: targetSurvey.createdOn.getTime(),
    questions: targetSurvey.questions.map((q) => ({
      id: q.id,
      question: q.question,
    })),
    team: {
      id: targetSurvey.team.id,
      displayName: targetSurvey.team.displayName,
    },
    active: targetSurvey.active,
  });
};

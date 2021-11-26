import { RequestHandler } from 'express';
import { body, param, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import arrayOfAll from '../util/arrayOfAll';
import sendJson from '../util/sendJson';
import QuestionResponse from '../entities/QuestionResponse';
import SurveyQuestion from '../entities/SurveyQuestion';
import SurveyResponse from '../entities/SurveyResponse';
import Survey from '../entities/Survey';

export type ResponseValues = 'thumbsUp' | 'thumbsDown' | 'shrug';

interface SetResponseRequest {
  response: ResponseValues;
}

interface SetResponseParams {
  questionId: string;
}

export const validateSetResponse = () => [
  param('questionId').isUUID(4),
  body('response').isIn(
    arrayOfAll<ResponseValues>()(['thumbsDown', 'thumbsUp', 'shrug']),
  ),
];

const getAndCreateResponse = async (userId: string, survey: Survey) => {
  if (!survey.active) {
    return null;
  }

  const responseRepo = getRepository(SurveyResponse);

  const existingResponse = await responseRepo.findOne({ survey, userId });

  if (!survey.maxResponses && existingResponse) {
    return existingResponse;
  }

  const surveyResponses = await responseRepo.find({ survey });
  const completedCount = surveyResponses.filter(
    (r) => r.questions === r.answered,
  ).length;

  if (survey.maxResponses && completedCount >= survey.maxResponses) {
    const surveyRepo = getRepository(Survey);
    await surveyRepo.update(survey.id, { active: false });
    return null;
  }

  if (existingResponse) {
    return existingResponse;
  }

  if (survey.maxResponses && surveyResponses.length >= survey.maxResponses) {
    return null;
  }

  const questionRepo = getRepository(SurveyQuestion);
  const questionCount = await questionRepo.count({ survey });

  return responseRepo.save({
    ...new SurveyResponse(),
    survey,
    userId,
    answered: 0,
    questions: questionCount,
  });
};

export const setResponse: RequestHandler<
  SetResponseParams,
  {},
  SetResponseRequest
> = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendJson(res, 400, { errors: errors.array() });
  }

  const { questionId } = req.params;
  const questionRepo = getRepository(SurveyQuestion);

  const targetQuestion = await questionRepo.findOne({
    where: { id: questionId },
    relations: ['survey'],
  });

  if (!targetQuestion) {
    return sendJson(res, 404, {
      errors: [`Could not find question by ID "${questionId}".`],
    });
  }

  const { id: userId } = req.jwtPayload;
  const surveyResponse = await getAndCreateResponse(
    userId,
    targetQuestion.survey,
  );

  if (surveyResponse === null) {
    return sendJson(res, 400, {
      errors: [
        'This survey is not accepting responses or is no longer active.',
      ],
    });
  }

  const { response } = req.body;
  const responseRepo = getRepository(QuestionResponse);
  const surveyResponseRepo = getRepository(SurveyResponse);

  await responseRepo.save({
    ...new QuestionResponse(),
    surveyResponse,
    response,
    question: targetQuestion,
  });

  const answerCount = await responseRepo.count({ surveyResponse });

  await surveyResponseRepo.update(surveyResponse.id, { answered: answerCount });

  return res.status(200).send();
};

interface GetResponseParams {
  surveyId: string;
}

interface SurveyResponseItem {
  id: string;
  question: string;
  response: ResponseValues | null;
}

interface GetSurveyResponseResponse {
  responses: SurveyResponseItem[];
}

export const validateGetResponse = () => [param('surveyId').isUUID(4)];

export const getSurveyResponse: RequestHandler<GetResponseParams> = async (
  req,
  res,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendJson(res, 400, { errors: errors.array() });
  }

  const { surveyId } = req.params;
  const surveyRepo = getRepository(Survey);

  const survey = await surveyRepo.findOne(surveyId);

  if (!survey) {
    return sendJson(res, 404, {
      errors: [`Could not find survey by ID "${surveyId}".`],
    });
  }

  const { id: userId } = req.jwtPayload;
  const surveyResponse = await getAndCreateResponse(userId, survey);

  if (!surveyResponse) {
    return sendJson(res, 400, { errors: ['This survey is no longer active.'] });
  }

  const questionResponseRepo = getRepository(QuestionResponse);
  const questionRepo = getRepository(SurveyQuestion);
  const questions = await questionRepo.find({ survey });
  const responses = (
    await questionResponseRepo.find({
      where: { surveyResponse },
      relations: ['question'],
    })
  ).reduce(
    (mapped, resp) => ({
      ...mapped,
      [resp.question.id]: resp.response as ResponseValues,
    }),
    {} as Record<string, ResponseValues>,
  );

  return sendJson<GetSurveyResponseResponse>(res, 200, {
    responses: questions.map((q) => ({
      id: q.id,
      question: q.question,
      response: responses[q.id] || null,
    })),
  });
};

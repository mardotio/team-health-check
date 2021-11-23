import { RequestHandler } from 'express';
import { body, param, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import arrayOfAll from '../util/arrayOfAll';
import sendJson from '../util/sendJson';
import QuestionResponse from '../entities/QuestionResponse';
import SurveyQuestion from '../entities/SurveyQuestion';

type ResponseValues = 'thumbsUp' | 'thumbsDown' | 'shrug';

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

  const targetQuestion = await questionRepo.findOne(questionId);

  if (!targetQuestion) {
    return sendJson(res, 404, {
      errors: [`Could not find question by ID "${questionId}".`],
    });
  }

  const { response } = req.body;
  const { id: userId } = req.jwtPayload;
  const responseRepo = getRepository(QuestionResponse);

  await responseRepo.save({
    ...new QuestionResponse(),
    userId,
    response,
    question: targetQuestion,
  });

  return res.status(200).send();
};

import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import sendJson from '../util/sendJson';
import Team from '../entities/Team';

interface CreateTeamRequest {
  displayName: string;
}

interface CreateTeamResponse {
  id: string;
  displayName: string;
}

export const validateCreateTeam = () => [
  body('displayName').isString().notEmpty(),
];

export const createTeam: RequestHandler<{}, {}, CreateTeamRequest> = async (
  req,
  res,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendJson(res, 400, { errors: errors.array() });
  }

  const { displayName } = req.body;

  const teamRepo = getRepository(Team);

  const existingTeam = await teamRepo
    .createQueryBuilder('team')
    .where('LOWER(team.displayName) = LOWER(:displayName)', {
      displayName,
    })
    .getOne();

  if (existingTeam) {
    return sendJson(res, 409, {
      errors: [`Team "${displayName}" already exists.`],
    });
  }

  const createdTeam = await teamRepo.save({ ...new Team(), displayName });

  return sendJson<CreateTeamResponse>(res, 200, {
    id: createdTeam.id,
    displayName: createdTeam.displayName,
  });
};

interface TeamResponse {
  id: string;
  displayName: string;
}

interface TeamsResponse {
  teams: TeamResponse[];
}

export const getTeams: RequestHandler = async (_req, res) => {
  const teamRepo = getRepository(Team);

  const teams = await teamRepo.find();

  return sendJson<TeamsResponse>(res, 200, {
    teams: teams.map((t) => ({ id: t.id, displayName: t.displayName })),
  });
};

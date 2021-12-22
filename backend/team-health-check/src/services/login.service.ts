import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import generateJwt, { LoginResponse } from '../util/jwt';
import sendJson from '../util/sendJson';
import APP_ENVIRONMENT from '../util/environment';

const login = async (req: Request, res: Response) => {
  const userId =
    !req.jwtPayload || APP_ENVIRONMENT.NEW_USER_ID_PER_JWT
      ? uuidV4()
      : req.jwtPayload.id;
  const { token, payload } = generateJwt(userId);

  res.cookie('token', token, {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: payload.exp - payload.iat,
  });

  return sendJson<LoginResponse>(res, 200, payload);
};

export default login;

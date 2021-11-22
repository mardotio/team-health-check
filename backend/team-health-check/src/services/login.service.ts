import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import generateJwt, { LoginResponse } from '../util/jwt';
import sendJson from '../util/sendJson';

const login = async (_: Request, res: Response) => {
  const userId = uuidV4();
  const { token, payload } = generateJwt(userId);

  res.cookie('token', token, {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: payload.exp - payload.iat,
  });

  return sendJson<LoginResponse>(res, 200, payload);
};

export default login;

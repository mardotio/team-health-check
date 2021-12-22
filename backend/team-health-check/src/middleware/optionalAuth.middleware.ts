import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../util/jwt';
import APP_ENVIRONMENT from '../util/environment';

interface AppCookies {
  token?: string;
}

export const withOptionalJwtAuth: RequestHandler = (req, _res, next) => {
  const { token } = req.cookies as AppCookies;

  if (!token) {
    return next();
  }

  return jwt.verify(token, APP_ENVIRONMENT.JWT_SECRET, (e, payload) => {
    if (!e && payload) {
      req.jwtPayload = payload as JwtPayload;
    }

    return next();
  });
};

export default withOptionalJwtAuth;

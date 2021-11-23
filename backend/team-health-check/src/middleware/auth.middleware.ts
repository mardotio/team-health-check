import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../util/jwt';
import APP_ENVIRONMENT from '../util/environment';

interface AppCookies {
  token?: string;
}

export const withJwtAuth: RequestHandler = (req, res, next) => {
  const { token } = req.cookies as AppCookies;

  if (!token) {
    return res.status(401).json({ errors: ['No token'] });
  }

  return jwt.verify(token, APP_ENVIRONMENT.JWT_SECRET, (e, payload) => {
    if (e) {
      return res.status(401).json({ errors: [e] });
    }

    if (!payload) {
      return res.status(401).json({ errors: ['Invalid token'] });
    }

    req.jwtPayload = payload as JwtPayload;
    return next();
  });
};

export default withJwtAuth;

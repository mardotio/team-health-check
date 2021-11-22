import jwt from 'jsonwebtoken';
import APP_ENVIRONMENT from './environment';

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface LoginResponse {
  iat: number;
  exp: number;
}

const SECONDS_IN_MINUTE = 60;
const EXPIRATION_IN_SECONDS = SECONDS_IN_MINUTE * 60 * 24 * 30;

const jwtPayloadToResponse = ({ iat, exp }: JwtPayload): LoginResponse => ({
  iat: iat * 1000,
  exp: exp * 1000,
});

const generateJwtPayload = (userId: string) => {
  const iat = Math.floor(Date.now() / 1000);
  const jwtPayload: JwtPayload = {
    id: userId,
    iat,
    exp: iat + EXPIRATION_IN_SECONDS,
  };
  return jwtPayload;
};

const generateJwt = (
  userId: string,
): { token: string; payload: LoginResponse } => {
  const jwtPayload = generateJwtPayload(userId);
  const token = jwt.sign(jwtPayload, APP_ENVIRONMENT.JWT_SECRET);

  return { token, payload: jwtPayloadToResponse(jwtPayload) };
};

export default generateJwt;

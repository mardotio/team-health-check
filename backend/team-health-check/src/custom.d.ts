declare namespace Express {
  export interface Request {
    jwtPayload: import('./util/jwt').JwtPayload;
  }
}

import { Response } from 'express';

const sendJson = <T>(res: Response, code: number, payload: T) =>
  res.status(code).json(payload);

export default sendJson;

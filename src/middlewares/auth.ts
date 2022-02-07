import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token)
    return res.status(403).send('A token is required for authentication');

  try {
    jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;

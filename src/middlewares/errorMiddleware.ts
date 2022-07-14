import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: 'internal error' });
}

export default errorMiddleware;

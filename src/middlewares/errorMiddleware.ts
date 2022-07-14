import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import IError from '../interfaces/IError';

function errorMiddleware(
  err: unknown | IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {  
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'internal error' });
}

export default errorMiddleware;

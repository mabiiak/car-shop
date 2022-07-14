import { Request, Response, NextFunction } from 'express';

export default interface ControllerInterface {
  create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  read(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  readOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;

  delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

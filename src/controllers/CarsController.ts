import { Request, Response, NextFunction } from 'express';
import CarsService from '../services/CarsService';
import ControllerInterface from '../interfaces/ControllerInterface';
import ServiceInterface from '../interfaces/ServiceInterface';

class CarsController implements ControllerInterface {
  private _carService: ServiceInterface;

  constructor(carService: ServiceInterface = new CarsService()) {
    this._carService = carService;
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const carCreated = await this._carService.create(req.body);

      return res.status(201).json(carCreated);
    } catch (err) {
      next(err);
    }
  }

  async read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const carsList = await this._carService.read();

      return res.status(200).json(carsList);
    } catch (err) {
      next(err);
    }
  }

  async readOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const oneCar = await this._carService.readOne(id);

      return res.status(200).json(oneCar);
    } catch (err) {
      next(err);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const itemUpdated = await this._carService.update(id, req.body);

      return res.status(201).json(itemUpdated);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this._carService.update(id, req.body);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export default CarsController;

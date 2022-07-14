import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../services/MotorcyclesService';
import ControllerInterface from '../interfaces/ControllerInterface';
import ServiceInterface from '../interfaces/ServiceInterface';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController implements ControllerInterface {
  private _motorService: ServiceInterface<Motorcycle>;

  errorNotFount: string;

  errorLength: string;

  constructor(
    carService: ServiceInterface<Motorcycle> = new MotorcycleService(),
  ) {
    this._motorService = carService;
    this.errorNotFount = 'Object not found';
    this.errorLength = 'Id must have 24 hexadecimal characters';
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const carCreated = await this._motorService.create(req.body);

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
      const carsList = await this._motorService.read();

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

      if (id.length < 23) {
        return res.status(400).json({ error: this.errorLength });
      }

      const oneCar = await this._motorService.readOne(id);

      if (oneCar === null) {
        return res.status(404).json({ error: this.errorNotFount });
      }

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
      if (id.length < 23) {
        return res.status(400).json({ error: this.errorLength });
      }

      const itemUpdated = await this._motorService.update(id, req.body);

      if (itemUpdated === null) {
        return res.status(404).json({ error: this.errorNotFount });
      }
      return res.status(200).json(itemUpdated);
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
      
      if (id.length < 23) { 
        return res.status(400)
          .json({ error: 'Id must have 24 hexadecimal characters' });
      }

      const deleteItem = await this._motorService.delete(id);
      
      if (!deleteItem) {
        return res.status(404).json({ error: this.errorNotFount });
      }

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export default MotorcycleController;

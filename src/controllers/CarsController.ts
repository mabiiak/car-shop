import { Request, Response, NextFunction } from 'express';
import CarsService from '../services/CarsService';
import ControllerInterface from '../interfaces/ControllerInterface';
import ServiceInterface from '../interfaces/ServiceInterface';
import { Car } from '../interfaces/CarInterface';

class CarsController implements ControllerInterface {
  private _carService: ServiceInterface<Car>;

  errorNotFount: string;

  errorLength: string;

  constructor(carService: ServiceInterface<Car> = new CarsService()) {
    this._carService = carService;
    this.errorNotFount = 'Object not found';
    this.errorLength = 'Id must have 24 hexadecimal characters';
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

      if (id.length < 23) {
        return res.status(400).json({ error: this.errorLength });
      }

      const oneCar = await this._carService.readOne(id);

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

      const itemUpdated = await this._carService.update(id, req.body);

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

      const deleteItem = await this._carService.delete(id);
      
      if (!deleteItem) {
        return res.status(404).json({ error: this.errorNotFount });
      }

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export default CarsController;

import MotorcycleModel from '../models/MotorcyclesModel';
import { Model } from '../interfaces/ModelInterface';
import ServiceInterface from '../interfaces/ServiceInterface';
import {
  Motorcycle, SchemaMotorCycle,
} from '../interfaces/MotorcycleInterface';

class MotorcycleService implements ServiceInterface<Motorcycle> {
  private _motorModel: Model<Motorcycle>;

  constructor(motorModel: Model<Motorcycle> = new MotorcycleModel()) {
    this._motorModel = motorModel;
  }
  
  async create(obj: Motorcycle): Promise<Motorcycle> {
    SchemaMotorCycle.parse(obj);
    const carCreated = await this._motorModel.create(obj);
    return carCreated;
  }

  async read(): Promise<Motorcycle[]> {
    const carsList = await this._motorModel.read();
    return carsList;
  }

  async readOne(id: string): Promise<Motorcycle | null> {
    const oneCar = this._motorModel.readOne(id);
    return oneCar;
  }

  async update(id: string, obj: Motorcycle): Promise<Motorcycle | null> {
    SchemaMotorCycle.parse(obj);

    const itemUpdated = await this._motorModel.update(id, obj);
    return itemUpdated;
  }

  async delete(id: string): Promise<Motorcycle | null> {
    return this._motorModel.delete(id);
  }
}

export default MotorcycleService;

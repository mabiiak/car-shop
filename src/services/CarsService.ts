import CarsModel from '../models/CarsModel';
import { Model } from '../interfaces/ModelInterface';
import { Car, SchemaCar } from '../interfaces/CarInterface';
import ServiceInterface from '../interfaces/ServiceInterface';

class CarsService implements ServiceInterface<Car> {
  private _carsModel: Model<Car>;

  constructor(carsModel: Model<Car> = new CarsModel()) {
    this._carsModel = carsModel;
  }
  
  async create(obj: Car): Promise<Car> {
    SchemaCar.parse(obj);
    const carCreated = await this._carsModel.create(obj);
    return carCreated;
  }

  async read(): Promise<Car[]> {
    const carsList = await this._carsModel.read();
    return carsList;
  }

  async readOne(id: string): Promise<Car | null> {
    const oneCar = this._carsModel.readOne(id);
    return oneCar;
  }

  async update(id: string, obj: Car): Promise<Car | null> {
    SchemaCar.parse(obj);

    const itemUpdated = await this._carsModel.update(id, obj);
    return itemUpdated;
  }

  async delete(id: string): Promise<Car | null> {
    return this._carsModel.delete(id);
  }
}

export default CarsService;

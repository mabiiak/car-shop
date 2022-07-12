import { model as mongoModel } from 'mongoose';
import { Car, SchemaCar } from '../interfaces/CarInterface';
import { Model } from '../interfaces/ModelInterface';

export default abstract class CarsModel implements Model<Car> {
  constructor(private carModel = mongoModel<Car>('Car', SchemaCar)) {}

  async create(obj: Car): Promise<Car> {
    const createItem = await this.carModel.create(obj);
    return createItem;
  }

  async read(): Promise<Car[]> {
    const allCars = await this.carModel.find();
    return allCars;
  }

  async readOne(item: string): Promise<Car | null> {
    const findItem = await this.carModel.findById({ _id: item });
    return findItem;
  }

  async update(item: string, obj: Car): Promise<Car | null> {
    const updateItem = await this.carModel.findOneAndUpdate(
      { _id: item },
      { ...obj },
    );
    return updateItem;
  }

  async delete(item: string): Promise<Car | null> {
    const deleteItem = await this.carModel.findOneAndDelete({ _id: item });
    return deleteItem;
  }
}

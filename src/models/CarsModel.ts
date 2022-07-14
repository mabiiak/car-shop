import { Model, model, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

const carsSchema = new Schema<Car>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export const carMongooseModel = model('car', carsSchema);

class CarsModel extends MongoModel<Car> {
  constructor(mongooseModel: Model<Car> = carMongooseModel) {
    super(mongooseModel);
  }
}

export default CarsModel;

import { Model, model, Schema } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

const motorsSchema = new Schema<Motorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export const carMongooseModel = model('motorcycle', motorsSchema);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(mongooseModel: Model<Motorcycle> = carMongooseModel) {
    super(mongooseModel);
  }
}

export default MotorcycleModel;

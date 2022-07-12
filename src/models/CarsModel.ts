import { model as mongoModel, Document, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';

interface CarDocument extends Car, Document { }

export const carsSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: Boolean,
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
});

class CarsModel extends GenericModel<Car> {
  constructor(carModel = mongoModel('Cars', carsSchema)) {
    super(carModel);
  }
}

export default CarsModel;

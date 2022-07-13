import CarsModel from '../models/CarsModel';
import Service, { ServiceError } from '.';
import { Car, SchemaCar } from '../interfaces/CarInterface';

class CarsService extends Service<Car> {
  constructor(model = new CarsModel()) {
    super(model);
  }
  
  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = SchemaCar.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Car[]> => this.model.read();

  readOne = async (id: string): Promise<Car | null | ServiceError> =>
    this.model.readOne(id);

  updateById = async (id: string, obj: Car): Promise<Car
  | ServiceError | null> => {
    const parsed = SchemaCar.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<Car | null | ServiceError> =>
    this.model.delete(id);
}

export default CarsService;

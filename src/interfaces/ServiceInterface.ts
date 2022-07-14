import { Car } from './CarInterface';

export default interface ServiceInterface {
  create(user: Car): Promise<Car>;
  read(): Promise<Car[]>;
  readOne(id: string): Promise<Car | null>;
  update(id: string, Car: Car): Promise<Car | null>
  delete(id: string): Promise<void>;
}

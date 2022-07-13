import { ZodError } from 'zod';
import GenericModel from '../models/GenericModel';

export interface ServiceError { error: ZodError }

abstract class Service<T> {
  constructor(protected model: GenericModel<T>) { }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}

export default Service;

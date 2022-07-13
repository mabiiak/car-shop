import { Model as M, Document, isValidObjectId } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (item: string): Promise<T | null> =>
    this.model.findById({ _id: item });

  update = async (item: string, obj: T): Promise<T | null> => {
    if (!isValidObjectId(item)) return null;
    return this.model.findOneAndUpdate({ _id: item }, { ...obj });
  };

  delete = async (item: string): Promise<T | null> => {
    if (!isValidObjectId(item)) return null;
    return this.model.findOneAndDelete({ _id: item });
  };
}

export default GenericModel;

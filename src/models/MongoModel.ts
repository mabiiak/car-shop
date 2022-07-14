import { Model, isValidObjectId } from 'mongoose';
import { Model as IModel } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: Model<T>) {}

  async create(obj: T): Promise<T> {
    const created = await this.model.create({ ...obj });
    return created;
  }

  async read(): Promise<T[]> {
    const itemList = await this.model.find();
    return itemList;
  }

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      return null;
    }

    const itemId = await this.model.findById({ _id: id });
    return itemId;
  }

  async update(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this.model.findOneAndUpdate({ _id: id }, { ...obj });
  }

  async delete(id: string): Promise<number | null> {
    if (!isValidObjectId(id)) return null;
    const deletedItem = await this.model.deleteOne({ _id: id });
    const { deletedCount } = deletedItem;
    return deletedCount;
  }
}

export default MongoModel;

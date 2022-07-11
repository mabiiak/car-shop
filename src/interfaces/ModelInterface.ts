export interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(item: string): Promise<T | null>,
  update(item: string, obj: T): Promise<T | null>,
  delete(item: string): Promise<T | null>,
}

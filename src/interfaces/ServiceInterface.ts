export default interface ServiceInterface<T> {
  create(user: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, T: T): Promise<T | null>
  delete(id: string): Promise<T | null>;
}

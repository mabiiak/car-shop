import Sinon,  { SinonStub } from 'sinon'
import { Car } from '../../../interfaces/CarInterface';
import CarsService from '../../../services/CarsService';
import { Model } from '../../../interfaces/ModelInterface';

// Feito com ajuda da Vanessa Rios

const carMock: Car = {
  status: true,
  model: 'uno',
  year: 2005,
  color: 'blue',
  buyValue: 99999,
  doorsQty: 4,
  seatsQty: 5,
}

const createMock = Sinon.spy();
const readMock = Sinon.spy();
const readOneMock = Sinon.spy();
const deleteMock = Sinon.spy();
const updateMock = Sinon.spy();
const idMock = '62d06a1f73db97b8009cc7a1';

const ModelMock = {
  create: createMock,
  read: readMock,
  readOne: readOneMock,
  delete: deleteMock,
  update: updateMock,
} as unknown as Model<Car>;

describe('Cars Service', () => {
  it('1 - Called Create', () => {
    const service = new CarsService(ModelMock);

    const serviceMock = service.create(carMock);

    Sinon.assert.called(createMock)
  });

  it('2 - Called Read', () => {
    const service = new CarsService(ModelMock);

    const serviceMock = service.read();

    Sinon.assert.called(readMock);
  });

  it('3 - Called ReadOne', () => {
    const service = new CarsService(ModelMock);

    const serviceMock = service.readOne(idMock);

    Sinon.assert.called(readOneMock);
  });

  it('4 - Called Delete', () => {
    const service = new CarsService(ModelMock);

    const serviceMock = service.delete(idMock);

    Sinon.assert.called(deleteMock);
  });

  it('5 - Called Update', () => {
    const service = new CarsService(ModelMock);

    const serviceMock = service.update(idMock, carMock);

    Sinon.assert.called(updateMock);
  });
});
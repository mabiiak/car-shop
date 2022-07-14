import Sinon,  { SinonStub } from 'sinon'
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleService from '../../../services/MotorcyclesService';
import { Model } from '../../../interfaces/ModelInterface';

// Feito com ajuda da Vanessa Rios

const carMock: Motorcycle = {
  status: true,
  model: 'uno',
  year: 2005,
  color: 'blue',
  buyValue: 99999,
  category: 'Street',
  engineCapacity: 2400,
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
} as unknown as Model<Motorcycle>;

describe('Motorcycles Service', () => {
  it('1 - Called Create', () => {
    const service = new MotorcycleService(ModelMock);

    const serviceMock = service.create(carMock);

    Sinon.assert.called(createMock)
  });

  it('2 - Called Read', () => {
    const service = new MotorcycleService(ModelMock);

    const serviceMock = service.read();

    Sinon.assert.called(readMock);
  });

  it('3 - Called ReadOne', () => {
    const service = new MotorcycleService(ModelMock);

    const serviceMock = service.readOne(idMock);

    Sinon.assert.called(readOneMock);
  });

  it('4 - Called Delete', () => {
    const service = new MotorcycleService(ModelMock);

    const serviceMock = service.delete(idMock);

    Sinon.assert.called(deleteMock);
  });

  it('5 - Called Update', () => {
    const service = new MotorcycleService(ModelMock);

    const serviceMock = service.update(idMock, carMock);

    Sinon.assert.called(updateMock);
  });
});
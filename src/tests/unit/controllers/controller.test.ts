import Sinon, { SinonStub } from 'sinon'
import { expect } from 'chai';
import { Car } from '../../../interfaces/CarInterface';
import ServiceInterface from '../../../interfaces/ServiceInterface';
import CarsController from '../../../controllers/CarsController';
import { Request, Response, NextFunction } from 'express';

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

const createMock = Sinon.stub().resolves(carMock);
const readMock = Sinon.stub().resolves([carMock]);
const readOneMock = Sinon.stub().resolves(carMock);
const deleteMock = Sinon.stub().resolves(carMock);
const updateMock = Sinon.stub().resolves(carMock);
const idMock = '62d06a1f73db97b8009cc7a1';
const invalidLengthIdMock = '123';
const reqMock = {} as Request;
const resMock = {} as Response;
const NextMock = () => ({}) as NextFunction;

const ServiceMock = {
  create: createMock,
  read: readMock,
  readOne: readOneMock,
  delete: deleteMock,
  update: updateMock,
} as unknown as ServiceInterface<Car>;

describe('Controller', () => {
  before(async () => {
    resMock.status = Sinon.stub().returns(resMock);
    resMock.json = Sinon.stub().returns(resMock);
  });

  it('1 - Called Create', async () => {
    const controller = new CarsController(ServiceMock);

    reqMock.body = carMock;

    await controller.create(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(201));
  });

  it('2 - Called Read', async () => {
    const controller = new CarsController(ServiceMock);

    reqMock.body = carMock;

    await controller.read(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(200));
    expect((resMock.json as Sinon.SinonStub).calledWith([carMock]));
  });

  it('3 - Called ReadOne', async () => {
    const controller = new CarsController(ServiceMock);

    reqMock.body = carMock;
    reqMock.params = { idMock };

    await controller.readOne(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(200));
    expect((resMock.json as Sinon.SinonStub).calledWith(carMock));
  });

  it('4 - Called Delete', async () => {
    const controller = new CarsController(ServiceMock);

    reqMock.body = carMock;
    reqMock.params = { idMock };

    await controller.delete(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(204));
  });

  describe('Update', () => {
    it('5 - Id valido', async () => {
      const controller = new CarsController(ServiceMock);

      reqMock.body = carMock;
      reqMock.params = { idMock };

      await controller.update(reqMock, resMock, NextMock);

      expect((resMock.status as Sinon.SinonStub).calledWith(200));
    });

    it('6 - Id invalido', async () => {
      const controller = new CarsController(ServiceMock);

      reqMock.body = carMock;
      // reqMock.params = { invalidLengthIdMock };
      reqMock.params = {};

      await controller.update(reqMock, resMock, NextMock);

      expect((resMock.status as Sinon.SinonStub).calledWith(404));
    });
  });
});

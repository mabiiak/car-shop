import Sinon from 'sinon'
import { expect } from 'chai';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import ServiceInterface from '../../../interfaces/ServiceInterface';
import MotorcyclesController from '../../../controllers/MotorcycleController';
import { Request, Response, NextFunction } from 'express';

// Feito com ajuda da Vanessa Rios

const motorMock: Motorcycle = {
  status: true,
  model: 'uno',
  year: 2005,
  color: 'blue',
  buyValue: 99999,
  category: 'Street',
  engineCapacity: 2400,
}

const createMock = Sinon.stub().resolves(motorMock);
const readMock = Sinon.stub().resolves([motorMock]);
const readOneMock = Sinon.stub().resolves(motorMock);
const deleteMock = Sinon.stub().resolves(motorMock);
const updateMock = Sinon.stub().resolves(motorMock);
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
} as unknown as ServiceInterface<Motorcycle>;

describe('Controller', () => {
  before(async () => {
    resMock.status = Sinon.stub().returns(resMock);
    resMock.json = Sinon.stub().returns(resMock);
  });

  it('1 - Called Create', async () => {
    const controller = new MotorcyclesController(ServiceMock);

    reqMock.body = motorMock;

    await controller.create(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(201));
  });

  it('2 - Called Read', async () => {
    const controller = new MotorcyclesController(ServiceMock);

    reqMock.body = motorMock;

    await controller.read(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(200));
    expect((resMock.json as Sinon.SinonStub).calledWith([motorMock]));
  });

  it('3 - Called ReadOne', async () => {
    const controller = new MotorcyclesController(ServiceMock);

    reqMock.body = motorMock;
    reqMock.params = { idMock };

    await controller.readOne(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(200));
    expect((resMock.json as Sinon.SinonStub).calledWith(motorMock));
  });

  it('4 - Called Delete', async () => {
    const controller = new MotorcyclesController(ServiceMock);

    reqMock.body = motorMock;
    reqMock.params = { idMock };

    await controller.delete(reqMock, resMock, NextMock);

    expect((resMock.status as Sinon.SinonStub).calledWith(204));
  });

  describe('Update', () => {
    it('5 - Id valido', async () => {
      const controller = new MotorcyclesController(ServiceMock);

      reqMock.body = motorMock;
      reqMock.params = { id: idMock };

      await controller.update(reqMock, resMock, NextMock);

      expect((resMock.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it('6 - Id invalido', async () => {
      const controller = new MotorcyclesController(ServiceMock);

      reqMock.body = motorMock;
      reqMock.params = { id: invalidLengthIdMock };

      await controller.update(reqMock, resMock, NextMock);

      expect((resMock.status as Sinon.SinonStub).calledWith(404));
    });
  });
});

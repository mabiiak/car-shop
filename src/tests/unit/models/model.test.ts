import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import { Model, isValidObjectId } from 'mongoose';
import CarsModel, { carMongooseModel } from '../../../models/CarsModel';
import { Car } from '../../../interfaces/CarInterface';

describe('Cars Model', () => {
  const carMock: Car = {
    status: true,
    model: 'uno',
    year: 2005,
    color: 'blue',
    buyValue: 99999,
    doorsQty: 4,
    seatsQty: 5,
  }

  describe('1 - Create Car', () => {
    before(() => {
      sinon
      .stub(carMongooseModel, 'create')
      .resolves(carMock);
    })

    after(() => {
      (carMongooseModel.create as SinonStub).restore();
    })

    it('Sucess case', async () => {
      const carModel = new CarsModel(carMongooseModel);

      const createdCar = await carModel.create(carMock);
      
      expect(createdCar).to.be.deep.equal(carMock);
    });
  });

  describe('2 - Find all Cars', () => {
    before(() => {
      sinon
      .stub(carMongooseModel, 'find')
      .resolves([]);
    })

    after(() => {
      (carMongooseModel.find as SinonStub).restore();
    })

    it('Sucess case', async () => {
      const carModel = new CarsModel(carMongooseModel);

      const createdCar = await carModel.read();
      
      expect(createdCar).to.be.deep.equal([]);
    });
  });
});

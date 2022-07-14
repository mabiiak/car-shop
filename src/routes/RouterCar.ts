import { Router } from 'express';
import CarsController from '../controllers/CarsController';

const carRouter = Router();

const controller = new CarsController();

carRouter.post('/cars', (req, res, next) => controller.create(req, res, next));

carRouter.get('/cars', (req, res, next) => controller.read(req, res, next));

carRouter
  .get('/cars/:id', (req, res, next) => controller.readOne(req, res, next));

carRouter
  .put('/cars/:id', (req, res, next) => controller.update(req, res, next));

carRouter
  .delete('/cars/:id', (req, res, next) => controller.delete(req, res, next));

export default carRouter;
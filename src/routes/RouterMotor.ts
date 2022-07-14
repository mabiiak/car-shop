import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';

const motorRouter = Router();

const controller = new MotorcycleController();

const routeId = '/motorcycles/:id';
motorRouter
  .post('/motorcycles', (req, res, next) => controller.create(req, res, next));

motorRouter
  .get('/motorcycles', (req, res, next) => controller.read(req, res, next));

motorRouter
  .get(routeId, (req, res, next) => controller.readOne(req, res, next));

motorRouter
  .put(routeId, (req, res, next) => controller.update(req, res, next));

motorRouter
  .delete(routeId, (req, res, next) => controller.delete(req, res, next));

export default motorRouter;
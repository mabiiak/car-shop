import App from './app';
import carRouter from './routes/RouterCar';
import motorRouter from './routes/RouterMotor';
import errorMiddleware from './middlewares/errorMiddleware';

const server = new App();

server.addMiddleware(carRouter);
server.addMiddleware(motorRouter);
server.addMiddleware(errorMiddleware);

export default server;

import App from './app';
import carRouter from './routes/Router';
import errorMiddleware from './middlewares/errorMiddleware';

const server = new App();

server.addMiddleware(carRouter);
server.addMiddleware(errorMiddleware);

export default server;

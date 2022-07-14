import express from 'express';
import connectToDatabase from './connection';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addMiddleware(
    middle: express.Router | express.ErrorRequestHandler | express.NextFunction,
  ) {
    this.app.use(middle);
  }

  public getApp() {
    return this.app;
  }
}

export default App;

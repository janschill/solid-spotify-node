import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../controllers/login-controller';

class LoginRouter {
  private _router = Router();
  private _controller = LoginController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.default());
    });
  }
}

export = new LoginRouter().router;

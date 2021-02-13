import { NextFunction, Request, Response, Router } from 'express';

class IndexRouter {
  private _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.render('index', { title: 'Hey', message: 'Hello there!' })
    });
  }
}

export = new IndexRouter().router;

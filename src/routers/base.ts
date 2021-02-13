import { Router } from "express";
import LoginRouter from "./login-router"
import IndexRouter from "./index-router"

class BaseRouter {
  private _router = Router();
  private loginRouter = LoginRouter;
  private indexRouter = IndexRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use("/", this.indexRouter);
    this._router.use("/login", this.loginRouter);
  }
}

export = new BaseRouter().router;

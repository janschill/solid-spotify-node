import { Router } from "express";
import IndexRouter from "./index-router"
import ApiRouter from "./api-router"

class BaseRouter {
  private _router = Router();
  private indexRouter = IndexRouter;
  private apiRouter = ApiRouter;

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
    this._router.use("/api", this.apiRouter)
  }
}

export = new BaseRouter().router;

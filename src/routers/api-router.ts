import { NextFunction, Request, Response, Router } from "express";
import ApiController from "../controllers/api-controller";

class ApiRouter {
  private _router = Router();
  private _controller: any = ApiController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    const controller = this._controller;
    this._router.get("/top-artists", async function (req: Request, res: Response, next: NextFunction) {
      try {
        const response = await controller.topArtists()
        res.status(200).json(response);
      } catch (error) {
        console.error(error)
      }
    });
  }
}

export = new ApiRouter().router;

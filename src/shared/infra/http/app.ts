/* eslint-disable  typescript-eslint/no-unused-vars */
import "reflect-metadata";
import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import "express-async-errors";

import "@shared/container";

import "@shared/infra/typeorm";
import { router } from "./routes";
import AppError from "@shared/errors/AppError";

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.init();
  }

  private init() {
    this.setupExpress();
    this.setupRoutes();
    this.errors();
  }

  private setupExpress() {
    this.app.set("port", this.port || process.env.PORT || 3001);
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    this.app.use(router);
  }

  private errors() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({ message: err.message });
        }

        console.log(err);

        return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
        });
      }
    );
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server is running on port", this.app.get("port"));
    });
  }
}

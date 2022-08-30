import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarImagesUseCase } from "./ListCarImagesUseCase";

export class ListCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarImagesUseCase = container.resolve(ListCarImagesUseCase);

    const cars = await listCarImagesUseCase.execute();

    return response.json(cars);
  }
}

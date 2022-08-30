import { container } from "tsyringe";
import { Request, Response } from "express";
import { ShowCarUseCase } from "./ShowCarUseCase";
import { ShowCarImagesUseCase } from "./ShowCarImagesUseCase";

export class ShowCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCarUseCase = container.resolve(ShowCarUseCase);
    const showImagesUseCase = container.resolve(ShowCarImagesUseCase);

    const showCar = await showCarUseCase.execute(id);
    const showImages = await showImagesUseCase.execute(id);

    const show = {
      car: showCar,
      images: showImages,
    };

    return response.json(show);
  }
}

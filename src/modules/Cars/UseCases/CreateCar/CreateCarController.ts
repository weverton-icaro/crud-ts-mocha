import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { license_plate, brand, model, renamed, chassis, year } =
      request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      license_plate,
      brand,
      model,
      renamed,
      chassis,
      year,
    });

    return response.status(201).json(car);
  }
}

import { Car } from " shared/infra/typeorm/entities/Car";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCarUseCase } from "./UpdateCarUseCase";

export class UpdateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const { id } = request.params;

    const updateCarUseCase = container.resolve(UpdateCarUseCase);

    await updateCarUseCase.execute(data, id);

    return response.json({ message: "Updated success." });
  }
}

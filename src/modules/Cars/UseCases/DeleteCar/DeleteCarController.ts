import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteCarUseCase } from "./DeleteCarUseCase";

export class DeleteCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCarUseCase = container.resolve(DeleteCarUseCase);

    await deleteCarUseCase.execute(id);

    return response.status(204).end();
  }
}

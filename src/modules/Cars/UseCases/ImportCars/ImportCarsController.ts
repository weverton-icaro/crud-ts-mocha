import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCarsUseCase } from "./ImportCarsUseCase";

export class ImportCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCarsUseCase = container.resolve(ImportCarsUseCase);

    await importCarsUseCase.execute(file);

    return response.status(201).json({ message: "Imported with success." });
  }
}

import { Car } from "@shared/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import AppError from "@shared/errors/AppError";
import { carNotFound } from "@shared/errors/messages";
import { inject, injectable } from "tsyringe";

@injectable()
export class ShowCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(id?: string): Promise<Car[]> {
    const carExists = await this.carsRepository.findById(id);

    if (!carExists) {
      throw new AppError(carNotFound, 400);
    }

    const car = await this.carsRepository.show(id);

    return car;
  }
}

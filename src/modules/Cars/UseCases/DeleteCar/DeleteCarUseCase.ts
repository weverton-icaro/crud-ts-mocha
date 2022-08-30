import AppError from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { carNotFound } from "@shared/errors/messages";
import { inject, injectable } from "tsyringe";
import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";

@injectable()
export class DeleteCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError(carNotFound, 400);
    }

    await this.carsImagesRepository.delete(car.id);

    await this.carsRepository.delete(id);
  }
}

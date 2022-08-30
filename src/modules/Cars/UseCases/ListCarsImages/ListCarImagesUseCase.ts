import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { CarImage } from "@shared/infra/typeorm/entities/CarImage";
import { injectable, inject } from "tsyringe";

@injectable()
export class ListCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository
  ) {}

  async execute(): Promise<CarImage[]> {
    const cars = await this.carsImagesRepository.list();
    return cars;
  }
}

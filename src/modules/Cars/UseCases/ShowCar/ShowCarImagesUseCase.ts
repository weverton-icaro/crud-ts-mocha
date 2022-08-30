import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { CarImage } from "@shared/infra/typeorm/entities/CarImage";
import { injectable, inject } from "tsyringe";

@injectable()
export class ShowCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository
  ) {}

  async execute(id: string): Promise<CarImage[]> {
    const car = await this.carsImagesRepository.show(id);

    return car;
  }
}

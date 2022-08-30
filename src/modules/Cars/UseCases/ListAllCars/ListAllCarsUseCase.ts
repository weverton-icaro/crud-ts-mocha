import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { Car } from "@shared/infra/typeorm/entities/Car";

@injectable()
export class ListAllCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.list();
    return cars;
  }
}

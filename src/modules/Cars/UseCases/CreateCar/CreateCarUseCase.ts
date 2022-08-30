import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/Cars/DTOs/ICreateCarDTO";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import AppError from "@shared/errors/AppError";
import {
  chassisInvalid,
  plateAlreadyExists,
  renamedInvalid,
} from "@shared/errors/messages";
import { Car } from "@shared/infra/typeorm/entities/Car";

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    license_plate,
    brand,
    model,
    chassis,
    renamed,
    year,
  }: ICreateCarDTO): Promise<Car> {
    const plateExists = await this.carsRepository.findByPlate(license_plate);

    if (plateExists) {
      throw new AppError(plateAlreadyExists, 400);
    }

    console.log(license_plate, brand, model, chassis, renamed, year);

    if (license_plate.length < 7) {
      throw new AppError(chassisInvalid, 400);
    }

    if (chassis.length < 17) {
      throw new AppError(chassisInvalid, 400);
    }

    if (renamed.length < 9 && renamed.length > 11) {
      throw new AppError(renamedInvalid, 400);
    }

    const car = await this.carsRepository.create({
      license_plate,
      brand,
      model,
      chassis,
      renamed,
      year,
    });

    return car;
  }
}

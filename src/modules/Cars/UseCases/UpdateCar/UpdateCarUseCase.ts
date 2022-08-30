import { IUpdateCarDTO } from "@modules/Cars/DTOs/IUpdateCarDTO";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";
import { carNotFound, plateAlreadyExists } from "@shared/errors/messages";
import AppError from "@shared/errors/AppError";
import { Car } from "@shared/infra/typeorm/entities/Car";

@injectable()
export class UpdateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IUpdateCarDTO, id: string): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError(carNotFound, 400);
    }

    if (data.license_plate) {
      const plate = await this.carsRepository.findByPlate(data.license_plate);

      if (plate) {
        throw new AppError(plateAlreadyExists, 400);
      }
    }

    if (data.license_plate === "") {
      delete data.license_plate;
    }
    if (data.brand === "") {
      delete data.brand;
    }
    if (data.model === "") {
      delete data.model;
    }
    if (data.chassis === "") {
      delete data.chassis;
    }
    if (data.renamed === "") {
      delete data.renamed;
    }
    if (data.year === "") {
      delete data.year;
    }

    const carUpdate = await this.carsRepository.updateCar(data, car.id);

    return carUpdate;
  }
}

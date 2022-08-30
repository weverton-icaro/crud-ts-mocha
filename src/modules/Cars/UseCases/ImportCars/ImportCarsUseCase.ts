import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { IImportCarsDTO } from "@modules/Cars/DTOs/IImportCarsDTO";

@injectable()
export class ImportCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  loadCars(file: Express.Multer.File): Promise<IImportCarsDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const cars: IImportCarsDTO[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [license_plate, brand, model, renamed, chassis, year] = line;

          cars.push({
            license_plate,
            brand,
            model,
            renamed,
            chassis,
            year,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(cars);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const cars = await this.loadCars(file);
    console.log(cars);
    cars.map(async (category) => {
      const { license_plate, brand, model, renamed, chassis, year } = category;

      const existCar = await this.carsRepository.findByPlate(license_plate);

      if (!existCar) {
        await this.carsRepository.create({
          license_plate,
          brand,
          model,
          renamed,
          chassis,
          year,
        });
      }
    });
  }
}

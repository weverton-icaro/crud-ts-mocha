import { ICreateCarDTO } from "@modules/Cars/DTOs/ICreateCarDTO";
import { IUpdateCarDTO } from "@modules/Cars/DTOs/IUpdateCarDTO";
import { Car } from "@shared/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    license_plate,
    brand,
    model,
    renamed,
    chassis,
    year,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      license_plate,
      brand,
      model,
      renamed,
      chassis,
      year,
    });

    this.cars.push(car);

    return car;
  }

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async findByPlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findByModel(model: string): Promise<Car[]> {
    return this.cars.filter((car) => car.model === model);
  }

  async findByBrand(brand: string): Promise<Car[]> {
    return this.cars.filter((car) => car.brand === brand);
  }

  async findByYear(year: string): Promise<Car[]> {
    return this.cars.filter((car) => car.year === year);
  }

  async updateCar(
    { license_plate, brand, model, renamed, chassis, year }: IUpdateCarDTO,
    id: string
  ): Promise<Car> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].license_plate = license_plate;
    this.cars[findIndex].brand = brand;
    this.cars[findIndex].model = model;
    this.cars[findIndex].renamed = renamed;
    this.cars[findIndex].chassis = chassis;
    this.cars[findIndex].year = year;
    return;
  }

  async delete(id: string): Promise<void> {
    const car = this.cars.find((user) => user.id === id);
    this.cars.splice(this.cars.indexOf(car));
  }

  async show(id?: string): Promise<Car[]> {
    const car = this.cars.filter((car) => car.id === id);
    return car;
  }
}

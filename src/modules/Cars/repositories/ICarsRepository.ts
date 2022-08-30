import { Car } from "@shared/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";
import { IUpdateCarDTO } from "../DTOs/IUpdateCarDTO";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByPlate(liscense_plate: string): Promise<Car>;
  list(): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  findByModel(model: string): Promise<Car[]>;
  findByBrand(brand: string): Promise<Car[]>;
  findByYear(year: string): Promise<Car[]>;
  show(id: string): Promise<Car[]>;
  updateCar(data: IUpdateCarDTO, id: string): Promise<Car>;
  delete(id: string): Promise<void>;
}

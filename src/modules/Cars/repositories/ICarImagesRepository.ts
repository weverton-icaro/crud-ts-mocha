import { CarImage } from "@shared/infra/typeorm/entities/CarImage";

export interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  list(): Promise<CarImage[]>;
  findByCarId(car_id: string): Promise<CarImage[]>;
  show(car_id: string): Promise<CarImage[]>;
  delete(id: string): Promise<void>;
}

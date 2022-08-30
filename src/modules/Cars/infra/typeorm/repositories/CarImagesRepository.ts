import { getRepository, Repository } from "typeorm";

import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { CarImage } from "@shared/infra/typeorm/entities/CarImage";

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async list(): Promise<CarImage[]> {
    const cars = await this.repository.find();

    return cars;
  }

  async show(car_id: string): Promise<CarImage[]> {
    const carImage = await this.repository.find({ car_id });
    return carImage;
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    const carImages = await this.repository.find({ car_id });
    return carImages;
  }
  async delete(id: string): Promise<void> {
    const carImages = await this.repository
      .createQueryBuilder()
      .delete()
      .where("car_id = :id", { id });
  }
}

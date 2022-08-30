import { CarImage } from "@shared/infra/typeorm/entities/CarImage";
import { ICreateCarDTO } from "@modules/Cars/DTOs/ICreateCarDTO";
import { IUpdateCarDTO } from "@modules/Cars/DTOs/IUpdateCarDTO";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { Car } from "@shared/infra/typeorm/entities/Car";
import { getRepository, Repository } from "typeorm";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    license_plate,
    brand,
    model,
    renamed,
    chassis,
    year,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      license_plate,
      brand,
      model,
      renamed,
      chassis,
      year,
    });

    await this.repository.save(car);

    return car;
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ id });
    return car;
  }

  async findByPlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate });
    return car;
  }

  async findByModel(model: string): Promise<Car[]> {
    const car = this.repository.find({ model });
    return car;
  }

  async findByBrand(brand: string): Promise<Car[]> {
    const car = this.repository.find({ brand });
    return car;
  }

  async findByYear(year: string): Promise<Car[]> {
    const car = this.repository.find({ year });
    return car;
  }

  async show(id: string): Promise<Car[]> {
    const car = this.repository.find({ id });
    return car;
  }

  async updateCar(data: IUpdateCarDTO, id: string): Promise<Car> {
    const car = await this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where("id = :id")
      .setParameters({ id })
      .execute();

    return car[0];
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

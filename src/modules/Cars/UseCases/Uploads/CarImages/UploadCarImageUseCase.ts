import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { IUploadCarImageDTO } from "@modules/Cars/DTOs/IUploadCarImageDTO";
import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/container/provider/StorageProvider/IStorageProvider";
import { carIdNotNull } from "@shared/errors/messages";

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, image_name }: IUploadCarImageDTO): Promise<void> {
    if (!car_id) {
      throw new AppError(carIdNotNull, 400);
    }

    image_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

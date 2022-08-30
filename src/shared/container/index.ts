import { container } from "tsyringe";

import "@shared/container/provider";
import { UserTokensRepository } from "@modules/Account/infra/typeorm/repositories/UserTokensRepository";
import { IUserTokensRepository } from "@modules/Account/repositories/IUserTokensRepository";
import { CarsRepository } from "@modules/Cars/infra/typeorm/repositories/CarsRepository";
import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository";
import { UsersRepository } from "@modules/Account/infra/typeorm/repositories/UsersRepository";
import { CarImagesRepository } from "@modules/Cars/infra/typeorm/repositories/CarImagesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

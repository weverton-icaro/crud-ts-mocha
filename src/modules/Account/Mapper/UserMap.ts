import { User } from "@shared/infra/typeorm/entities/User";
import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../DTOs/IUserResponseDTO";

export class UserMap {
  static toDTO({ email, id, name, driver_license }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      id,
      name,
      driver_license,
    });
    return user;
  }
}

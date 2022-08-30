import { User } from "@shared/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";

export interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

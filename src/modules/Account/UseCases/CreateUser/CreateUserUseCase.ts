import { ICreateUserDTO } from "@modules/Account/DTOs/ICreateUserDTO";
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { User } from "@shared/infra/typeorm/entities/User";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError(`User email ${email} already exists`);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

    return user;
  }
}

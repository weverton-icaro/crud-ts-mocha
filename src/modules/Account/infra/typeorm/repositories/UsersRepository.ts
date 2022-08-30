import { ICreateUserDTO } from "@modules/Account/DTOs/ICreateUserDTO";
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository";
import { User } from "@shared/infra/typeorm/entities/User";
import { Repository, getRepository } from "typeorm";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

import { IUserResponseDTO } from "@modules/Account/DTOs/IUserResponseDTO";
import { UserMap } from "@modules/Account/Mapper/UserMap";
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

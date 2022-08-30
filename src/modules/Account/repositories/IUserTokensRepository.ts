import { ICreateUserTokenDTO } from "../DTOs/ICreateUserTokenDTO";
import { UserTokens } from "@shared/infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}

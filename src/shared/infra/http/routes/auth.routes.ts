import { AuthUserController } from "@modules/Account/UseCases/Auth/AuthUserController";
import { RefreshTokenController } from "@modules/Account/UseCases/RefreshToken/RefreshTokenController";
import { Router } from "express";

const authRoute = Router();

const authUserController = new AuthUserController();

const refreshTokenController = new RefreshTokenController();

authRoute.post("/login", authUserController.handle);

authRoute.post("/refresh", refreshTokenController.handle);

export { authRoute };

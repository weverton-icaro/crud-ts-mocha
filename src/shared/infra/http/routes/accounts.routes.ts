import { CreateUserController } from "@modules/Account/UseCases/CreateUser/CreateUserController";
import { ProfileUserController } from "@modules/Account/UseCases/ProfileUser/ProfileUserController";
import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";

const accountsRoutes = Router();

const createUserController = new CreateUserController();

const profileUserController = new ProfileUserController();

accountsRoutes.post("/create", createUserController.handle);

accountsRoutes.get("/profile", ensureAuth, profileUserController.handle);

export { accountsRoutes };

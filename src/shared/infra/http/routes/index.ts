import { Router } from "express";
import { accountsRoutes } from "./accounts.routes";
import { authRoute } from "./auth.routes";
import { carRoutes } from "./cars.routes";
const router = Router();

router.use("/car", carRoutes);
router.use("/accounts", accountsRoutes);
router.use("/session", authRoute);

export { router };

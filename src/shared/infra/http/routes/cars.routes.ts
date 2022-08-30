import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateCarController } from "@modules/Cars/UseCases/CreateCar/CreateCarController";
import { DeleteCarController } from "@modules/Cars/UseCases/DeleteCar/DeleteCarController";
import { ListAllCarsController } from "@modules/Cars/UseCases/ListAllCars/ListAllCarsController";
import { UpdateCarController } from "@modules/Cars/UseCases/UpdateCar/UpdateCarController";
import { UploadCarImageController } from "@modules/Cars/UseCases/Uploads/CarImages/UploadCarImageController";
import { ImportCarsController } from "@modules/Cars/UseCases/ImportCars/ImportCarsController";
import { ShowCarController } from "@modules/Cars/UseCases/ShowCar/ShowCarController";
import { ensureAuth } from "../middlewares/ensureAuth";
import { ListCarImagesController } from "@modules/Cars/UseCases/ListCarsImages/ListCarImagesController";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListAllCarsController();
const updateCarController = new UpdateCarController();
const deleteCarController = new DeleteCarController();
const uploadCarImageController = new UploadCarImageController();
const importCarsController = new ImportCarsController();
const showCarsController = new ShowCarController();
const listCarImagesController = new ListCarImagesController();

const uploadImages = multer(uploadConfig);

const uploadCars = multer({
  dest: "./tmp",
});

carRoutes.use(ensureAuth);
carRoutes.post("/create", createCarController.handle);
carRoutes.get("/list", listCarController.handle);
carRoutes.get("/show/:id", showCarsController.handle);
carRoutes.patch("/update/:id", updateCarController.handle);
carRoutes.delete("/delete/:id", deleteCarController.handle);

carRoutes.post(
  "/images/:id",
  uploadImages.array("images"),

  uploadCarImageController.handle
);

carRoutes.post(
  "/import",
  uploadCars.single("file"),
  importCarsController.handle
);

carRoutes.get("/images", listCarImagesController.handle);

export { carRoutes };

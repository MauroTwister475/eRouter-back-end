import express  from "express";
import { DriverController } from "../../controller/driver.controller";

export const driverRoutes = express.Router()
const driver = new DriverController();

driverRoutes.get("/driver/view", driver.view);
driverRoutes.post("/driver/create", driver.create);
driverRoutes.put("/driver/update/:id", driver.update);
driverRoutes.delete("/driver/delete/:id", driver.delete);
import express from 'express';
import { VehicleController } from "../../controllers/vehicle.controller";

export const vehicleRoutes = express.Router()
const vehicle = new VehicleController();

vehicleRoutes.get("/vehicle/view", vehicle.view);
vehicleRoutes.post("/vehicle/create", vehicle.create);
vehicleRoutes.put("/vehicle/update/:id", vehicle.update);
vehicleRoutes.delete("/vehicle/delete/:id", vehicle.delete);
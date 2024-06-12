import express from 'express';
import { AllocationController } from "../../controller/allocation.controller";

export const allocationRoutes = express.Router()
const allocation = new AllocationController();

allocationRoutes.get("/allocation/view", allocation.view);
allocationRoutes.post("/allocation/create", allocation.create);
allocationRoutes.put("/allocation/update/:id", allocation.update);
allocationRoutes.delete("/allocation/delete/:id", allocation.delete);
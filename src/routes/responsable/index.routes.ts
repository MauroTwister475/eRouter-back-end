import express from 'express';
import { ResponsableController } from "../../controllers/responsable.controller";

export const responsableRoutes = express.Router()
const responsables = new ResponsableController();

responsableRoutes.get("/responsables/view", responsables.view);
responsableRoutes.post("/responsables/create", responsables.create);
responsableRoutes.put("/responsables/update/:id", responsables.update);
responsableRoutes.delete("/responsables/delete/:id", responsables.delete);